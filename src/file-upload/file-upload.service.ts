import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { File } from './entities/file.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}
}
