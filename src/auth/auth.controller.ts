import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';;
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('register')
    register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto)
    }


    @Post('login')
    login(@Body() authPayloadDto: AuthPayloadDto){
        return this.authService.validateUser(authPayloadDto)
    }
}
