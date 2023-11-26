import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Request, Response, NotFoundException } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { CreateExcelDto } from './dto/create-timesheet-to-excel.dto';
import { TimesheetToExcelService } from '../timesheet-to-excel/timesheet-to-excel.service';
import { UsersService } from '../users/users.service';
import { CreateTimesheetExcelDto } from '../timesheet-to-excel/dto/create-timesheet-excel.dto';
import { RoleNames } from 'src/enums';

@ApiTags('Timesheet')
@Controller('timesheet')
export class TimesheetController {
  constructor(
    private readonly timesheetService: TimesheetService,
    private readonly toExcelService: TimesheetToExcelService,
    private authService: AuthService,
    private userService: UsersService
  ) { }


  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTimesheetDto: CreateTimesheetDto, @Request() request) {
    const {
      site_inspector_id, checker_2_id
    } = createTimesheetDto

    const userId = await this.authService.getUserIdFromJwt(request);
    const timesheet_user = await this.userService.findOneById(userId);
    if (!timesheet_user) {
      throw new NotFoundException(`User ${userId} does not exist`)
    }

    const site_inspector = await this.userService.checkUserRole(site_inspector_id, RoleNames.site_inspector);
    const checker_2 = await this.userService.checkUserRole(checker_2_id, RoleNames.checker2);
    return this.timesheetService.create(createTimesheetDto, timesheet_user, checker_2, site_inspector);
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.timesheetService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.timesheetService.findOne(+id);
  }

  @ApiBearerAuth()
  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
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

    for (const role of rolesToCheck) {
      if (role.id) {
        await this.userService.checkUserRole(role.id, role.roleToCheck);
      }
    }

    return this.timesheetService.update(+id, updateTimesheetDto);
  }

  @ApiBearerAuth()
  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.timesheetService.delete({ id: +id });
  }

  @ApiBearerAuth()
  @Post('/convert-to-excel')
  @HttpCode(HttpStatus.OK)
  async toExcel(@Body() excelDto: CreateExcelDto, @Request() request, @Response() res) {
    const userId = await this.authService.getUserIdFromJwt(request);
    const user = await this.userService.findOneById(userId);
    const userTimesheet = await this.timesheetService.findOneBy({
      period: excelDto.period,
      user: { id: user.id }
    })
    if (!userTimesheet) {
      throw new Error(`User [${user.name}]'s Timesheet with period [${excelDto.period}] not found`)
    }

    const createTimesheetData: CreateTimesheetExcelDto = {
      name: user.name,
      nip: user.nip,
      job_title: user.role.name,
      timesheet: userTimesheet,
      year: parseInt(excelDto.period.split('-')[0]),
      month: excelDto.period.split('-')[1]
    }

    const buffer = await this.toExcelService.create(createTimesheetData);
    res.setHeader("Content-Type", "application/vnd.ms-excel");
    res.setHeader("Content-disposition", "attachment; filename=biodata.xlsx");
    res.send(buffer);
  }
}
