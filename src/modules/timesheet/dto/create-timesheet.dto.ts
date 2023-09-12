import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsNumber, IsString, Matches } from "class-validator";

export class CreateTimesheetDto {

    @IsOptional()
    @IsNumber()
    site_inspector_id: number | null;

    @IsOptional()
    @IsNumber()
    checker_2_id: number | null;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])$/, { message: "Invalid date format. Use yyyy-mm" })
    @ApiProperty({
        description: 'Period must be in year-month format (YYYY:MM)'
    })
    period: string;
}
