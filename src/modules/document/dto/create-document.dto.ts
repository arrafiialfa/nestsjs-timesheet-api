import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDocumentDto {
    @IsNotEmpty()
    timesheet_detail_id: number

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
}
