import { IsArray, IsNotEmpty } from "class-validator";


class RowDto {
    @IsNotEmpty()
    project_name: string;

    @IsNotEmpty()
    location_code: string;

    @IsNotEmpty()
    @IsArray()
    values: [{ date: string, value: number }]
}

export class CreateTimesheetExcelDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    nip: string

    @IsNotEmpty()
    job_title: string

    @IsNotEmpty()
    unit: string

    @IsNotEmpty()
    @IsArray()
    rows: [RowDto]

}
