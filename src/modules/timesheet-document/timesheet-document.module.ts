import { Module } from '@nestjs/common';
import { TimesheetDocumentService } from './timesheet-document.service';
import { TimesheetDocumentController } from './timesheet-document.controller';

@Module({
  controllers: [TimesheetDocumentController],
  providers: [TimesheetDocumentService]
})
export class TimesheetDocumentModule {}
