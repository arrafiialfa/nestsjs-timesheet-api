import { IsArray, IsNotEmpty } from "class-validator";
import { Timesheet } from "src/entities/timesheet.entity";

export class CreateTimesheetExcelDto {

    @IsNotEmpty()
    year: number;

    @IsNotEmpty()
    month: string;

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    nip: string

    @IsNotEmpty()
    job_title: string

    @IsNotEmpty()
    @IsArray()
    timesheet: Timesheet;

}
