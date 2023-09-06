import { Injectable } from '@nestjs/common';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';

@Injectable()
export class TimesheetDetailService {
  create(createTimesheetDetailDto: CreateTimesheetDetailDto) {
    return 'This action adds a new timesheetDetail';
  }

  findAll() {
    return `This action returns all timesheetDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timesheetDetail`;
  }

  update(id: number, updateTimesheetDetailDto: UpdateTimesheetDetailDto) {
    return `This action updates a #${id} timesheetDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheetDetail`;
  }
}
