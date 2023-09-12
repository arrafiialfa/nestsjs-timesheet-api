import { Injectable, Inject } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Repository } from 'typeorm';
import { Holiday } from 'src/entities/holiday.entity';
import * as Papa from 'papaparse'


@Injectable()
export class HolidayService {

  constructor(
    @Inject('HOLIDAY_REPOSITORY')
    private holidayRepository: Repository<Holiday>
  ) { }

  create(createHolidayDto: CreateHolidayDto) {
    const newHolday = this.holidayRepository.create(createHolidayDto);
    return this.holidayRepository.save(newHolday);
  }

  async createFromCsv(csv: Express.Multer.File) {
    const { data, errors } = await Papa.parse(
      csv.buffer.toString(),
      {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      }
    )

    const saved = await this.holidayRepository.save(data)

    return { parsedData: data.length, parsingErrors: errors, savedToDB: saved.length, saved: saved }

  }

  findAll() {
    return this.holidayRepository.find();
  }

  findOne(id: number) {
    return this.holidayRepository.findOneBy({ id: id })
  }

  update(id: number, updateHolidayDto: UpdateHolidayDto) {
    return this.holidayRepository.update(id, updateHolidayDto)
  }

  remove(id: number) {
    return this.holidayRepository.softDelete({ id: id })
  }
}
