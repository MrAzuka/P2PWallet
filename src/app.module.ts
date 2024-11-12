import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/util/environment.validation';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [DatabaseModule, CommonModule, UserModule, ConfigModule.forRoot({ isGlobal: true, validate }), AuthModule, WalletModule]
})
export class AppModule { }
