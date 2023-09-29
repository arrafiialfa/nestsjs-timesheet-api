import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesheetToExcelService } from './timesheet-to-excel.service';
import { CreateTimesheetToExcelDto } from './dto/create-timesheet-to-excel.dto';
import { UpdateTimesheetToExcelDto } from './dto/update-timesheet-to-excel.dto';

@Controller('timesheet-to-excel')
export class TimesheetToExcelController {
  constructor(private readonly timesheetToExcelService: TimesheetToExcelService) {}

  @Post()
  create(@Body() createTimesheetToExcelDto: CreateTimesheetToExcelDto) {
    return this.timesheetToExcelService.create(createTimesheetToExcelDto);
  }

  @Get()
  findAll() {
    return this.timesheetToExcelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetToExcelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetToExcelDto: UpdateTimesheetToExcelDto) {
    return this.timesheetToExcelService.update(+id, updateTimesheetToExcelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetToExcelService.remove(+id);
  }
}
