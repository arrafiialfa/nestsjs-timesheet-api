import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { Day, Month } from "src/enums"

export class CreateHolidayDto {

    @IsNotEmpty()
    date: number

    @IsNotEmpty()
    @IsEnum(Day)
    day: string

    @IsNotEmpty()
    @IsEnum(Month)
    month: string

    @IsNotEmpty()
    year: number

    @IsNotEmpty()
    holiday: string

    @IsOptional()
    datetime_ms: string

}
