/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config();

const datasource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOSTNAME,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
});

datasource.initialize();

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = datasource;

            await dataSource.initialize();
            return dataSource;
        },
    },
];

export default datasource
