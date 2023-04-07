import { Test, TestingModule } from '@nestjs/testing';
import { SyncTargetController } from './sync-target.controller';
import { SyncTargetService } from './sync-target.service';

describe('SyncTargetController', () => {
  let controller: SyncTargetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncTargetController],
      providers: [SyncTargetService],
    }).compile();

    controller = module.get<SyncTargetController>(SyncTargetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
