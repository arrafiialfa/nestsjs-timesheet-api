import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UploadedFiles } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CsvUploadDto } from './dto/upload-csv.dto';
import { extname } from 'path';

@Controller('holiday')
@Public()
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.holidayService.create(createHolidayDto);
  }

  @Post('/create-from-csv')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload CSV File to fill holiday table',
    type: CsvUploadDto,
  })
  @HttpCode(HttpStatus.OK)
  async createFromCSV(@UploadedFiles() file: Express.Multer.File[]) {
    if (file.length > 1) {
      throw new Error('Please upload only one CSV file')
    }

    if (file.length > 0) {
      const ext = extname(file[0].originalname)
      if (ext !== '.csv') {
        throw new Error('Only .csv file is allowed')
      }
      return this.holidayService.createFromCsv(file[0]);
    }

    throw new Error('A File(s) must be uploaded')
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.holidayService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.holidayService.findOne(+id);
  }

  @Post('/update/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidayService.update(+id, updateHolidayDto);
  }

  @Post('/delete/:id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.holidayService.remove(+id);
  }
}
