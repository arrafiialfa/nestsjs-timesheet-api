import { DataSource } from 'typeorm';
import { TimesheetDetail } from '../timesheet_detail.entity';

export const userProviders = [
    {
        provide: 'TIMESHEET_DETAIL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TimesheetDetail),
        inject: ['DATA_SOURCE'],
    },
];