"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USERNAMEDB,
    password: process.env.PASSWORDDB,
    database: process.env.DBNAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map