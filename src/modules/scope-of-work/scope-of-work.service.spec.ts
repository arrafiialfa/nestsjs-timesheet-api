import { Test, TestingModule } from '@nestjs/testing';
import { ScopeOfWorkService } from './scope-of-work.service';

describe('ScopeOfWorkService', () => {
  let service: ScopeOfWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScopeOfWorkService],
    }).compile();

    service = module.get<ScopeOfWorkService>(ScopeOfWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
