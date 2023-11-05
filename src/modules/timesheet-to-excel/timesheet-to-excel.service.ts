import { Injectable } from '@nestjs/common';
import { Timesheet } from 'src/entities/timesheet.entity';
import * as ExcelJS from 'exceljs'
import { CreateTimesheetExcelDto } from './dto/create-timesheet-excel.dto';
import * as fs from 'fs';
import * as path from 'path';
import { header } from './excel/timesheet-excel-layout';

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

    //CREATE HEADER
    //create fixed layout
    header.forEach((layout) => {
      if (layout.row) {
        const row = sheet.getRow(layout.row.key);
        Object.keys(layout.row).forEach(key => row[key] = layout.row[key])
      }

      if (layout.column) {
        const column = sheet.getColumn(layout.column.key)
        Object.keys(layout.column).forEach(key => column[key] = layout.column[key])
      }

      const cell = sheet.getCell(layout.origin);
      cell.style = layout.style
      cell.value = layout.value
      if (layout.mergeCells) {
        sheet.mergeCells(layout.mergeCells)
      }
    })

    //CREATE DATA


    //CREATE FOOTER


    //CREATE BUFFER
    const excelBuffer = await workbook.xlsx.writeBuffer();

    return excelBuffer;
  }



  private async exceljs_createTimesheetExcel(
    data,
    worksheet: ExcelJS.Worksheet,
  ) {


    Object.keys(data).forEach((key) => {
      const cell = worksheet.getCell(data[key].origin);
      console.log(data[key]);
      if (key !== "photo") {
        cell.value = data[key].value;
      }
    });



    //  add image
    //     const photo1 = workbook.addImage({
    //       buffer: photo,
    //       extension: "png",
    //     });

    //     worksheet.addImage(photo1, data["photo"].frame);



    // const biodataBuffer = await workbook.xlsx.writeBuffer();

    // return biodataBuffer;
  }




}
