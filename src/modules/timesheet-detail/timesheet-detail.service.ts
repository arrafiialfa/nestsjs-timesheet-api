import { Injectable, Inject } from '@nestjs/common';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { Repository } from 'typeorm';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';
import { TimesheetService } from '../timesheet/timesheet.service';
import { ScopeOfWorkService } from '../scope-of-work/scope-of-work.service';
import { ProjectService } from '../project/project.service';
import { CreateTimesheetDto } from '../timesheet/dto/create-timesheet.dto';
@Injectable()
export class TimesheetDetailService {

  constructor(
    @Inject('TIMESHEET_DETAIL_REPOSITORY')
    private timesheetDetailRepository: Repository<TimesheetDetail>,
    private timesheetService: TimesheetService,
    private scopeOfWorkService: ScopeOfWorkService,
    private projectService: ProjectService
  ) { }

  async create(createTimesheetDetailDto: CreateTimesheetDetailDto, user_id) {

    const { timesheet_id, project_id, scope_of_work_id } = createTimesheetDetailDto

    const errMssg = [];
    const timesheet = await this.timesheetService.findOne(timesheet_id)
    const project = await this.projectService.findOne(project_id);
    const scopeOfWork = await this.scopeOfWorkService.findOne(scope_of_work_id)

    if (!project) {
      errMssg.push('Check your project_id, Project is not found in DB. ')
    }
    if (!scopeOfWork) {
      errMssg.push('Check your scope_of_work_id, Scope of Work is not found in DB. ')
    }

    if (errMssg.length > 0) {
      throw new Error(errMssg.join(", "))
    }

    let new_timesheet = null
    if (!timesheet) {
      const createTimesheetDto: CreateTimesheetDto = {
        site_inspector_id: createTimesheetDetailDto.site_inspector_id,
        checker_2_id: createTimesheetDetailDto.checker_2_id,
        period: createTimesheetDetailDto.period
      }

      new_timesheet = await this.timesheetService.create(createTimesheetDto, user_id)
    }

    const newTimesheetDetail = this.timesheetDetailRepository.create(
      {
        timesheet: timesheet ?? new_timesheet,
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
