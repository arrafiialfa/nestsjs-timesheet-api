import { EXCEL_COLUMNS, MONTHS } from "src/constants"
import { Style } from "exceljs"
import { Project } from "src/entities/project.entity"
import { Timesheet } from "src/entities/timesheet.entity"

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

const default_style: Partial<Style> = {
    font: { name: 'Arial Unicode MS', size: 11 },
    alignment: { horizontal: 'left', vertical: 'middle' }
}

const date_value_style: Partial<Style> = {
    font: { name: 'Arial Unicode MS', size: 11, },
    alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },

}

const table_header_style: Partial<Style> = {
    font: { name: 'Arial Unicode MS', size: 10, bold: true },
    alignment: { horizontal: 'center', vertical: 'middle', wrapText: true }
}

const th_dates_2 = [...new Array(31)].map((date, i) => {
    const layout: Layout = {
        origin: `${EXCEL_COLUMNS[4 + i]}11`,
        style: table_header_style,
        value: i + 1,
        column: {
            key: `${EXCEL_COLUMNS[4 + i]}`,
            width: 3.64
        }
    }
    return layout;
})

export const holiday_column_row_height = 75.5;
export const holiday_column_column_width = 8;
export const STARTING_ROW = 12;
export const NO_COLUMN = "B";
export const NAMA_LOKASIPROYEK_COLUMN = "C";
export const KODE_LOKASI_COLUMN = "D";
export const STARTING_DATES_COLUMN = 4;
export const TOTAL_HARI_COLUMN = "AJ";


//this is the fixed layouts for the timesheet excel
export const header: Layout[] = [
    {
        origin: 'B2',
        style: {
            font: {
                name: "Arial Unicode MS",
                size: 16,
                bold: true,
            },
            alignment: { horizontal: "center" },
        }
    },

    {
        origin: 'B5',
        style: default_style,
        value: 'NAMA'
    },

    {
        origin: 'B6',
        style: default_style,
        value: 'NOMOR INDUK PEGAWAI'
    },

    {
        origin: 'B7',
        style: default_style,
        value: 'JABATAN'
    },

    {
        origin: 'B8',
        style: default_style,
        value: 'UNIT'
    },

    {
        origin: 'B10',
        style: table_header_style,
        mergeCells: 'B10:B11',
        value: 'NO',
        column: {
            key: 'B',
            width: 4.55
        }
    },

    {
        origin: 'C10',
        style: table_header_style,
        mergeCells: 'C10:C11',
        value: 'NAMA & LOKASI PROYEK',
        column: {
            key: 'C',
            width: 30
        }
    },

    {
        origin: 'D10',
        style: table_header_style,
        mergeCells: 'D10:D11',
        value: 'Kode Lokasi',
        column: {
            key: 'D',
            width: 14,
        }
    },

    {
        origin: 'E10',
        style: table_header_style,
        mergeCells: 'E10:AI10',
        value: 'TANGGAL'
    },

    {
        origin: 'AJ10',
        style: table_header_style,
        mergeCells: 'AJ10:AJ11',
        value: 'Total Hari',
        column: {
            key: 'AJ',
            width: 14,
        }
    },

    {
        origin: 'AK10',
        style: table_header_style,
        mergeCells: 'AK10:AK11',
        value: 'Proporsional MM',
        column: {
            key: 'AK',
            width: 14,
        }
    },

    {
        origin: 'AL10',
        style: table_header_style,
        mergeCells: 'AL10:AL11',
        value: 'Paraf Atasan Langsung',
        column: {
            key: 'AL',
            width: 14
        }
    },


    ...th_dates_2



]

export function createTimesheetHeader(timesheet: Timesheet) {
    const layout: Layout[] = []
    const nama: Layout = {
        origin: `D5`,
        style: default_style,
        value: ": " + timesheet.user.name.toUpperCase(),
    }
    const nip: Layout = {
        origin: "D6",
        style: default_style,
        value: ": " + timesheet.user.nip || ""
    }

    const jabatan: Layout = {
        origin: "D7",
        style: default_style,
        value: ": " + timesheet.user.role?.name || ""
    }

    const unit: Layout = {
        origin: "D8",
        style: default_style,
        value: ": "
    }

    const bulan: Layout = {
        origin: "AJ5",
        style: default_style,
        value: ": " + MONTHS[parseInt(timesheet.period.split("-")[1]) - 1]
    }

    const tahun: Layout = {
        origin: "AJ6",
        style: default_style,
        value: ": " + timesheet.period.split("-")[0]
    }

    layout.push(nama, nip, jabatan, unit, bulan, tahun);

    return layout;
}

