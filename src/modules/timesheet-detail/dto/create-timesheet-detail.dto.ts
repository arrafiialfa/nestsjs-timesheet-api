import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { TimesheetLeaves, Weather } from "src/enums";
import { CreateTimesheetDto } from "src/modules/timesheet/dto/create-timesheet.dto";

export class CreateTimesheetDetailDto extends PartialType(CreateTimesheetDto) {
    @IsNotEmpty()
    scope_of_work_id: number;

    @IsNotEmpty()
    project_id: number;

    @IsNotEmpty()
    @IsEnum(Weather)
    weather: Weather;

    @IsNotEmpty()
    manpower_qty: number;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'Invalid time format. Use HH:mm:ss in 24-hour format.' })
    clock_in: string;

    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, { message: 'Invalid time format. Use HH:mm:ss in 24-hour format.' })
    clock_out: string;

    @IsOptional()
    @IsEnum(TimesheetLeaves)
    leave_type: TimesheetLeaves | null

    @IsOptional()
    description: string | null;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
}
