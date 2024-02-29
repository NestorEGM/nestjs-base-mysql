import { Module } from '@nestjs/common';
import { dbConstants } from './constants/db.constants';
import { createPool } from 'mysql2/promise';

const dbProvider = {
    provide: dbConstants.mysqlConnection,
    useValue: createPool({
        host: dbConstants.host,
        user: dbConstants.user,
        password: dbConstants.password,
        database: dbConstants.database,
        port: dbConstants.port,
    }),
};

@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DbModule { }
