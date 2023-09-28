import { Module } from '@nestjs/common';
import { ScopeOfWorkService } from './scope-of-work.service';
import { DatabaseModule } from 'src/database/database.module';
import { scopeOfWorkProviders } from 'src/entities/providers/scope_of_work.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ScopeOfWorkService, ...scopeOfWorkProviders],
  exports: [ScopeOfWorkService, ...scopeOfWorkProviders]
})
export class ScopeOfWorkModule { }
