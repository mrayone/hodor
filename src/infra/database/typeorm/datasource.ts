import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) | 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/infra/database/typeorm/entities/*.ts'],
  migrations: ['src/infra/database/typeorm/migrations/*{.ts, .js}'],
};

const datasource = new DataSource(options);

export default datasource;
