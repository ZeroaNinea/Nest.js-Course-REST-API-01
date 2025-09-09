import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'First post content.',
      authorName: 'Sangam',
      createdAt: new Date(),
    },
  ];

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    return post;
  }

  async create(
    // createPostData: Omit<Post, 'id' | 'createdAt'>
    createPostData: CreatePostDto,
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
      authorName: createPostData.authorName,
    });

    return this.postsRepository.save(post);
  }

  update(
    id: number,
    updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>,
  ): Post {
    const currentPostIndexToEdit = this.posts.findIndex(
      (post) => post.id === id,
    );

    if (currentPostIndexToEdit === -1) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    this.posts[currentPostIndexToEdit] = {
      ...this.posts[currentPostIndexToEdit],
      ...updatePostData,
      updatedAt: new Date(),
    };

    return this.posts[currentPostIndexToEdit];
  }

  remove(id: number): { message: string } {
    const currentPostIndexToDelete = this.posts.findIndex(
      (post) => post.id === id,
    );

    if (currentPostIndexToDelete === -1) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }

    this.posts.splice(currentPostIndexToDelete, 1);

    return { message: `Post with ID ${id} deleted.` };
  }

  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }
}
