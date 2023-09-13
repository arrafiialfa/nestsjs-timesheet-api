import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JWT_SECRET } from 'src/constants';

@Public()
@ApiTags('timesheet-details')
@Controller('timesheet-detail')
export class TimesheetDetailController {
  constructor(
    private readonly timesheetDetailService: TimesheetDetailService,
    private jwtService: JwtService,
    private authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTimesheetDetailDto: CreateTimesheetDetailDto, @Request() request) {
    const token = this.authService.extractTokenFromHeader(request)
    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: JWT_SECRET,
      }
    );
    return this.timesheetDetailService.create(createTimesheetDetailDto, payload.sub);
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
