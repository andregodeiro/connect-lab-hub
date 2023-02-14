import { Device } from 'src/entities/device.entity';
import { Address } from 'src/entities/user-address.entity';
import { User } from 'src/entities/user.entity';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Address, Device],
  migrations: ['src/migrations/**/*.ts'],
  migrationsTableName: 'migrations_history',
  migrationsRun: false,
  ssl: true,
};

export = config;
