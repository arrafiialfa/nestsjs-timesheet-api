import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetDetailService } from './timesheet-detail.service';

describe('TimesheetDetailService', () => {
  let service: TimesheetDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetDetailService],
    }).compile();

    service = module.get<TimesheetDetailService>(TimesheetDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
