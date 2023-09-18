import { DataSource } from 'typeorm';
import { TimesheetDetailDocument } from '../document.entity';

export const holidayProviders = [
    {
        provide: 'TIMESHEET_DETAIL_DOCUMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TimesheetDetailDocument),
        inject: ['DATA_SOURCE'],
    },
];