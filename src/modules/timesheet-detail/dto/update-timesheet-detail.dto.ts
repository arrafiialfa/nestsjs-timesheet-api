import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetDetailDto } from './create-timesheet-detail.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTimesheetDetailDto extends PartialType(CreateTimesheetDetailDto) {
    @IsNotEmpty()
    id: number;
}
