import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Weather } from "src/enums";

export class CreateTimesheetDetailDto {

    @IsNotEmpty()
    @IsNumber()
    timesheet_id: number;

    @IsNumber()
    @IsNotEmpty()
    scope_of_work_id: number;

    @IsNotEmpty()
    @IsNumber()
    project_id: number;

    @IsEnum(Weather)
    weather: string;

    @IsNotEmpty()
    menpower_qty: number;

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsOptional()
    description: string | null;

    @IsOptional()
    file_path: string | null;

}
