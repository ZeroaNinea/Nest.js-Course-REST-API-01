import { Controller, Get, Inject, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(@Inject() private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): Post[] {
    const extractAllPosts = this.postsService.findAll();

    if (search) {
      return extractAllPosts.filter((singlePost) =>
        singlePost.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return extractAllPosts;
  }
}
