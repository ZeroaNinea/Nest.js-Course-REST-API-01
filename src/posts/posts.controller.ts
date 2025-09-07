import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Inject,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Body,
  // UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import * as postInterface from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  // @UsePipes(
  // new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // ) // The validators only applied to this controller.
  create(
    // @Body() createPostData: Omit<postInterface.Post, 'id' | 'createdAt'>
    @Body() createPostData: CreatePostDto,
  ) {
    return this.postsService.create(createPostData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    // @Body()
    // updatePostData: Partial<Omit<postInterface.Post, 'id' | 'createdAt'>>,
    @Body() updatePostData: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.remove(id);
  }
}
