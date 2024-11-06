import { dbHost, dbName, dbPassword, dbPort, dbUsername } from 'src/common/util/envconfig';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: "postgres",
    username: dbUsername,
    password: dbPassword,
    port: dbPort,
    host: dbHost,
    database: dbName,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
  });