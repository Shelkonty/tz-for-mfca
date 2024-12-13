import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RatesService } from './rates.service';
import { GetRatesDto } from './dto/get-rates.dto';
import { CryptoRate } from './entities/rate.entity';

@ApiTags('rates')
@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get()
  @ApiOperation({ summary: 'Get crypto rates' })
  @ApiResponse({ status: 200, type: [CryptoRate] })
  getRates(@Query() getRatesDto: GetRatesDto): Promise<CryptoRate[]> {
    return this.ratesService.getRates(getRatesDto);
  }
}
