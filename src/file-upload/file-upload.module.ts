import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
