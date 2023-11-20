import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { Repository } from 'typeorm';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';
import { TimesheetService } from '../timesheet/timesheet.service';
import { ScopeOfWorkService } from '../scope-of-work/scope-of-work.service';
import { ProjectService } from '../project/project.service';
import { FilesService } from '../files/files.service';
import { DEFAULT_WORK_HOURS } from 'src/constants';
import { parse } from "date-fns"
import { Timesheet } from 'src/entities/timesheet.entity';
@Injectable()
export class TimesheetDetailService {

  constructor(
    @Inject('TIMESHEET_DETAIL_REPOSITORY')
    private timesheetDetailRepository: Repository<TimesheetDetail>,
    private timesheetService: TimesheetService,
    private scopeOfWorkService: ScopeOfWorkService,
    private projectService: ProjectService,
    private filesService: FilesService
  ) { }


  private calculateValue(clock_in: string, clock_out: string): number {
    const format = 'HH:mm:ss';
    const parsedClockIn = parse(clock_in, format, new Date());
    const parsedClockOut = parse(clock_out, format, new Date());

    const workHours = parsedClockOut.getTime() - parsedClockIn.getTime();
    const hours = workHours / (60 * 60 * 1000); // Convert milliseconds to hours

    return hours / DEFAULT_WORK_HOURS;
  }

  private async handleFileUpload(files: Express.Multer.File[]): Promise<string> {
    const paths = await this.filesService.saveFiles(files)
    return paths.join(' | ')
  }

  async create(createTimesheetDetailDto: CreateTimesheetDetailDto, userTimesheet: Timesheet, files?: Express.Multer.File[]) {

    const { project_id, scope_of_work_id, clock_in, clock_out } = createTimesheetDetailDto

    const project = await this.projectService.findOne(project_id);
    const scopeOfWork = await this.scopeOfWorkService.findOne(scope_of_work_id)

    if (!project) {
      throw new NotFoundException('Check your project_id, Project is not found in DB. ')
    }
    if (!scopeOfWork) {
      throw new NotFoundException('Check your scope_of_work_id, Scope of Work is not found in DB. ')
    }

    const file_path = files.length > 0 ? await this.handleFileUpload(files) : null;

    const newTimesheetDetail = this.timesheetDetailRepository.create(
      {
        timesheet: userTimesheet,
        project: project,
        scope_of_work: scopeOfWork,
        value: this.calculateValue(clock_in, clock_out),
        file_path: file_path,
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
