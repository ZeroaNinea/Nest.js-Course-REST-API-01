import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadService } from './file-upload.service';
import { File } from './entities/file.entity';
import { CloudinaryService } from './cloudinary/cloudinary.service';

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
      providers: [
        FileUploadService,
        CloudinaryService,
        {
          provide: 'CLOUDINARY',
          useValue: {
            uploader: {
              upload_stream: jest
                .fn()
                .mockImplementation(
                  (
                    _opts,
                    cb: (
                      nullValue: null,
                      { secure_url }: { secure_url: string },
                    ) => void,
                  ) => {
                    cb(null, { secure_url: 'http://fake-url.com/image.png' });
                    return {};
                  },
                ),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FileUploadService>(FileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
