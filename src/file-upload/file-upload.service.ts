import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CloudinaryService } from './cloudinary/cloudinary.service';
import { File } from './entities/file.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    description: string | undefined,
    user: User,
  ): Promise<File> {
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);

    const newlyCreatedFile = this.fileRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: cloudinaryResponse.secure_url,
      publicId: cloudinaryResponse.public_id,
      description,
      uploader: user,
    });

    return this.fileRepository.save(newlyCreatedFile);
  }
}
