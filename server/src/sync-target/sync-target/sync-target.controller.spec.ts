import { Test, TestingModule } from '@nestjs/testing';
import { SyncTargetController } from './sync-target.controller';

describe('SyncTargetController', () => {
  let controller: SyncTargetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncTargetController],
    }).compile();

    controller = module.get<SyncTargetController>(SyncTargetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
