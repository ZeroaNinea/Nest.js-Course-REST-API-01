import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CloudinaryService } from './cloudinary/cloudinary.service';
import { File } from './entities/file.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
}
