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

    const {
      user_id, site_inspector_id, checker_2_id
    } = createTimesheetDto

    const errMssg = [];
    const user = await this.userService.findOneById(user_id)
    if (!user) {
      errMssg.push('check user_id provided, user is not found in the database.')
    }

    if (site_inspector_id) {
      const site_inspector = await this.userService.getUserRole(site_inspector_id)
      if (!site_inspector) {
        errMssg.push('check site_inspector_id provided, site_inspector_id provided does not have a role or is not a user in the database')
      }
      if (site_inspector && site_inspector.name !== 'site_inspector') {
        errMssg.push('site_inspector_id provided does not correspond to user with role=site_inspector.')
      }
    }

    if (checker_2_id) {
      const checker_2 = await this.userService.findOneById(checker_2_id)
      if (!checker_2) {
        errMssg.push('check checker_2_id provided, checker_2 is not found in the database.')
      }
    }

    if (errMssg.length > 0) {
      throw new Error(`${errMssg.join(', ')}`);
    }

    return

    const newTimesheet = this.timesheetRepository.create({ user: user, ...createTimesheetDto });
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
