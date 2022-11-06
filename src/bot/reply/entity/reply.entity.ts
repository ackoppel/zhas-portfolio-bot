import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Command } from '../../command/enum/command.enum';
import { MessageDto } from '../../dto/message.dto';
import { ReplyOutcome } from '../enum/replyOutcome.enum';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  isPending: boolean;

  @Column({ type: 'enum', enum: Command })
  command: Command;

  @Column({ type: 'jsonb' })
  bot_message: MessageDto;

  @Column()
  bot_message_id: number;

  @Column({ type: 'jsonb', nullable: true })
  user_response: MessageDto;

  @Column({ nullable: true })
  user_response_id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  assigned_status: string;

  @Column({ type: 'enum', enum: ReplyOutcome, default: ReplyOutcome.undefined })
  outcome: ReplyOutcome;
}
