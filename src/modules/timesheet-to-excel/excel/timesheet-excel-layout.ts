import { EXCEL_COLUMNS } from "src/constants"

const default_style = {
    font: { name: 'Arial Unicode MS', sz: 11 },
    alignment: { horizontal: 'left' }
}

const table_header_style = {
    font: { name: 'Arial Unicode MS', sz: 10, bold: true },
    alignment: { horizontal: 'center' }
}

export const columns = {
    th_dates_2: [...new Array(31)].map((date, i) => {
        return {
            origin: `${EXCEL_COLUMNS[4 + i]}11`,
            style: table_header_style,
            value: i + 1
        }
    }),

}

//this is the fixed header for the timesheet excel
export const fixed_layout = [
    {
        origin: 'B2',
        style: {
            font: {
                name: "Arial Unicode MS",
                sz: 16,
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
        value: 'NAMA & LOKASI PROYEK'
    },

    {
        origin: 'D10',
        style: table_header_style,
        mergeCells: 'D10:D11',
        value: 'Kode Lokasi'
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
        value: 'Total Hari'
    },

    {
        origin: 'AK10',
        style: table_header_style,
        mergeCells: 'AK10:AK11',
        value: 'Proporsional MM'
    },

    {
        origin: 'AL10',
        style: table_header_style,
        mergeCells: 'AL10:AL11',
        value: 'Paraf Atasan Langsung'
    },


    ...columns.th_dates_2



]







