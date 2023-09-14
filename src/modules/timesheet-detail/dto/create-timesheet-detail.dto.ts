import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Weather } from "src/enums";
import { CreateTimesheetDto } from "src/modules/timesheet/dto/create-timesheet.dto";

export class CreateTimesheetDetailDto extends PartialType(CreateTimesheetDto) {

    @IsOptional()
    timesheet_id: number;

    @IsNotEmpty()
    scope_of_work_id: number;

    @IsNotEmpty()
    project_id: number;

    @IsNotEmpty()
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
