import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chain } from '../../chain/entity/chain.entity';
import { OracleType } from '../enum/oracleType.enum';

@Entity()
export class Oracle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chain, (chain) => chain.oracles)
  chain: Chain;

  @Column()
  baseUrl: string;

  @Column({ nullable: true })
  apiKey: string;

  @Column({ type: 'enum', enum: OracleType })
  type: OracleType;
}
