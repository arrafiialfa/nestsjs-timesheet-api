import { Injectable } from '@nestjs/common';
import { CreateExcelDto } from './dto/create-excel.dto';

@Injectable()
export class ExcelService {
  export(createExcelDto: CreateExcelDto,) {
    return createExcelDto
  }
}
