import { Module } from '@nestjs/common';
import { TimesheetToExcelService } from './timesheet-to-excel.service';
import { TimesheetToExcelController } from './timesheet-to-excel.controller';

@Module({
  controllers: [TimesheetToExcelController],
  providers: [TimesheetToExcelService]
})
export class TimesheetToExcelModule {}
