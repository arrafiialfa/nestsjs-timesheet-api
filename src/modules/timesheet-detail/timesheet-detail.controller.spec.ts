import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetDetailController } from './timesheet-detail.controller';
import { TimesheetDetailService } from './timesheet-detail.service';

describe('TimesheetDetailController', () => {
  let controller: TimesheetDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetDetailController],
      providers: [TimesheetDetailService],
    }).compile();

    controller = module.get<TimesheetDetailController>(TimesheetDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
