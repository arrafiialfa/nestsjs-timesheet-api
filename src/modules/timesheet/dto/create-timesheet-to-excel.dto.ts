import { IsNotEmpty, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExcelDto {
    @IsNotEmpty()
    @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])$/, { message: "Invalid date format. Use yyyy-mm" })
    @ApiProperty({
        description: 'Period must be in year-month format (YYYY:MM)'
    })
    period: string;
}
