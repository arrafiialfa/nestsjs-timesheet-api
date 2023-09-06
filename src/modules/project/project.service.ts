import { Injectable, Inject } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>
  ) { }

  create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(newProject);
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.projectRepository.findOneBy({ id: id });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.softDelete(id);
  }
}
