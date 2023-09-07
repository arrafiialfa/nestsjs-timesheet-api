import { IsDate, IsNotEmpty, IsNumber, IsOptional, isDate } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    contract_number: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    value: number;

    @IsOptional()
    @IsNumber()
    unit_owner_id: number | null;

    @IsOptional()
    @IsNumber()
    upp_id: number | null;

    @IsOptional()
    @IsNumber()
    contractor_id: number | null;

    @IsNotEmpty()
    start_date: Date;

    @IsOptional()
    cut_off_date: Date | null;

    @IsOptional()
    effective_date: Date | null;

    @IsNotEmpty()
    finish_date: Date;

    @IsOptional()
    @IsNumber()
    document_id: number | null;

    @IsOptional()
    level: string | null;

    @IsOptional()
    @IsNumber()
    pic_project_id: number | null;

    @IsOptional()
    @IsNumber()
    related_role_owner_id: number | null;

    @IsOptional()
    @IsNumber()
    related_role_upp_id: number | null;

    @IsOptional()
    @IsNumber()
    consultant_id: number | null;
}
