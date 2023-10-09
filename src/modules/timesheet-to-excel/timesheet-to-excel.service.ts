import { Injectable } from '@nestjs/common';
import { Timesheet } from 'src/entities/timesheet.entity';
import * as ExcelJS from 'exceljs'
import { CreateTimesheetExcelDto } from './dto/create-timesheet-excel.dto';
import * as fs from 'fs';
import * as path from 'path';
import { columns, fixed_layout } from './excel/timesheet-excel-layout';

@Injectable()
export class TimesheetToExcelService {

  //STEPS

  //GET TIMESHEET DATA : TIMESHEET []
  //GET HOLIDAY DATA : {date:string,name:string}

  //GET TIMESHEET TEMPLATE
  //EDIT HEADER, FOOTER
  //EDIT STATIC DATA

  //FILL HOLIDAY DATA
  //FILL ROWS WITH TIMESHEET DATA

  //GET TIMESHEET DATA PER PROJECT SORTED BY DATE.
  //FILL DATA FROM DATE 1 TO 31
  //ADD ROWS PER PROJECT

  private TIMESHEET_DATA_PROJECT1 = [{
    project_name: '',
    location_code: '',
    data: [{ date: 1, value: 0.8 }] //timesheet value sorted by date ///VALUE RANGES FROM 0 - 1
  }]

  private TIMESHEET_DATAS = [this.TIMESHEET_DATA_PROJECT1] //AND ALL OTHER PROJECT

  private TIMESHEET_VALUES =
    {
      '1': {
        values: [1, 1, 0.5, 1,] //...until date 31
      },
      '2': {
        values: []
      }, //ALL THE WAY TO DATE '31' :{}
    }

  private TIMESHEET_VALUES_MAP = [
    ['DATE', 'VALUES'],
    [2, [1, 1, 1, 0.5, 1]]
  ]

  //ITERATES TIMESHEET_DATAS
  //PUSH TIMESHEET_DATA_PROJECT<X> VALUES TO TIMESHEET_VALUES

  //CALCULATE TOTAL FROM TIMESHEET_VALUES
  //ADD NEW ROW FOR TOTAL

  async create(createTimesheetExcelDto: CreateTimesheetExcelDto[]) {

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('timesheet', { pageSetup: { paperSize: 9, orientation: 'landscape' } })


    //sheet.addRows([{ id: 1, name: 'John Dose', dob: new Date(1970, 1, 1) }]);

    const layouts = fixed_layout;
    console.log(layouts);
    this.createStaticLayouts(layouts, sheet)




    const folderPath = path.join(__dirname, '..', '..', '..', 'uploads');
    const filePath = path.join(folderPath, 'test.xlsx');

    await workbook.xlsx.writeFile(filePath)


    return createTimesheetExcelDto;
  }

  private createStaticLayouts(layout, worksheet: ExcelJS.Worksheet) {
    layout.map((key, i) => {
      const cell = worksheet.getCell(layout[i].origin);
      cell.style = layout[i].style
      cell.value = layout[i].value
      if (layout[i].mergeCells) {
        worksheet.mergeCells(layout[i].mergeCells)
      }
    })
  }



}
