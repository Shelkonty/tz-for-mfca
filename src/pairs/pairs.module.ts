import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoPair } from './entities/pair.entity';
import { PairsController } from './pairs.controller';
import { PairsService } from './pairs.service';
import { CoinGeckoModule } from '../services/coingecko/coingecko.module';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoPair]), CoinGeckoModule],
  controllers: [PairsController],
  providers: [PairsService],
  exports: [PairsService],
})
export class PairsModule {}
