import { Module } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { TimesheetDetailController } from './timesheet-detail.controller';
import { DatabaseModule } from 'src/database/database.module';
import { timesheetDetailProviders } from 'src/entities/providers/timesheet_detail.providers';
import { TimesheetModule } from '../timesheet/timesheet.module';
import { ScopeOfWorkModule } from '../scope-of-work/scope-of-work.module';
import { ProjectModule } from '../project/project.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [DatabaseModule, TimesheetModule, ScopeOfWorkModule, ProjectModule, JwtModule, AuthModule, FilesModule],
  controllers: [TimesheetDetailController],
  providers: [TimesheetDetailService, ...timesheetDetailProviders,],
  exports: [TimesheetDetailService]
})
export class TimesheetDetailModule { }
