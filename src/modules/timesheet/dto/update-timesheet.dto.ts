import { PartialType } from '@nestjs/swagger';
import { CreateTimesheetDto } from './create-timesheet.dto';
import { IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TimesheetStatus } from 'src/enums';
export class UpdateTimesheetDto extends PartialType(CreateTimesheetDto) {

    site_inspector_id: number | null;

    checker_2_id: number | null;

    @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])$/, { message: "Invalid date format. Use yyyy-mm" })
    @ApiProperty({
        description: 'Period must be in year-month format (YYYY:MM)'
    })
    period: string;

    @IsEnum(TimesheetStatus)
    status: string
}
