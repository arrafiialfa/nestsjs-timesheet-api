import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class FilesService {

    async saveFile(file: Express.Multer.File): Promise<string> {
        const folderPath = path.join(__dirname, '..', 'upload');
        const filePath = path.join(folderPath, file.originalname);

        fs.writeFileSync(filePath, file.buffer);

        return filePath;

    }

    async saveFiles(files: Express.Multer.File[]): Promise<Array<string>> {
        const saved_files_path = []
        for (const file of files) {
            const folderPath = path.join(__dirname, '../../..', 'uploads');
            const filePath = path.join(folderPath, file.originalname);

            fs.writeFileSync(filePath, file.buffer);
            saved_files_path.push(filePath);
        }
        return saved_files_path;
    }

}
