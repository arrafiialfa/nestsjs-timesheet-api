import { Module } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';
import { DatabaseModule } from 'src/database/database.module';
import { holidayProviders } from 'src/entities/providers/holiday.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [HolidayController],
  providers: [HolidayService, ...holidayProviders],
  exports: [HolidayService, ...holidayProviders]
})
export class HolidayModule { }
