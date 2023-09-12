import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Public()
@ApiTags('timesheet-details')
@Controller('timesheet-detail')
export class TimesheetDetailController {
  constructor(private readonly timesheetDetailService: TimesheetDetailService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createTimesheetDetailDto: CreateTimesheetDetailDto) {
    return this.timesheetDetailService.create(createTimesheetDetailDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.timesheetDetailService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.timesheetDetailService.findOne(+id);
  }

  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTimesheetDetailDto: UpdateTimesheetDetailDto) {
    return this.timesheetDetailService.update(+id, updateTimesheetDetailDto);
  }

  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.timesheetDetailService.remove(+id);
  }
}
