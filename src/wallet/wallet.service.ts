import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WalletService {
 constructor(
  @InjectRepository(Wallet)
  private readonly walletRepository: Repository<Wallet>,
  private userService: UserService

 ){}

  async create(createWalletDto: CreateWalletDto, user_id: string) {
     try {
      // check if user exists
     const user = await this.userService.findOne(user_id)

     // check if user already has a wallet
     const checkIfUserWalletExists = await this.walletRepository.findOne({where: {user: user}})
 
     if (checkIfUserWalletExists) {throw new ConflictException("User already has a wallet")}
    
     // convert balance response to number
     const convertBalanceToNumber = parseFloat(createWalletDto.balance)
     
     const newWallet = this.walletRepository.create({...createWalletDto, balance: convertBalanceToNumber, user: user,})
     // console.log(newWallet)
     return await this.walletRepository.save(newWallet)
     } catch (error) {
      // Check if error is a unique constraint violation (PostgreSQL: code 23505)
    if (error.code === '23505') {
      throw new ConflictException('User already has a wallet');
    }
    // If any other error occurs, throw a generic internal server error
    throw new InternalServerErrorException('An unexpected error occurred');
     }

  }


  async getUserWallet(wallet_id: string, user_id: string) {
    try {
      const findUserWallet = await this.walletRepository.findOne({where :{wallet_id: wallet_id, user: {user_id: user_id}}})
    if (!findUserWallet){throw new NotFoundException("Wallet not found")}
    
    return findUserWallet
    } catch (error) {
    throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async update(wallet_id: string, updateWalletDto: UpdateWalletDto) {
    const convertBalanceToNumber = parseFloat(updateWalletDto.balance)
    const updateWallet = await this.walletRepository.preload({wallet_id: wallet_id, ...updateWalletDto, balance:convertBalanceToNumber})

    if (!updateWallet){throw new NotFoundException("Wallet not found")}
    return await this.walletRepository.save(updateWallet)
  }

}
