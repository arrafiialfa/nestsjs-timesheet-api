import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetToExcelService } from './timesheet-to-excel.service';

describe('TimesheetToExcelService', () => {
  let service: TimesheetToExcelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetToExcelService],
    }).compile();

    service = module.get<TimesheetToExcelService>(TimesheetToExcelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
