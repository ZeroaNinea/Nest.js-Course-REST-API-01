import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

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

  findAll(): Post[] {
    return this.posts;
  }
}
