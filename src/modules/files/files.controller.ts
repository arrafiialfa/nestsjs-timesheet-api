
import { Controller, Post, HttpCode, HttpStatus, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@Controller('files')
@ApiTags('File Upload')
export class FilesController {
    constructor(private readonly fileService: FilesService) { }

    @Public()
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {

        const savedFilePath = this.fileService.saveFile(file);

        return { message: 'Files uploaded successfully', savedFilePath }
    }


}