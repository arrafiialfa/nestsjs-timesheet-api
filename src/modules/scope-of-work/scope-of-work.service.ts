import { Injectable, Inject } from '@nestjs/common';
import { CreateScopeOfWorkDto } from './dto/create-scope-of-work.dto';
import { UpdateScopeOfWorkDto } from './dto/update-scope-of-work.dto';
import { Repository } from 'typeorm';
import { ScopeOfWork } from 'src/entities/scope_of_work.entity';

@Injectable()
export class ScopeOfWorkService {

  constructor(
    @Inject('SCOPE_OF_WORK_REPOSITORY')
    private scopeOfWorkRepository: Repository<ScopeOfWork>
  ) { }

  create(createScopeOfWorkDto: CreateScopeOfWorkDto) {
    return this.scopeOfWorkRepository.create(createScopeOfWorkDto);
  }

  findAll() {
    return this.scopeOfWorkRepository.find();
  }

  findOne(id: number) {
    return this.scopeOfWorkRepository.findBy({ id: id });
  }

  update(id: number, updateScopeOfWorkDto: UpdateScopeOfWorkDto) {
    return this.scopeOfWorkRepository.update(id, updateScopeOfWorkDto);
  }

  remove(id: number) {
    return this.scopeOfWorkRepository.softDelete(id);
  }
}
