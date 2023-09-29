import { Module } from '@nestjs/common';
import { TimesheetToExcelService } from './timesheet-to-excel.service';

@Module({
  controllers: [],
  providers: [TimesheetToExcelService],
  exports: [TimesheetToExcelService]
})
export class TimesheetToExcelModule { }
