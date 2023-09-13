import { Inject, Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Repository } from 'typeorm';
import { Timesheet } from 'src/entities/timesheet.entity';
import { UsersService } from '../users/users.service';
import { RoleNames } from 'src/enums';
import { TimesheetStatus } from 'src/enums';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TimesheetService {

  constructor(
    @Inject('TIMESHEET_REPOSITORY')
    private timesheetRepository: Repository<Timesheet>,
    private userService: UsersService,
  ) { }

  private checkUserRole(user: User, roleToCheck: string, roleLabel?: string): Array<string> {
    const errors = [];
    if (!user) {
      errors.push(`check ${roleLabel ?? roleToCheck}_id provided, ${roleLabel ?? roleToCheck}_id provided is not a user in the database`)
    } else if (!user.role) {
      errors.push(`${roleLabel ?? roleToCheck}_id provided does not have a role`)
    } else if (user.role?.name !== roleToCheck) {
      errors.push(`${roleLabel ?? roleToCheck}_id provided does not correspond to user with the role ${roleLabel ?? roleToCheck}`)
    }
    return errors
  }

  async create(createTimesheetDto: CreateTimesheetDto, user_id: number) {

    const {
      site_inspector_id, checker_2_id
    } = createTimesheetDto

    //if server throw error immediately client wont be able to know if the next id has an error or not
    const errMssg = [];

    const user = await this.userService.findOneById(user_id)
    const site_inspector = await this.userService.findOneById(site_inspector_id)
    const checker_2 = await this.userService.findOneById(checker_2_id)

    if (!user) {
      errMssg.push('user is not found in the database.')
    }

    const site_inspector_errors = this.checkUserRole(site_inspector, RoleNames.site_inspector)
    const checker_2_errors = this.checkUserRole(checker_2, RoleNames.checker2)
    errMssg.push(...site_inspector_errors);
    errMssg.push(...checker_2_errors);

    if (errMssg.length > 0) {
      throw new Error(`${errMssg.join(', ')}`);
    }

    const newTimesheet = this.timesheetRepository.create({
      user: user,
      site_inspector: site_inspector,
      checker_2: checker_2,
      status: TimesheetStatus.Waiting,
      ...createTimesheetDto
    });
    return this.timesheetRepository.save(newTimesheet)
  }

  findAll(): Promise<Timesheet[]> {
    return this.timesheetRepository.find();
  }

  async findOne(id: number): Promise<Timesheet> {
    const timesheet = await this.timesheetRepository
      .createQueryBuilder('timesheet')
      .leftJoinAndSelect('timesheet.timesheet_details', 'timesheet_details')
      .where('timesheet.id = :id', { id })
      .getOne();

    return timesheet;
  }

  async update(id: number, updateTimesheetDto: UpdateTimesheetDto) {

    const rolesToCheck = [
      {
        id: updateTimesheetDto.site_inspector_id,
        roleToCheck: RoleNames.site_inspector
      },
      {
        id: updateTimesheetDto.checker_2_id,
        roleToCheck: RoleNames.checker2
      }
    ]

    const errMssgs = []

    for (const role of rolesToCheck) {
      if (role.id) {
        const user = await this.userService.findOneById(role.id)
        const errors = this.checkUserRole(user, role.roleToCheck)
        errMssgs.push(...errors)
      }
    }

    if (errMssgs.length > 0) {
      throw new Error(`${errMssgs.join(', ')}`)
    }

    return this.timesheetRepository.update(id, updateTimesheetDto);
  }

  remove(id: number) {
    return this.timesheetRepository.softDelete(id);
  }
}
