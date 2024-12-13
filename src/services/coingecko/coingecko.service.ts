import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class CoinGeckoService {
  private readonly logger = new Logger(CoinGeckoService.name);
  private readonly axiosInstance: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: this.configService.get<string>('coingecko.baseUrl'),
      headers: {
        'x-cg-pro-api-key': this.configService.get<string>('coingecko.apiKey'),
        accept: 'application/json',
      },
    });
  }

  async getPrice(coinId: string, vsCurrency: string): Promise<number> {
    try {
      const response = await this.axiosInstance.get('/simple/price', {
        params: {
          ids: coinId,
          vs_currencies: vsCurrency,
          include_last_updated_at: true,
        },
      });
      return response.data[coinId][vsCurrency];
    } catch (error) {
      this.logger.error(
        `Failed to get price for ${coinId}/${vsCurrency}`,
        error,
      );
      throw new HttpException(
        'Failed to fetch price from CoinGecko',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateCurrency(currency: string): Promise<boolean> {
    try {
      const response = await this.axiosInstance.get(
        '/simple/supported_vs_currencies',
      );
      return response.data.includes(currency.toLowerCase());
    } catch (error) {
      this.logger.error(`Failed to validate currency ${currency}`, error);
      throw error;
    }
  }
}
