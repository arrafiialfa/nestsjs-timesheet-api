import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class CreateTimesheetDto {

    @IsNotEmpty()
    @ApiProperty({
        description: 'For testing, site_inspector_id is 1'
    })
    site_inspector_id: number;

    @IsNotEmpty()
    @ApiProperty({
        description: 'For testing, checker_2_id is 2'
    })
    checker_2_id: number;

    @IsNotEmpty()
    @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])$/, { message: "Invalid date format. Use yyyy-mm" })
    @ApiProperty({
        description: 'Period must be in year-month format (YYYY:MM)'
    })
    period: string;
}
