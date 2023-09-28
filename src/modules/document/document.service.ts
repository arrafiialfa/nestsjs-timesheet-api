import { Injectable, Inject } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Repository } from 'typeorm';
import { Document } from 'src/entities/document.entity';

@Injectable()
export class DocumentService {

  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private documentRepository: Repository<Document>,
  ) { }

  async create(createDocumentDto: CreateDocumentDto) {
    return this.documentRepository.create(createDocumentDto);
  }

  findAll() {
    return this.documentRepository.find();
  }

  findOne(id: number) {
    return this.documentRepository.findOneBy({ id: id });
  }

  async update(document_id: number, updateDocumentDto: UpdateDocumentDto) {
    return this.documentRepository.update(document_id, updateDocumentDto)
  }

  remove(id: number) {
    return this.documentRepository.softDelete(id)
  }
}
