import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import R from './src/shared/common/config';

const config: MysqlConnectionOptions = {
  type: R.env.DB_CONNECTION == 'mysql' ? R.env.DB_CONNECTION : 'mysql',
  host: R.env.DB_HOST || 'localhost',
  port: Number(R.env.DB_PORT) || 3306,
  username: R.env.DB_USERNAME || 'thang1998',
  password: R.env.DB_PASSWORD || 'thang1998',
  database: R.env.DB_DATABASE || 'coin',
  entities: ['dist/**/**/**/**/*.entity{.ts,.js}'],

  // synchronize: true,
  // logging: true,
};
export default config;
