import { Controller, Get, Post, Body, Patch, Param, Req, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Request() req: {user: JwtPayload} , @Body() createWalletDto: CreateWalletDto) {
    
    return this.walletService.create({user_id: req.user.user_id, ...createWalletDto});
  }

  

  @Get(':id')
  findOne(@Request() req: {user: JwtPayload} ,@Param('id') id: string) {
    return this.walletService.getUserWallet( id, req.user.user_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto);
  }

}
