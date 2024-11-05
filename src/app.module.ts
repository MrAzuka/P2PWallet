import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, CommonModule, UserModule, ConfigModule.forRoot({ isGlobal: true })]
})
export class AppModule { }
