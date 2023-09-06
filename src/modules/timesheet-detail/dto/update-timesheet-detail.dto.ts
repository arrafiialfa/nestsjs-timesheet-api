import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetDetailDto } from './create-timesheet-detail.dto';

export class UpdateTimesheetDetailDto extends PartialType(CreateTimesheetDetailDto) {

}
