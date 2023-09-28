import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetDocumentDto } from './create-timesheet-document.dto';

export class UpdateTimesheetDocumentDto extends PartialType(CreateTimesheetDocumentDto) {}
