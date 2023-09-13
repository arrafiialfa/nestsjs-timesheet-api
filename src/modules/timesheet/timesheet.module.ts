import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { timesheetProviders } from 'src/entities/providers/timesheet.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, JwtModule, AuthModule],
  controllers: [TimesheetController],
  providers: [TimesheetService, ...timesheetProviders],
  exports: [TimesheetService, ...timesheetProviders]
})
export class TimesheetModule { }
