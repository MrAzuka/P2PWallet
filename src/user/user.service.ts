import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findBy({user_id: id})

    if (!user) {throw new NotFoundException("User not Found")}
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ user_id:id, ...updateUserDto })

    if (!user) {throw new NotFoundException("User not found")}

    return this.userRepository.save(user)
  }

  // If the user wants to deactivate their account
  async remove(id: string) {
    const user = await this.findOne(id)
    
    if (!user) {throw new NotFoundException("User not found")}

    return await this.userRepository.softDelete({user_id:id})
  }
}
