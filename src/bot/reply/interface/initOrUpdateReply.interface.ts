import { Command } from '../../command/enum/command.enum';
import { MessageDto } from '../../dto/message.dto';

export interface IModifyReply {
  isPending: boolean;
  command: Command;
  user_message: MessageDto;
  bot_message: MessageDto;
  assigned_status: string;
}
