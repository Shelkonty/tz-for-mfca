import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoPair } from './entities/pair.entity';
import { CreatePairDto } from './dto/create-pair.dto';
import { UpdatePairDto } from './dto/update-pair.dto';

@Injectable()
export class PairsService {
  constructor(
    @InjectRepository(CryptoPair)
    private pairsRepository: Repository<CryptoPair>,
  ) {}

  async create(createPairDto: CreatePairDto): Promise<CryptoPair> {
    const pair = this.pairsRepository.create(createPairDto);
    return await this.pairsRepository.save(pair);
  }

  async findAll(): Promise<CryptoPair[]> {
    return await this.pairsRepository.find();
  }

  async update(id: number, updatePairDto: UpdatePairDto): Promise<CryptoPair> {
    const pair = await this.pairsRepository.findOne({ where: { id } });
    if (!pair) {
      throw new NotFoundException(`Pair with ID ${id} not found`);
    }

    Object.assign(pair, updatePairDto);
    return await this.pairsRepository.save(pair);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pairsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pair with ID ${id} not found`);
    }
  }
}
