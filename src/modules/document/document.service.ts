import { Injectable, Inject } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Repository } from 'typeorm';
import { TimesheetDetailDocument } from 'src/entities/document.entity';
import { FilesService } from '../files/files.service';
import { TimesheetDetail } from 'src/entities/timesheet_detail.entity';

@Injectable()
export class DocumentService {

  constructor(
    @Inject('TIMESHEET_DETAIL_DOCUMENT')
    private documentRepository: Repository<TimesheetDetailDocument>,
    private filesService: FilesService
  ) { }

  private async handleFileUpload(files: Express.Multer.File[]): Promise<Array<any>> {
    if (files.length > 0) {
      const paths = await this.filesService.saveFiles(files)
      return paths;
    }
    return null;
  }


  async create(createDocumentDto: CreateDocumentDto, timesheetDetail: TimesheetDetail) {

    const { files } = createDocumentDto

    const uploadedFiles = await this.handleFileUpload(files)
    const savedDocuments = []
    if (uploadedFiles) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const newDocument = this.documentRepository.create({
          timesheet_detail: timesheetDetail,
          name: file.name,
          path: file.path
        })
        const saved = await this.documentRepository.save(newDocument)
        savedDocuments.push(saved)
      }
    }
    return savedDocuments
  }

  findAll() {
    return this.documentRepository.find();
  }

  findOne(id: number) {
    return this.documentRepository.findOneBy({ id: id });
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {

    const { path, files } = updateDocumentDto
    const updated_path = await this.filesService.updateFile(path, files[0])

    return this.documentRepository.update(id, { path: updated_path.path })
  }

  remove(id: number) {
    return this.documentRepository.softDelete(id)
  }
}
