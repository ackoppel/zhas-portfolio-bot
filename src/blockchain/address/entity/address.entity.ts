import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chain } from '../../chain/entity/chain.entity';
import { AddressStatus } from '../enum/addressStatus.enum';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chat_id: number;

  @Column()
  user_id: number;

  @Column({
    type: 'enum',
    enum: AddressStatus,
    default: AddressStatus.addChain,
  })
  status: AddressStatus;

  @ManyToOne(() => Chain, { nullable: true })
  chain: Chain;

  @Column({ nullable: true })
  contract_address: string;

  @Column({ nullable: true })
  message_to_reply: number;

  @Column({ type: 'date', default: new Date() })
  updated_at: Date;
}
