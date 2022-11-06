import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChainType } from '../enum/chainType.enum';
import { Oracle } from '../../oracle/entity/oracle.entity';
import { Address } from '../../address/entity/address.entity';

@Entity()
export class Chain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ChainType })
  type: ChainType;

  @Column()
  name: string;

  @OneToMany(() => Oracle, (oracle) => oracle.chain)
  oracles: Oracle[];

  // todo :: create historical prices array
  // prices:

  @OneToMany(() => Address, (address) => address.chain)
  addresses: Address[];
}
