import { EXCEL_COLUMNS } from "src/constants"
import { Style } from "exceljs"

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
    alignment: { horizontal: 'left' }
}

const table_header_style: Partial<Style> = {
    font: { name: 'Arial Unicode MS', size: 10, bold: true },
    alignment: { horizontal: 'center', wrapText: true }
}

const th_dates_2 = [...new Array(31)].map((date, i) => {
    return {
        origin: `${EXCEL_COLUMNS[4 + i]}11`,
        style: table_header_style,
        value: i + 1
    }
})

const holiday_column_row_height = 75.5;
const holiday_column_column_width = 8;




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
        value: 'NO'
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



export const project_layout = {
    project_number_column: 'B',
    project_name_column: 'C',
    project_code_column: 'D',
    project_values_range: { from: 'E', to: 'AI' },
    project_total_days_column: 'AJ',
    mm_proportion_column: 'AK',
    superior_signature_column: 'AL'
}






