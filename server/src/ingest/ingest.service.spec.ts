import { Test, TestingModule } from '@nestjs/testing';
import { FilepathService } from '../shared/filepath/filepath.service';
import { IngestService } from './ingest.service';

describe('IngestService', () => {
  let service: IngestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngestService, FilepathService],
    }).compile();

    service = module.get<IngestService>(IngestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
