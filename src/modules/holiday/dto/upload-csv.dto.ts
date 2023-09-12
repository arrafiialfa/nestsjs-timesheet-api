import { ApiProperty } from "@nestjs/swagger";

export class CsvUploadDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
}
