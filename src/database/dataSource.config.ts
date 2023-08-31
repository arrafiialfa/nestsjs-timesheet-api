/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '281832181',
    database: 'nestapi',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
});

dataSource.initialize();
export default dataSource;



