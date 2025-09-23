import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'nest_todo',
  synchronize: false,
  migrations: ['src/db/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
});

export default AppDataSource;
