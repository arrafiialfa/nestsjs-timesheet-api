import { Injectable, Inject } from '@nestjs/common';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { Repository } from 'typeorm';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';
import { FilesService } from '../files/files.service';
import { DEFAULT_WORK_HOURS } from 'src/constants';
import { parse } from "date-fns"
import { Timesheet } from 'src/entities/timesheet.entity';
import { Project } from 'src/entities/project.entity';
import { ScopeOfWork } from 'src/entities/scope_of_work.entity';
@Injectable()
export class TimesheetDetailService {

  constructor(
    @Inject('TIMESHEET_DETAIL_REPOSITORY')
    private timesheetDetailRepository: Repository<TimesheetDetail>,
    private filesService: FilesService
  ) { }


  public calculateValue(clock_in: string, clock_out: string): number {
    const format = 'HH:mm:ss';
    // Function to enforce 'HH:mm:ss' format if seconds are not provided
    const enforceFormat = (time: string) => (time.length === 5 ? time + ':00' : time);

    const parsedClockIn = parse(enforceFormat(clock_in), format, new Date());
    const parsedClockOut = parse(enforceFormat(clock_out), format, new Date());


    const workHours = parsedClockOut.getTime() - parsedClockIn.getTime();
    const hours = workHours / (60 * 60 * 1000); // Convert milliseconds to hours

    return hours / DEFAULT_WORK_HOURS;
  }

  private async handleFileUpload(files: Express.Multer.File[]): Promise<string> {
    const paths = await this.filesService.saveFiles(files)
    return paths.join(' | ')
  }

  async create(createTimesheetDetailDto: CreateTimesheetDetailDto, userTimesheet: Timesheet, project: Project, scopeOfWork: ScopeOfWork, files?: Express.Multer.File[]) {

    const { clock_in, clock_out } = createTimesheetDetailDto

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
