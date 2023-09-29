import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetToExcelDto } from './create-timesheet-to-excel.dto';

export class UpdateTimesheetToExcelDto extends PartialType(CreateTimesheetToExcelDto) {}
