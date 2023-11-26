import { Inject, Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Timesheet } from 'src/entities/timesheet.entity';
import { TimesheetStatus } from 'src/enums';
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
  ) { }

  async create(createTimesheetDto: CreateTimesheetDto, timesheetUser: User, siteInspector: User, checker_2: User): Promise<Timesheet> {
    const newTimesheet = this.timesheetRepository.create({
      user: timesheetUser,
      site_inspector: siteInspector,
      checker_2: checker_2,
      status: TimesheetStatus.Waiting,
      ...createTimesheetDto
    })
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
    return this.timesheetRepository.update(id, updateTimesheetDto);
  }

  softDelete(id: number) {
    return this.timesheetRepository.softDelete(id);
  }

  delete(findOptionsWhere: FindOptionsWhere<Timesheet>) {
    return this.timesheetRepository.delete(findOptionsWhere);
  }
}
