import { Module } from '@nestjs/common';
import { TimesheetToExcelService } from './timesheet-to-excel.service';
import { HolidayModule } from '../holiday/holiday.module';

@Module({
  controllers: [],
  imports: [HolidayModule],
  providers: [TimesheetToExcelService],
  exports: [TimesheetToExcelService]
})
export class TimesheetToExcelModule { }
