import { Module } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { TimesheetDetailController } from './timesheet-detail.controller';
import { DatabaseModule } from 'src/database/database.module';
import { timesheetDetailProviders } from 'src/entities/providers/timesheet_detail.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TimesheetDetailController],
  providers: [TimesheetDetailService, ...timesheetDetailProviders],
  exports: [TimesheetDetailService]
})
export class TimesheetDetailModule { }
