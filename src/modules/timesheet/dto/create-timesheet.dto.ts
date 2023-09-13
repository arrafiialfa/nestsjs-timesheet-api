import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class CreateTimesheetDto {

    @IsNotEmpty()
    site_inspector_id: number | null;

    @IsNotEmpty()
    checker_2_id: number | null;

    @IsNotEmpty()
    @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])$/, { message: "Invalid date format. Use yyyy-mm" })
    @ApiProperty({
        description: 'Period must be in year-month format (YYYY:MM)'
    })
    period: string;
}
