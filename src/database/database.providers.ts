/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';


export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
