import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create-document.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
    @IsNotEmpty()
    path: string
}
