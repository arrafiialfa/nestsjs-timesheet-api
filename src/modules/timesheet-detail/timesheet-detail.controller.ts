import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Request, UploadedFiles } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { TimesheetService } from '../timesheet/timesheet.service';

@ApiTags('timesheet-details')
@Controller('timesheet-detail')
export class TimesheetDetailController {
  constructor(
    private readonly timesheetService: TimesheetService,
    private readonly timesheetDetailService: TimesheetDetailService,
    private authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(@Body() createTimesheetDetailDto: CreateTimesheetDetailDto, @UploadedFiles() files, @Request() request) {
    const { checker_2_id, site_inspector_id, period } = createTimesheetDetailDto;
    const user_id = await this.authService.getUserIdFromJwt(request);
    let userTimesheet = await this.timesheetService.findOneBy({
      period: period,
      user: { id: user_id }
    })

    if (!userTimesheet) {
      //create new timesheet if user timesheet for that period is not found
      userTimesheet = await this.timesheetService.create(
        {
          site_inspector_id: site_inspector_id,
          checker_2_id: checker_2_id,
          period: period
        },
        user_id)
    }

    return this.timesheetDetailService.create(createTimesheetDetailDto, userTimesheet, files);
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
