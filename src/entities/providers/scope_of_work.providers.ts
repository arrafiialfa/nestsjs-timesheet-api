import { DataSource } from 'typeorm';
import { ScopeOfWork } from '../scope_of_work.entity';

export const userProviders = [
    {
        provide: 'SCOPE_OF_WORK_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ScopeOfWork),
        inject: ['DATA_SOURCE'],
    },
];