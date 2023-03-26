import { Test, TestingModule } from '@nestjs/testing';
import { FilepathService } from './filepath.service';

describe('FilepathService', () => {
  let service: FilepathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilepathService],
    }).compile();

    service = module.get<FilepathService>(FilepathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
