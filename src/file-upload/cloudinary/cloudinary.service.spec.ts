import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
