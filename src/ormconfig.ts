import { DataSourceOptions } from 'typeorm';
const configTypeOrm: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: +process.env.POSTGRESQL_PORT,
  username: process.env.POSTGRESQL_USERNAME,
  password: '17071707',
  database: 'common_trips',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default configTypeOrm;
