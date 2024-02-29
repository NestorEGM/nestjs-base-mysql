import { Module } from '@nestjs/common';
import { dbConstants } from './constants/db.constants';
import { createPool } from 'mysql2/promise';
import { ConfigModule, ConfigService } from '@nestjs/config';

const dbProvider = {
    provide: dbConstants.mysqlConnection,
    useFactory: async (configService: ConfigService) => {
        const pool = createPool({
            host: configService.get<string>('DB_HOST'),
            user: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_SCHEMA'),
            port: configService.get<number>('DB_PORT'),
        });
        return await pool.getConnection();
    },
    inject: [ConfigService],
};

@Module({
    imports: [ConfigModule],
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DbModule { }
