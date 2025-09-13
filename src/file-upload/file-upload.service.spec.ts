import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadService } from './file-upload.service';
import { File } from './entities/file.entity';

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          // entities: [File],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([File]),
      ],
      providers: [FileUploadService],
    }).compile();

    service = module.get<FileUploadService>(FileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
