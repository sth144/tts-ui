import { Test, TestingModule } from '@nestjs/testing';
import { ServerStateService } from './state.service';

describe('ServerStateService', () => {
  let service: ServerStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerStateService],
    }).compile();

    service = module.get<ServerStateService>(ServerStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
