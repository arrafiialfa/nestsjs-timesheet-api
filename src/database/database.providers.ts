/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';


const configService = new ConfigService()

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: configService.get<string>('DB_HOSTNAME'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
