
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoinController } from './controller/coin.controller';
import { CoinService } from './service/coin.service';
import { Coin } from './entities/coin.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Coin]), ConfigModule],
    providers: [CoinService],
    controllers: [CoinController],
})
export class CoinModule {}
    
    