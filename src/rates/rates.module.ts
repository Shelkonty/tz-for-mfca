import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoRate } from './entities/rate.entity';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { PairsModule } from '../pairs/pairs.module';
import { CoinGeckoModule } from '../services/coingecko/coingecko.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptoRate]),
    PairsModule,
    CoinGeckoModule,
  ],
  controllers: [RatesController],
  providers: [RatesService],
})
export class RatesModule {}