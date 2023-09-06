import { Module } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { TimesheetDetailController } from './timesheet-detail.controller';
import { DatabaseModule } from 'src/database/database.module';
import { timesheetDetailProviders } from 'src/entities/providers/timesheet_detail.providers';
import { TimesheetService } from '../timesheet/timesheet.service';
import { ScopeOfWorkService } from '../scope-of-work/scope-of-work.service';
import { TimesheetModule } from '../timesheet/timesheet.module';
import { ScopeOfWorkModule } from '../scope-of-work/scope-of-work.module';

@Module({
  imports: [DatabaseModule, TimesheetModule, ScopeOfWorkModule],
  controllers: [TimesheetDetailController],
  providers: [TimesheetDetailService, TimesheetService, ScopeOfWorkService, ...timesheetDetailProviders,],
  exports: [TimesheetDetailService]
})
export class TimesheetDetailModule { }
