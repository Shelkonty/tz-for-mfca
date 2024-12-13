import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRatesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  pairId?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ enum: ['ASC', 'DESC'], required: false })
  @IsString()
  @IsOptional()
  sort?: 'ASC' | 'DESC';
}
