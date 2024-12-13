import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PairsService } from './pairs.service';
import { CreatePairDto } from './dto/create-pair.dto';
import { CryptoPair } from './entities/pair.entity';

@ApiTags('pairs')
@Controller('pairs')
export class PairsController {
  constructor(private readonly pairsService: PairsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new crypto pair' })
  @ApiResponse({ status: 201, type: CryptoPair })
  create(@Body() createPairDto: CreatePairDto): Promise<CryptoPair> {
    return this.pairsService.create(createPairDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all crypto pairs' })
  @ApiResponse({ status: 200, type: [CryptoPair] })
  findAll(): Promise<CryptoPair[]> {
    return this.pairsService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update crypto pair' })
  @ApiResponse({ status: 200, type: CryptoPair })
  update(
    @Param('id') id: string,
    @Body() updatePairDto: Partial<CreatePairDto>,
  ): Promise<CryptoPair> {
    return this.pairsService.update(+id, updatePairDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete crypto pair' })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string): Promise<void> {
    return this.pairsService.remove(+id);
  }
}
