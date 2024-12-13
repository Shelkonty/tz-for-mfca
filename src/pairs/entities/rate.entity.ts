import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CryptoPair } from '../../pairs/entities/pair.entity';

@Entity()
export class CryptoRate {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  pairId: number;

  @Column('decimal', { precision: 18, scale: 8 })
  @ApiProperty()
  rate: number;

  @Column()
  @ApiProperty()
  timestamp: Date;

  @ManyToOne(() => CryptoPair)
  pair: CryptoPair;
}
