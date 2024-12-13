import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePairDto {
  @ApiProperty({ example: 'BTC' })
  @IsString()
  baseCurrency: string;

  @ApiProperty({ example: 'USD' })
  @IsString()
  quoteCurrency: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 5 })
  @IsNumber()
  updateInterval: number;
}
