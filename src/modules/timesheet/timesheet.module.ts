import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { timesheetProviders } from 'src/entities/providers/timesheet.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TimesheetController],
  providers: [TimesheetService, ...timesheetProviders],
  exports: [TimesheetService]
})
export class TimesheetModule { }