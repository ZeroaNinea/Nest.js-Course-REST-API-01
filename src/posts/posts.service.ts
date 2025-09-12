import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User, UserRole } from '../auth/entities/user.entity';
import { FindPostsQueryDto } from './dto/find-posts-query.dto';
import { PaginatedResponce } from '../common/interfaces/paginated-responce.interface';

@Injectable()
export class PostsService {
  // private posts: Post[] = [
  //   {
  //     id: 1,
  //     title: 'First Post',
  //     content: 'First post content.',
  //     authorName: 'Sangam',
  //     createdAt: new Date(),
  //   },
  // ];

  private postListCacheKeys: Set<string> = new Set();

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private generatePostsListCacheKey(query: FindPostsQueryDto): string {
    const { page = 1, limit = 10, title } = query;
    return `posts_list_page${page}_limit${limit}_title${title || 'all'}`;
  }

  async findAll(query: FindPostsQueryDto): Promise<PaginatedResponce<Post>> {
    // return await this.postsRepository.find({
    //   relations: ['author'],
    // });

    const cacheKey = this.generatePostsListCacheKey(query);

    const getCachedData =
      await this.cacheManager.get<PaginatedResponce<Post>>(cacheKey);

    if (getCachedData) {
      console.log(
        `Cache Hit ------> Returning posts list from Cache ${cacheKey}`,
      );
      return getCachedData;
    }

    console.log(`Cache Miss ------> Returning posts list from database`);

    const { page = 1, limit = 10, title } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (title) {
      queryBuilder.andWhere('post.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    const [items, totalItems] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    const responseResult = {
      items,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };

    await this.cacheManager.set(cacheKey, responseResult, 30000);
    return responseResult;
  }

  async findOne(id: number): Promise<Post> {
    const cacheKey = `post_${id}`;
    const cachedPost = await this.cacheManager.get<Post>(cacheKey);

    if (cachedPost) {
      console.log(`Cache Hit ------> Returning post from Cache ${cacheKey}`);
      return cachedPost;
    }

    console.log(`Cache Miss ------> Returning post from database`);

    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    await this.cacheManager.set(cacheKey, post, 30000);

    return post;
  }

  async create(
    // createPostData: Omit<Post, 'id' | 'createdAt'>
    createPostData: CreatePostDto,
    author: User,
  ): Promise<Post> {
    // const newPost: Post = {
    //   id: this.getNextId(),
    //   ...createPostData,
    //   createdAt: new Date(),
    // };

    // this.posts.push(newPost);
    // return newPost;

    const post = this.postsRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      // authorName: createPostData.authorName,
      author,
    });

    await this.invalidateAllExistingListCaches();

    return this.postsRepository.save(post);
  }

  async update(
    id: number,
    // updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>,
    updatePostData: UpdatePostDto,
    user: User,
  ): Promise<Post> {
    // const currentPostIndexToEdit = this.posts.findIndex(
    //   (post) => post.id === id,
    // );

    // if (currentPostIndexToEdit === -1) {
    //   throw new NotFoundException(`Post with ID ${id} not found.`);
    // }

    // this.posts[currentPostIndexToEdit] = {
    //   ...this.posts[currentPostIndexToEdit],
    //   ...updatePostData,
    //   updatedAt: new Date(),
    // };

    // return this.posts[currentPostIndexToEdit];

    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    if (post.author.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own posts.');
    }

    if (updatePostData.title) {
      post.title = updatePostData.title;
    }

    if (updatePostData.content) {
      post.content = updatePostData.content;
    }

    // if (updatePostData.authorName) {
    //   post.authorName = updatePostData.authorName;
    // }

    const updatedPost = await this.postsRepository.save(post);

    await this.postsRepository.delete(`post_${id}`);

    await this.invalidateAllExistingListCaches();

    // return this.postsRepository.save(post);

    return updatedPost;
  }

  async remove(id: number): Promise<void> {
    // const currentPostIndexToDelete = this.posts.findIndex(
    //   (post) => post.id === id,
    // );

    // if (currentPostIndexToDelete === -1) {
    //   throw new NotFoundException(`Post with ID ${id} not found.`);
    // }

    // this.posts.splice(currentPostIndexToDelete, 1);

    // return { message: `Post with ID ${id} deleted.` };

    const post = await this.findOne(id);
    await this.postsRepository.remove(post);

    await this.cacheManager.del(`post_${id}`);

    await this.invalidateAllExistingListCaches();
  }

  // private getNextId(): number {
  //   return this.posts.length > 0
  //     ? Math.max(...this.posts.map((post) => post.id)) + 1
  //     : 1;
  // }

  private async invalidateAllExistingListCaches(): Promise<void> {
    console.log(
      `Invalidating ${this.postListCacheKeys.size} list cache entities`,
    );

    for (const key of this.postListCacheKeys) {
      await this.cacheManager.del(key);
    }

    this.postListCacheKeys.clear();
  }
}