export function createTimesheetData(timesheetPerProject: Map<string, TimesheetPerProject>, valuesPerDates: Map<string, ValuesPerDates>) {

    const data_layout: Layout[] = [];

    let i = -1;
    timesheetPerProject.forEach((project) => {
        i++;
        const current_row = STARTING_ROW + i;
        const no: Layout = {
            origin: `${NO_COLUMN}${current_row}`,
            style: date_value_style,
            value: i + 1
        }

        const nama_lokasiproyek: Layout = {
            origin: `${NAMA_LOKASIPROYEK_COLUMN}${current_row}`,
            style: default_style,
            value: project.project.name,
            row: {
                key: current_row,
                height: 45
            }
        }

        const kode_lokasi: Layout = {
            origin: `${KODE_LOKASI_COLUMN}${current_row}`,
            style: date_value_style,
            value: project.project.contract_number
        }

        const datesValues = [...new Array(31)].map((date, i) => {
            const current_date = i + 1;
            const current_project = project.values.find(value => parseInt(`${value.date}`.split("-")[2]) == current_date);
            const current_column = EXCEL_COLUMNS[STARTING_DATES_COLUMN + i];

            const data: Layout = {
                origin: `${current_column}${current_row}`,
                style: date_value_style,
                value: current_project?.value ?? ""
            }

            const currentDateIsHoliday = valuesPerDates.get(`${current_date}`)?.isHoliday;
            if (currentDateIsHoliday) {
                data.value = currentDateIsHoliday.name;
                data.column = {
                    key: `${current_column}`,
                    width: holiday_column_column_width
                }
                data.row = {
                    key: current_row,
                    height: holiday_column_row_height
                }
            }

            return data;
        })


        const STARTING_DATES_KEY = `${EXCEL_COLUMNS[STARTING_DATES_COLUMN]}${current_row}`
        const END_DATES_KEY = `${EXCEL_COLUMNS[STARTING_DATES_COLUMN + 31 - 1]}${current_row}`
        const total_hari: Layout = {
            origin: `${TOTAL_HARI_COLUMN}${current_row}`,
            style: date_value_style,
            value: { formula: `SUM(${STARTING_DATES_KEY}:${END_DATES_KEY})` }
        }

        data_layout.push(no)
        data_layout.push(nama_lokasiproyek)
        data_layout.push(kode_lokasi)
        data_layout.push(...datesValues)
        data_layout.push(total_hari)

    })

    return data_layout

}


export function createTimesheetFooter(project_length: number) {
    const END_ROW = STARTING_ROW + project_length;
    const SUMMARY_ROW = END_ROW + 1;

    const layout: Layout[] = []

    /**
    * add footer
    */
    const footer: Layout = {
        origin: `${NO_COLUMN}${SUMMARY_ROW}`,
        style: table_header_style,
        mergeCells: `${NO_COLUMN}${SUMMARY_ROW}:${NAMA_LOKASIPROYEK_COLUMN}${SUMMARY_ROW}`,
        value: "Total"
    }

    layout.push(footer)


    /**
        *  Calculate values summary of each days 
        */

    const datesValuesSummary: Layout[] = [...new Array(31)].map((date, i) => {
        const current_column = EXCEL_COLUMNS[STARTING_DATES_COLUMN + i];
        const current_key = `${current_column}${SUMMARY_ROW} `;

        const STARTING_SUMMARY_KEY = `${current_column}${STARTING_ROW}`
        const END_SUMMARY_KEY = `${current_column}${END_ROW}`;

        const data: Layout = {
            origin: current_key,
            style: table_header_style,
            value: { formula: `SUM(${STARTING_SUMMARY_KEY}:${END_SUMMARY_KEY})` }
        }

        return data;

    })

    layout.push(...datesValuesSummary)

    return layout
}




