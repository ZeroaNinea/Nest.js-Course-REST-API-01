import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // This will make the post repository available to the PostsController.
  imports: [TypeOrmModule.forFeature([Post]), AuthModule],
  exports: [TypeOrmModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
