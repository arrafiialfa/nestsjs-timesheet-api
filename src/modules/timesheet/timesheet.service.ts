import { Inject, Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Repository } from 'typeorm';
import { Timesheet } from 'src/entities/timesheet.entity';

@Injectable()
export class TimesheetService {

  constructor(
    @Inject('TIMESHEET_REPOSITORY')
    private timesheetRepository: Repository<Timesheet>
  ) { }

  create(createTimesheetDto: CreateTimesheetDto) {

    //check user id exists in db or not
    //if provided, check:
    //site_inspector_id
    //checker_2_id
    //if exist continue, else throw error

    return this.timesheetRepository.create(createTimesheetDto);
  }

  findAll(): Promise<Timesheet[]> {
    return this.timesheetRepository.find();
  }

  findOne(id: number): Promise<Timesheet> {
    return this.timesheetRepository.findOneBy({ id: id });
  }

  update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetRepository.update(id, updateTimesheetDto);
  }

  remove(id: number) {
    return this.timesheetRepository.softDelete(id);
  }
}
