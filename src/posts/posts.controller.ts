import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import * as postInterface from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(@Inject() private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): postInterface.Post[] {
    const extractAllPosts = this.postsService.findAll();

    if (search) {
      return extractAllPosts.filter((singlePost) =>
        singlePost.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return extractAllPosts;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): postInterface.Post {
    return this.postsService.findOne(id);
  }
}
