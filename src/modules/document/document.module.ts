import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [],
  providers: [DocumentService]
})
export class DocumentModule { }
