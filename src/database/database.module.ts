import { Module } from '@nestjs/common';
import { dbHost, dbName, dbPassword, dbPort, dbUsername } from 'src/common/util/envconfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    username: dbUsername,
    password: dbPassword,
    port: dbPort,
    host: dbHost,
    database: dbName,
    autoLoadEntities: true
  })]
})
export class DatabaseModule { }
