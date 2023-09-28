import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { projectProviders } from 'src/entities/providers/project.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProjectService, ...projectProviders],
  exports: [ProjectService, ...projectProviders]
})
export class ProjectModule { }
