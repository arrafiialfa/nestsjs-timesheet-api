import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Request, UploadedFiles, NotFoundException } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { TimesheetService } from '../timesheet/timesheet.service';
import { UsersService } from '../users/users.service';
import { RoleNames } from 'src/enums';
import { ProjectService } from '../project/project.service';
import { ScopeOfWorkService } from '../scope-of-work/scope-of-work.service';

@ApiTags('timesheet-details')
@Controller('timesheet-detail')
export class TimesheetDetailController {
  constructor(
    private readonly timesheetService: TimesheetService,
    private readonly timesheetDetailService: TimesheetDetailService,
    private readonly userService: UsersService,
    private readonly projectService: ProjectService,
    private readonly scopeOfWorkService: ScopeOfWorkService,
    private authService: AuthService
  ) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(@Body() createTimesheetDetailDto: CreateTimesheetDetailDto, @UploadedFiles() files, @Request() request) {
    const { checker_2_id, site_inspector_id, project_id, scope_of_work_id, period } = createTimesheetDetailDto;
    const user_id = await this.authService.getUserIdFromJwt(request);
    const user = await this.userService.findOneById(user_id);

    let usersTimesheet = await this.timesheetService.findOneBy({
      period: period,
      user: user
    })

    const site_inspector = await this.userService.checkUserRole(site_inspector_id, RoleNames.site_inspector);
    const checker_2 = await this.userService.checkUserRole(checker_2_id, RoleNames.checker2)

    //create new timesheet if user's timesheet for that period is not found
    if (!usersTimesheet) {
      usersTimesheet = await this.timesheetService.create(
        { site_inspector_id, checker_2_id, period }, user, site_inspector, checker_2
      )
    }

    const project = await this.projectService.findOne(project_id)
    if (!project) {
      throw new NotFoundException('Check your project_id, Project is not found in DB. ')
    }
    const scopeOfWork = await this.scopeOfWorkService.findOne(scope_of_work_id)
    if (!scopeOfWork) {
      throw new NotFoundException('Check your scope_of_work_id, Scope of Work is not found in DB. ')
    }

    return this.timesheetDetailService.create(createTimesheetDetailDto, usersTimesheet, project, scopeOfWork, files);
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.timesheetDetailService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.timesheetDetailService.findOne(+id);
  }

  @ApiBearerAuth()
  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTimesheetDetailDto: UpdateTimesheetDetailDto) {
    return this.timesheetDetailService.update(+id, updateTimesheetDetailDto);
  }

  @ApiBearerAuth()
  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.timesheetDetailService.remove(+id);
  }
}
