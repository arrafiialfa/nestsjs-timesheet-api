import { Injectable } from '@nestjs/common';
import { Timesheet } from 'src/entities/timesheet.entity';

@Injectable()
export class TimesheetToExcelService {
  create(timesheet: Timesheet[]) {
    return timesheet;
  }
}
