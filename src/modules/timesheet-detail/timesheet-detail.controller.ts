import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Weather } from 'src/enums';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('timesheet-detail')
export class TimesheetDetailController {
  constructor(private readonly timesheetDetailService: TimesheetDetailService) { }

  @Post()
  @ApiProperty({ name: 'weather', enumName: 'weather', enum: Weather })
  create(@Body() createTimesheetDetailDto: CreateTimesheetDetailDto) {
    return this.timesheetDetailService.create(createTimesheetDetailDto);
  }

  @Get()
  findAll() {
    return this.timesheetDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetDetailDto: UpdateTimesheetDetailDto) {
    return this.timesheetDetailService.update(+id, updateTimesheetDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetDetailService.remove(+id);
  }
}
