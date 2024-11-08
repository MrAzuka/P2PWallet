import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Hash } from 'src/common/util/hash';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await Hash.make(createUserDto.password);

    const user = this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(user);

    return plainToClass(User, savedUser);
  }

  async validateUser(authPayloadDto:AuthPayloadDto){
    const findUser = await this.userRepository.findOne({where:{email: authPayloadDto.email}, select:['user_id', 'password']})
    const comparePassword = await Hash.compare(authPayloadDto.password, findUser.password)

    if (!findUser || !comparePassword ){ throw new UnauthorizedException("Incorrect username or password")}

    let jwtSignInData = {user_id : findUser.user_id, email: authPayloadDto.email}
    return this.jwtService.sign(jwtSignInData)
  }
    
}
