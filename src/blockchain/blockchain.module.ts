import { Module } from '@nestjs/common';
import { ChainService } from './chain/chain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chain } from './chain/entity/chain.entity';
import { OracleService } from './oracle/oracle.service';
import { Oracle } from './oracle/entity/oracle.entity';
import { Address } from './address/entity/address.entity';
import { AddressService } from './address/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chain, Oracle, Address])],
  controllers: [],
  providers: [ChainService, OracleService, AddressService],
  exports: [AddressService],
})
export class BlockchainModule {}
