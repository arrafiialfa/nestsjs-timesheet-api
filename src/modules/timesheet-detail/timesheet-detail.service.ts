import { Injectable, Inject } from '@nestjs/common';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { Repository } from 'typeorm';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';
import { TimesheetService } from '../timesheet/timesheet.service';
import { ScopeOfWorkService } from '../scope-of-work/scope-of-work.service';
import { ProjectService } from '../project/project.service';
@Injectable()
export class TimesheetDetailService {

  constructor(
    @Inject('TIMESHEET_DETAIL_REPOSITORY')
    private timesheetDetailRepository: Repository<TimesheetDetail>,
    private timesheetService: TimesheetService,
    private scopeOfWorkService: ScopeOfWorkService,
    private projectService: ProjectService
  ) { }

  async create(createTimesheetDetailDto: CreateTimesheetDetailDto) {

    const errMssg = [];
    const timesheet = await this.timesheetService.findOne(createTimesheetDetailDto.timesheet_id)
    const project = await this.projectService.findOne(createTimesheetDetailDto.project_id);
    const scopeOfWork = await this.scopeOfWorkService.findOne(createTimesheetDetailDto.scope_of_work_id)
    if (!timesheet) {
      errMssg.push('Check your timesheet_id, Timesheet is not found in DB. ')
    }
    if (!project) {
      errMssg.push('Check your project_id, Project is not found in DB. ')
    }
    if (!scopeOfWork) {
      errMssg.push('Check your scope_of_work_id, Scope of Work is not found in DB. ')
    }

    if (errMssg.length > 0) {
      throw new Error(errMssg.join(", "))
    }

    const newTimesheetDetail = this.timesheetDetailRepository.create(
      {
        timesheet: timesheet,
        project: project,
        scope_of_work: scopeOfWork,
        ...createTimesheetDetailDto
      }
    )
    return this.timesheetDetailRepository.save(newTimesheetDetail)
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
