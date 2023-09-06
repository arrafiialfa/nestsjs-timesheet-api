import { Module } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { TimesheetDetailController } from './timesheet-detail.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TimesheetDetailController],
  providers: [TimesheetDetailService],
  exports: [TimesheetDetailService]
})
export class TimesheetDetailModule { }
