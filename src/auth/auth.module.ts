import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtSecretKey } from 'src/common/util/envconfig';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({imports:[
    UserModule,
    JwtModule.register({
        global:true,
        secret: jwtSecretKey,
        signOptions: {expiresIn: "1h"}
    }),
    TypeOrmModule.forFeature([User])
], controllers: [AuthController], providers: [AuthService, LocalStrategy, JwtStrategy]})
export class AuthModule {}
