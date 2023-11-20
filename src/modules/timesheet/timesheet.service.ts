import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Timesheet } from 'src/entities/timesheet.entity';
import { UsersService } from '../users/users.service';
import { RoleNames, TimesheetStatus } from 'src/enums';
import { User } from 'src/entities/user.entity';

export interface TimesheetUserDto {
  timesheet_user: User
  site_inspector: User,
  checker_2: User
}
@Injectable()
export class TimesheetService {

  constructor(
    @Inject('TIMESHEET_REPOSITORY')
    private timesheetRepository: Repository<Timesheet>,
    private userService: UsersService,
  ) { }

  async create(createTimesheetDto: CreateTimesheetDto, user_id: number): Promise<Timesheet> {

    const {
      site_inspector_id, checker_2_id
    } = createTimesheetDto

    const timesheet_user = await this.userService.findOneById(user_id);
    if (!timesheet_user) {
      throw new NotFoundException(`User ${user_id} does not exist`)
    }
    const site_inspector = await this.userService.checkUserRole(site_inspector_id, RoleNames.site_inspector);
    const checker_2 = await this.userService.checkUserRole(checker_2_id, RoleNames.checker2);

    const newTimesheet = this.timesheetRepository.create({
      user: timesheet_user,
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

  find(where: FindOptionsWhere<Timesheet>): Promise<Timesheet[]> {
    return this.timesheetRepository.findBy(where)
  }

  findOneBy(where: FindOptionsWhere<Timesheet>): Promise<Timesheet> {
    return this.timesheetRepository.findOne({
      where: where,
      relations: {
        user: true,
        site_inspector: true,
        checker_2: true,
        timesheet_details: {
          project: true
        }
      }
    })
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
        await this.userService.checkUserRole(role.id, role.roleToCheck);
      }
    }

    if (errMssgs.length > 0) {
      throw new Error(`${errMssgs.join(', ')}`)
    }

    return this.timesheetRepository.update(id, updateTimesheetDto);
  }

  softDelete(id: number) {
    return this.timesheetRepository.softDelete(id);
  }

  delete(FindOptionsWhere: FindOptionsWhere<Timesheet>) {
    return this.timesheetRepository.delete(FindOptionsWhere);
  }
}
