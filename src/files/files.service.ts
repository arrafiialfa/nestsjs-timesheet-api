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

}
