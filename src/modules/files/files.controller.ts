
import { Controller, Post, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger/dist/decorators';
import { FilesUploadDto } from './dto/files-upload.dto';

@Controller('files')
@ApiTags('File Upload')
export class FilesController {
    constructor(private readonly fileService: FilesService) { }

    @Public()
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'file upload',
        type: FilesUploadDto,
    })
    async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {

        if (files.length > 0) {
            const savedFilePath = await this.fileService.saveFiles(files);

            return { message: 'Files uploaded successfully', savedFilePath }
        }

        throw new Error('A File(s) must be uploaded')
    }


}