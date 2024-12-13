import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CryptoPair } from '../../pairs/entities/pair.entity';

@Entity()
export class CryptoRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pairId: number;

  @Column('decimal', { precision: 18, scale: 8 })
  rate: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => CryptoPair, pair => pair.rates)
  @JoinColumn({ name: 'pairId' })
  pair: CryptoPair;
}
