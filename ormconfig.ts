import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'thang1998',
  password: 'thang1998',
  database: 'coin',
  entities: ['dist/**/**/**/**/*.entity{.ts,.js}'],
  // làm mới db
  synchronize: true,
  logging: 'all',
};
export default config;
