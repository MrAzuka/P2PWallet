import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createWalletDto: CreateWalletDto) {
    // check if user exists
    await this.userService.findOne(createWalletDto.user_id)
    // convert balance response to number
    const convertBalanceToNumber = parseFloat(createWalletDto.balance)
    const newWallet = this.walletRepository.create({...createWalletDto, balance: convertBalanceToNumber})

    return await this.walletRepository.save(newWallet)
  }


  async getUserWallet(wallet_id: string, user_id: string) {
    const user = await this.userService.findOne(user_id)
    const findUserWallet = await this.walletRepository.findBy({wallet_id: wallet_id, user: user})

    if (!findUserWallet){throw new NotFoundException("Wallet not found")}
    return findUserWallet
  }

  async update(wallet_id: string, updateWalletDto: UpdateWalletDto) {
    const convertBalanceToNumber = parseFloat(updateWalletDto.balance)
    const updateWallet = await this.walletRepository.preload({wallet_id: wallet_id, ...updateWalletDto, balance:convertBalanceToNumber})

    if (!updateWallet){throw new NotFoundException("Wallet not found")}
    return await this.walletRepository.save(updateWallet)
  }

}
