import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDate } from "class-validator";

export class CreateTimesheetDto {

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

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
    @IsDate()
    period: Date;
}
