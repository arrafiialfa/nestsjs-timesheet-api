import { IsEnum, IsNotEmpty } from "class-validator";
import { Weather } from "src/enums";

export class CreateTimesheetDetailDto {

    @IsNotEmpty()
    timesheet_id: number;

    @IsNotEmpty()
    scope_of_work_id: number;

    @IsNotEmpty()
    project_id: number;

    @IsEnum(Weather)
    weather: string;

    @IsNotEmpty()
    menpower_qty: number;

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    date: string;

    description: string | null;
    file_path: string | null;

}
