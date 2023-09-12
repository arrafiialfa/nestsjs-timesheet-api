import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Timesheet')
@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) { }

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetService.create(createTimesheetDto);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.timesheetService.findAll();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.timesheetService.findOne(+id);
  }

  @Public()
  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetService.update(+id, updateTimesheetDto);
  }

  @Public()
  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(+id);
  }
}
