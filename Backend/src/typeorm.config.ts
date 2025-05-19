import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORDDB,
  database: process.env.DBNAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
