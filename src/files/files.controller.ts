
import { Controller, Post, HttpCode, HttpStatus, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';

@Controller('files')
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