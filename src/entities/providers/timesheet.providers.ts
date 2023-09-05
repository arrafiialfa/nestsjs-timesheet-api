import { DataSource } from 'typeorm';
import { Timesheet } from '../timesheet.entity';

export const userProviders = [
    {
        provide: 'TIMESHEET_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Timesheet),
        inject: ['DATA_SOURCE'],
    },
];