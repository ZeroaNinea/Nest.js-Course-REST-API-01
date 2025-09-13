import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadController } from './file-upload.controller';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { File } from './entities/file.entity';
import { FileUploadService } from './file-upload.service';

describe('FileUploadController', () => {
  let controller: FileUploadController;

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
      controllers: [FileUploadController],
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

    controller = module.get<FileUploadController>(FileUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
