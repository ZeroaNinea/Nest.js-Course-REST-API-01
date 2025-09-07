import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  @MinLength(3, { message: 'Title must be at least 3 characters.' })
  @MaxLength(50, { message: 'Title cannot be longer than 50 characters.' })
  title: string;

  @IsNotEmpty({ message: 'Content is required.' })
  @IsString({ message: 'Content must be a string.' })
  @MinLength(3, { message: 'Content must be at least 3 characters.' })
  content: string;

  @IsNotEmpty({ message: 'Author is required.' })
  @IsString({ message: 'Author must be a string.' })
  @MinLength(3, { message: 'Author must be at least 3 characters.' })
  @MaxLength(25, { message: 'Author cannot be longer than 50 characters.' })
  authorName: string;
}
