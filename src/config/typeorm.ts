import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
dotenvConfig({ path: '.env' });

console.log('Database Username: ', process.env.DB_USERNAME);
console.log('Database Password:', process.env.DB_PASSWORD);
const config = {
  type: 'postgres',
  database: process.env.DB_NAME || "proyectochecasa",
  host: process.env.DB_HOST || "/cloudsql/proyectochecasa:southamerica-west1:proyectochecasa",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || "postgres", 
  password: process.env.DB_PASSWORD || "checasa2024", 
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  extra: {
    connectionTimeoutMillis: 45000,
  },
    ssl: {
      rejectUnauthorized: false 
    }
};

console.log(process.env.DB_PASSWORD);

export default registerAs('typeorm', () => config);
export const connetionSource = new DataSource(config as DataSourceOptions);
