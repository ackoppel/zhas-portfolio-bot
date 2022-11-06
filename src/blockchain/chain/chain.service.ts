import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Chain } from './entity/chain.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChainService {
  constructor(
    @InjectRepository(Chain)
    private chainRepository: Repository<Chain>,
  ) {}
}
