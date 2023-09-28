import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetDocumentService } from './timesheet-document.service';

describe('TimesheetDocumentService', () => {
  let service: TimesheetDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetDocumentService],
    }).compile();

    service = module.get<TimesheetDocumentService>(TimesheetDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
