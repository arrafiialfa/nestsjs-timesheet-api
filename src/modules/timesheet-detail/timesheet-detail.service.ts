import { Injectable, Inject } from '@nestjs/common';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { Repository } from 'typeorm';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';
import { TimesheetService } from '../timesheet/timesheet.service';
import { ScopeOfWorkService } from '../scope-of-work/scope-of-work.service';
@Injectable()
export class TimesheetDetailService {

  constructor(
    @Inject('TIMESHEET_DETAIL_REPOSITORY')
    private timesheetDetailRepository: Repository<TimesheetDetail>,
    private timesheetService: TimesheetService,
    private scopeOfWorkService: ScopeOfWorkService
  ) { }

  async create(createTimesheetDetailDto: CreateTimesheetDetailDto) {
    //check if timesheet_id exists
    //check if project_id exists
    //check if scope_of_work_id exists
    //else throw error

    let errMssg = null;
    const timesheet = await this.timesheetService.findOne(createTimesheetDetailDto.timesheet_id)
    const project = 'project exists'
    const scopeOfWork = await this.scopeOfWorkService.findOne(createTimesheetDetailDto.scope_of_work_id)
    if (!timesheet) {
      errMssg += 'Check your timesheet_id, Timesheet is not found in DB. '
    }
    if (!project) {
      errMssg += 'Check your project_id, Project is not found in DB. '
    }
    if (!scopeOfWork) {
      errMssg += 'Check your scope_of_work_id, Scope of Work is not found in DB. '
    }

    if (errMssg) {
      throw new Error(errMssg)
    }

    return this.timesheetDetailRepository.create(createTimesheetDetailDto)
  }

  findAll() {
    return this.timesheetDetailRepository.find();
  }

  findOne(id: number) {
    return this.timesheetDetailRepository.findOneBy({ id: id });
  }

  update(id: number, updateTimesheetDetailDto: UpdateTimesheetDetailDto) {
    return this.timesheetDetailRepository.update(id, updateTimesheetDetailDto);
  }

  remove(id: number) {
    return this.timesheetDetailRepository.softDelete(id);
  }
}
