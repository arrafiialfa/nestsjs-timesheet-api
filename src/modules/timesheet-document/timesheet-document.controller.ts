import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesheetDocumentService } from './timesheet-document.service';
import { CreateTimesheetDocumentDto } from './dto/create-timesheet-document.dto';
import { UpdateTimesheetDocumentDto } from './dto/update-timesheet-document.dto';

@Controller('timesheet-document')
export class TimesheetDocumentController {
  constructor(private readonly timesheetDocumentService: TimesheetDocumentService) {}

  @Post()
  create(@Body() createTimesheetDocumentDto: CreateTimesheetDocumentDto) {
    return this.timesheetDocumentService.create(createTimesheetDocumentDto);
  }

  @Get()
  findAll() {
    return this.timesheetDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetDocumentDto: UpdateTimesheetDocumentDto) {
    return this.timesheetDocumentService.update(+id, updateTimesheetDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetDocumentService.remove(+id);
  }
}
