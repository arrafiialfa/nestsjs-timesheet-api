import { Injectable } from '@nestjs/common';
import { Timesheet } from 'src/entities/timesheet.entity';
import * as ExcelJS from 'exceljs'
import { CreateTimesheetExcelDto } from './dto/create-timesheet-excel.dto';
import { createTimesheetData, createTimesheetFooter, createTimesheetHeader, header } from './excel/timesheet-excel-layout';
import { HolidayService } from '../holiday/holiday.service';
import { Project } from 'src/entities/project.entity';
import { Style } from 'exceljs';

interface Layout {
  origin: string,
  style: Partial<Style>,
  value?: any,
  mergeCells?: any
  row?: {
    key: number,
    height: number
  },
  column?: {
    key: string,
    width: number
  }
}

interface ValuesPerDates {
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

  private transformCellFromLayout(layout: Layout, sheet: ExcelJS.Worksheet) {
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
  }

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
    const values_per_dates = new Map<string, ValuesPerDates>()


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

    const holidays = await this.holidayService.find({
      year: parseInt(timesheet.period.split("-")[0]),
      month: timesheet.period.split("-")[1]
    })

    holidays.forEach((holiday) => {
      const date = holiday.date;
      const date_values = values_per_dates.get(`${date}`);
      if (date_values) {
        date_values.isHoliday = {
          name: holiday.holiday
        }
      }
    })


    return { timesheetPerProject, values_per_dates }
  }

  async create(createTimesheetExcelDto: CreateTimesheetExcelDto) {

    const { timesheetPerProject, values_per_dates } = await this.prepareTimesheetData(createTimesheetExcelDto.timesheet);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('timesheet', { pageSetup: { paperSize: 9, orientation: 'landscape' } })

    //create fixed layout
    header.forEach((layout) => {
      this.transformCellFromLayout(layout, sheet);
    })

    //create header
    const layouts = createTimesheetHeader(createTimesheetExcelDto.timesheet);
    layouts.forEach((layout) => {
      this.transformCellFromLayout(layout, sheet);
    })

    //CREATE DATA
    const datas = createTimesheetData(timesheetPerProject, values_per_dates);
    datas.forEach((data) => {
      this.transformCellFromLayout(data, sheet)
    })

    //CREATE FOOTER
    const footer = createTimesheetFooter(timesheetPerProject.keys.length)
    footer.forEach((layout) => {
      this.transformCellFromLayout(layout, sheet)
    })

    //CREATE BUFFER
    const excelBuffer = await workbook.xlsx.writeBuffer();

    return excelBuffer;
  }

}
