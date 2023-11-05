import { Injectable } from '@nestjs/common';
import { Timesheet } from 'src/entities/timesheet.entity';
import * as ExcelJS from 'exceljs'
import { CreateTimesheetExcelDto } from './dto/create-timesheet-excel.dto';
import * as fs from 'fs';
import * as path from 'path';
import { header } from './excel/timesheet-excel-layout';
import { HolidayService } from '../holiday/holiday.service';
import { Month } from 'src/enums';
import { User } from 'src/entities/user.entity';
import { Project } from 'src/entities/project.entity';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';


interface values_per_dates {
  date: Date,
  isHoliday?: {
    name: string
  },
  values: [number]
}

interface TimesheetPerProject {
  project: Project,
  values: [
    {
      date: Date,
      value: number
    }
  ]
}

//MAP TIMESHEETDATA
//timesheet_per_project[key]={...rest,values = values.push()}

@Injectable()
export class TimesheetToExcelService {


  constructor(private readonly holidayService: HolidayService) { }


  private async prepareTimesheetData(timesheet: Timesheet) {
    /** 
     * key = project_name or id
     * value = TimesheetPerProject
     */
    const timesheetPerProject = new Map<string, TimesheetPerProject>();
    /** 
     * key = date
     * value = values_per_dates 
     * store value from timesheet_details into each date
     */
    const values_per_dates = new Map<string, values_per_dates>()


    timesheet.timesheet_details.forEach((details) => {
      const project_id = details.project.id;
      const currentprojectvalues = timesheetPerProject.get(`${project_id}`);
      //get or create
      if (!currentprojectvalues) {
        timesheetPerProject.set(`${project_id}`, {
          project: details.project,
          values: [{
            date: details.date,
            value: details.value
          }]
        })
      } else {
        currentprojectvalues.project = details.project;
        currentprojectvalues.values.push({
          date: details.date,
          value: details.value
        });
      }

      const currentdatevalues = values_per_dates.get(`${details.date}`);
      if (!currentdatevalues) {
        values_per_dates.set(`${details.date}`, {
          date: details.date,
          values: [details.value]
        })
      } else {
        currentdatevalues.date = details.date;
        currentdatevalues.values.push(details.value);
      }

    })

    console.log(timesheetPerProject, values_per_dates)
    return { timesheetPerProject, values_per_dates }
  }

  async create(createTimesheetExcelDto: CreateTimesheetExcelDto) {

    const timesheetData = await this.prepareTimesheetData(createTimesheetExcelDto.timesheet);
    console.log(createTimesheetExcelDto);
    const holidays = await this.holidayService.find({
      year: createTimesheetExcelDto.year,
      month: createTimesheetExcelDto.month
    })



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
