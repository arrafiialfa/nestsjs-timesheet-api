import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetDocumentController } from './timesheet-document.controller';
import { TimesheetDocumentService } from './timesheet-document.service';

describe('TimesheetDocumentController', () => {
  let controller: TimesheetDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimesheetDocumentController],
      providers: [TimesheetDocumentService],
    }).compile();

    controller = module.get<TimesheetDocumentController>(TimesheetDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
