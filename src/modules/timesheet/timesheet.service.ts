import { Inject, Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Repository } from 'typeorm';
import { Timesheet } from 'src/entities/timesheet.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TimesheetService {

  constructor(
    @Inject('TIMESHEET_REPOSITORY')
    private timesheetRepository: Repository<Timesheet>,
    private userService: UsersService
  ) { }

  async create(createTimesheetDto: CreateTimesheetDto) {

    //check user id exists in db or not
    //else throw error

    //site_inspector_id
    //check if site_inspector_id exists as user in db 
    //check if user IS site_inspector
    //if not throw error

    //checker_2_id
    //check if checker_2_id exists as user in db

    let errMssg = null;
    const user = await this.userService.findOneById(createTimesheetDto.user_id)
    if (!user) {
      errMssg += 'check user_id provided, user is not found in the database'
    }
    if (errMssg) {
      throw new Error(errMssg)
    }


    const newTimesheet = this.timesheetRepository.create({ user: user, ...createTimesheetDto });
    console.log('dto', createTimesheetDto, 'newtimesheet', newTimesheet)
    return
    return this.timesheetRepository.save(newTimesheet)
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
