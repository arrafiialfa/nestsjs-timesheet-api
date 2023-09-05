import { PartialType } from '@nestjs/swagger';
import { CreateTimesheetDto } from './create-timesheet.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTimesheetDto extends PartialType(CreateTimesheetDto) {
    @IsNotEmpty()
    id: number
}
