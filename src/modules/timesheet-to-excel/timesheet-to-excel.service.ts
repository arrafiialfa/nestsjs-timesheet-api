import { Injectable } from '@nestjs/common';
import { CreateTimesheetToExcelDto } from './dto/create-timesheet-to-excel.dto';
import { UpdateTimesheetToExcelDto } from './dto/update-timesheet-to-excel.dto';

@Injectable()
export class TimesheetToExcelService {
  create(createTimesheetToExcelDto: CreateTimesheetToExcelDto) {
    return 'This action adds a new timesheetToExcel';
  }

  findAll() {
    return `This action returns all timesheetToExcel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timesheetToExcel`;
  }

  update(id: number, updateTimesheetToExcelDto: UpdateTimesheetToExcelDto) {
    return `This action updates a #${id} timesheetToExcel`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheetToExcel`;
  }
}
