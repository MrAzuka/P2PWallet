import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';;
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('register')
    register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto)
    }


    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request){
        return req.user;
    }

    @Get('check')
    @UseGuards(JwtAuthGuard)
    check(@Req() req: Request){
        return req.user
    }
}
