import { IsNotEmpty } from "class-validator";

export class CreateTimesheetDto {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    user_id: number;

    site_inspector_id: number | null;

    checker_2_id: number | null;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    period: Date;

}
