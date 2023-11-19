import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Request, Response } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants';
import { CreateExcelDto } from './dto/create-timesheet-to-excel.dto';
import { TimesheetToExcelService } from '../timesheet-to-excel/timesheet-to-excel.service';
import { UsersService } from '../users/users.service';
import { CreateTimesheetExcelDto } from '../timesheet-to-excel/dto/create-timesheet-excel.dto';

@ApiTags('Timesheet')
@Controller('timesheet')
export class TimesheetController {
  constructor(
    private readonly timesheetService: TimesheetService,
    private readonly toExcelService: TimesheetToExcelService,
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService) { }

  private async getUserId(@Request() request): Promise<number> {
    const token = this.authService.extractTokenFromHeader(request)
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: JWT_SECRET,
      }
    );
    return payload.sub;
  }

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTimesheetDto: CreateTimesheetDto, @Request() request) {
    const userId = await this.getUserId(request);
    return this.timesheetService.create(createTimesheetDto, userId);
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
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetService.update(+id, updateTimesheetDto);
  }

  @ApiBearerAuth()
  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(+id);
  }

  @ApiBearerAuth()
  @Post('/convert-to-excel')
  @HttpCode(HttpStatus.OK)
  async toExcel(@Body() excelDto: CreateExcelDto, @Request() request, @Response() res) {
    const userId = await this.getUserId(request);
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
