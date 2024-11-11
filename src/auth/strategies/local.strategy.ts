import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth-payload.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // The passport-local strategy by default expects username and password fields, 
    // while you are using email in your AuthPayloadDto. 
    // To resolve this, you can pass an options object to the super() call in the LocalStrategy to customize the field names.
    super({ usernameField: 'email' });
  }
  

  validate(email: string, password: string) {
    const user = this.authService.validateUser({email, password});
    if (!user) throw new UnauthorizedException();
    return user;
  }
}