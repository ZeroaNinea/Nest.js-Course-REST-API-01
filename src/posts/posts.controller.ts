import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Inject,
  Param,
  // Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Body,
  UseGuards,
  // UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
// import * as postInterface from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './post-exists/post-exists.pipe';
import { Post as PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(@Inject() private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }
  // findAll(@Query('search') search?: string): postInterface.Post[] {
  //   const extractAllPosts = this.postsService.findAll();

  //   if (search) {
  //     return extractAllPosts.filter((singlePost) =>
  //       singlePost.title.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }

  //   return extractAllPosts;
  // }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
  ): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }
  // findOne(
  //   @Param('id', ParseIntPipe, PostExistsPipe) id: number,
  // ): postInterface.Post {
  //   return this.postsService.findOne(id);
  // }

  // @Post('create')
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPostData: CreatePostDto,
    @CurrentUser() user: User,
  ): Promise<PostEntity> {
    return this.postsService.create(createPostData, user);
  }
  // @UsePipes(
  // new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // ) // The validators only applied to this controller.
  // create(
  //   // @Body() createPostData: Omit<postInterface.Post, 'id' | 'createdAt'>
  //   @Body() createPostData: CreatePostDto,
  // ) {
  //   return this.postsService.create(createPostData);
  // }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
    // @Body()
    // updatePostData: Partial<Omit<postInterface.Post, 'id' | 'createdAt'>>,
    @Body() updatePostData: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
  ): Promise<void> {
    await this.postsService.remove(id);
  }
}
