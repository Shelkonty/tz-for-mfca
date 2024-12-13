import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CryptoRate } from './entities/rate.entity';
import { PairsService } from '../pairs/pairs.service';
import { CoinGeckoService } from '../services/coingecko/coingecko.service';
import { GetRatesDto } from './dto/get-rates.dto';

@Injectable()
export class RatesService {
  private readonly logger = new Logger(RatesService.name);

  constructor(
    @InjectRepository(CryptoRate)
    private ratesRepository: Repository<CryptoRate>,
    private pairsService: PairsService,
    private coinGeckoService: CoinGeckoService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async updateRates() {
    const pairs = await this.pairsService.findAll();
    for (const pair of pairs) {
      if (pair.isActive) {
        try {
          const rate = await this.coinGeckoService.getPrice(
            pair.baseCurrency.toLowerCase(),
            pair.quoteCurrency.toLowerCase(),
          );
          await this.saveRate(pair.id, rate);
        } catch (error) {
          this.logger.error(`Failed to update rate for pair ${pair.id}`, error);
        }
      }
    }
  }

  private async saveRate(pairId: number, rate: number): Promise<CryptoRate> {
    const cryptoRate = this.ratesRepository.create({
      pairId,
      rate,
      timestamp: new Date(),
    });
    return await this.ratesRepository.save(cryptoRate);
  }

  async getRates(getRatesDto: GetRatesDto): Promise<CryptoRate[]> {
    const query = this.ratesRepository.createQueryBuilder('rate');

    if (getRatesDto.pairId) {
      query.where('rate.pairId = :pairId', { pairId: getRatesDto.pairId });
    }

    if (getRatesDto.startDate && getRatesDto.endDate) {
      query.andWhere('rate.timestamp BETWEEN :startDate AND :endDate', {
        startDate: getRatesDto.startDate,
        endDate: getRatesDto.endDate,
      });
    }

    if (getRatesDto.sort) {
      query.orderBy('rate.timestamp', getRatesDto.sort);
    }

    if (getRatesDto.limit) {
      query.take(getRatesDto.limit);
    }

    return await query.getMany();
  }
}
