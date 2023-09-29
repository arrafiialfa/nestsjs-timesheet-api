import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetToExcelController } from './timesheet-to-excel.controller';
import { TimesheetToExcelService } from './timesheet-to-excel.service';

describe('TimesheetToExcelController', () => {
  let controller: TimesheetToExcelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetToExcelController],
      providers: [TimesheetToExcelService],
    }).compile();

    controller = module.get<TimesheetToExcelController>(TimesheetToExcelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
