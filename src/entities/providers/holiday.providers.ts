import { DataSource } from 'typeorm';
import { Holiday } from '../holiday.entity';

export const holidayProviders = [
    {
        provide: 'HOLIDAY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Holiday),
        inject: ['DATA_SOURCE'],
    },
];