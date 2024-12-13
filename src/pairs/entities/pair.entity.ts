import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CryptoRate } from '../../rates/entities/rate.entity';

@Entity()
export class CryptoPair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  baseCurrency: string;

  @Column()
  quoteCurrency: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  updateInterval: number;

  @OneToMany(() => CryptoRate, rate => rate.pair)
  rates: CryptoRate[];
}
