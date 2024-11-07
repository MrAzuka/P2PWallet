import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Hash } from 'src/common/util/hash';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
      ){}
    async register(createUserDto: CreateUserDto) {
        createUserDto.password = await Hash.make(createUserDto.password);
  
  const user = this.userRepository.create(createUserDto);
  
  const savedUser = await this.userRepository.save(user);
  
  return plainToClass(User,savedUser);
    }
}
