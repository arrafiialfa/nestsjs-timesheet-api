import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Request } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants';
import { CreateTimesheetToExcelDto } from '../timesheet-to-excel/dto/create-timesheet-to-excel.dto';
import { TimesheetToExcelService } from '../timesheet-to-excel/timesheet-to-excel.service';

@ApiTags('Timesheet')
@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService, private readonly toExcelService: TimesheetToExcelService, private authService: AuthService, private jwtService: JwtService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTimesheetDto: CreateTimesheetDto, @Request() request) {
    const token = this.authService.extractTokenFromHeader(request)
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: JWT_SECRET,
      }
    );
    return this.timesheetService.create(createTimesheetDto, payload.sub);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.timesheetService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.timesheetService.findOne(+id);
  }

  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetService.update(+id, updateTimesheetDto);
  }

  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(+id);
  }

  @Post('/convert-to-excel')
  @HttpCode(HttpStatus.OK)
  toExcel(@Body() convertToExcel: CreateTimesheetToExcelDto) {
    return this.toExcelService.create(convertToExcel);
  }
}
