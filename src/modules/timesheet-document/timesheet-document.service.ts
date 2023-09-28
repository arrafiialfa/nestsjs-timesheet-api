import { Injectable } from '@nestjs/common';
import { CreateTimesheetDocumentDto } from './dto/create-timesheet-document.dto';
import { UpdateTimesheetDocumentDto } from './dto/update-timesheet-document.dto';

@Injectable()
export class TimesheetDocumentService {
  create(createTimesheetDocumentDto: CreateTimesheetDocumentDto) {
    return 'This action adds a new timesheetDocument';
  }

  findAll() {
    return `This action returns all timesheetDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timesheetDocument`;
  }

  update(id: number, updateTimesheetDocumentDto: UpdateTimesheetDocumentDto) {
    return `This action updates a #${id} timesheetDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheetDocument`;
  }
}
