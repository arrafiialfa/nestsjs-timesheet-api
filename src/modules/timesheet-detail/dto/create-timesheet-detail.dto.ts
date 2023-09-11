import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Weather } from "src/enums";

export class CreateTimesheetDetailDto {

    @IsNotEmpty()
    timesheet_id: number;

    @IsNumber()
    scope_of_work_id: number;

    @IsNotEmpty()
    project_id: number;

    @IsEnum(Weather)
    weather: string;

    @IsNotEmpty()
    manpower_qty: number;

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    date: Date;

    @IsOptional()
    description: string | null;

    @IsOptional()
    file_path: string | null;

}
