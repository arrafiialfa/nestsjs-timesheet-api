import { DataSource } from 'typeorm';
import { Timesheet } from '../timesheet.entity';

export const timesheetProviders = [
    {
        provide: 'TIMESHEET_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Timesheet),
        inject: ['DATA_SOURCE'],
    },
];