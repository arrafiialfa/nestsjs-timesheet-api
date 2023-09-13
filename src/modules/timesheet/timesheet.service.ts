import { Inject, Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Repository } from 'typeorm';
import { Timesheet } from 'src/entities/timesheet.entity';
import { UsersService } from '../users/users.service';
import { RoleNames } from 'src/enums';
import { TimesheetStatus } from 'src/enums';

@Injectable()
export class TimesheetService {

  constructor(
    @Inject('TIMESHEET_REPOSITORY')
    private timesheetRepository: Repository<Timesheet>,
    private userService: UsersService,
  ) { }

  async create(createTimesheetDto: CreateTimesheetDto, user_id: number) {

    const {
      site_inspector_id, checker_2_id
    } = createTimesheetDto

    const errMssg = [];

    const user = await this.userService.findOneById(user_id)
    const [site_inspector, siteInspector_role] = await this.userService.getUserRole(site_inspector_id)
    const [checker_2, checker_2_role] = await this.userService.getUserRole(checker_2_id)

    if (!user) {
      errMssg.push('user is not found in the database.')
    }

    const site_inspector_errors = this.checkUserRole(site_inspector, siteInspector_role, RoleNames.site_inspector)
    const checker_2_errors = this.checkUserRole(checker_2, checker_2_role, RoleNames.checker2)
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

  private checkUserRole(user, user_role, roleToCheck, roleLabel?): Array<string> {
    const errors = [];
    if (!user) {
      errors.push(`check ${roleLabel ?? roleToCheck}_id provided, ${roleLabel ?? roleToCheck}_id provided is not a user in the database`)
    } else if (user_role?.name !== roleToCheck) {
      errors.push(`${roleLabel ?? roleToCheck}_id provided does not correspond to user with the role ${roleLabel ?? roleToCheck} or ${roleLabel ?? roleToCheck}_id does not have a role`)
    }
    return errors
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

  update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetRepository.update(id, updateTimesheetDto);
  }

  remove(id: number) {
    return this.timesheetRepository.softDelete(id);
  }
}
