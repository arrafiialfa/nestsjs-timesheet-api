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
            saved_files_path.push({ name: file.originalname, path: filePath });
        }
        return saved_files_path;
    }

    async updateFile(path_to_update, file: Express.Multer.File): Promise<any> {
        const folderPath = path_to_update;
        fs.writeFileSync(folderPath, file.buffer);
        return { name: file.originalname, path: folderPath }
    }

}
