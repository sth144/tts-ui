import { Test, TestingModule } from '@nestjs/testing';
import { SyncTargetService } from './sync-target.service';

describe('SyncTargetService', () => {
  let service: SyncTargetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyncTargetService],
    }).compile();

    service = module.get<SyncTargetService>(SyncTargetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
