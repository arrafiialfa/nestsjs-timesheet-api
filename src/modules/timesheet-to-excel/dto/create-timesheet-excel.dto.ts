import { IsArray, IsNotEmpty } from "class-validator";

export class CreateTimesheetExcelDto {
    @IsNotEmpty()
    project_name: string;

    @IsNotEmpty()
    location_code: string;

    @IsNotEmpty()
    @IsArray()
    values: [{ date: string, value: number }]
}
