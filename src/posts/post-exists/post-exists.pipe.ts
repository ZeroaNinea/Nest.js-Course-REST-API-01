import {
  // ArgumentMetadata,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { PostsService } from '../posts.service';

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(@Inject() private readonly postsService?: PostsService) {}

  transform(
    value: number,
    // metadata: ArgumentMetadata
  ) {
    try {
      this.postsService?.findOne(value);
    } catch {
      throw new NotFoundException(`Post with ID ${value} not found.`);
    }

    return value;
  }
}
