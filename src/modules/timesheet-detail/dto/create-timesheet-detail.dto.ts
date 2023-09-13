import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { Weather } from "src/enums";

export class CreateTimesheetDetailDto {

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

    @ApiProperty({
        description: 'Must be provided in order to create new Timesheet IF timesheet_id is not provided'
    })
    @IsOptional()
    site_inspector_id: number | null;

    @ApiProperty({
        description: 'Must be provided in order to create new Timesheet IF timesheet_id is not provided'
    })
    @IsOptional()
    checker_2_id: number | null;

    @ApiProperty({
        description: 'Must be provided in order to create new Timesheet IF timesheet_id is not provided'
    })
    @IsOptional()
    @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])$/, { message: "Invalid date format. Use yyyy-mm" })
    @ApiProperty({
        description: 'Period must be in year-month format (YYYY:MM)'
    })
    period: string | null;

}
