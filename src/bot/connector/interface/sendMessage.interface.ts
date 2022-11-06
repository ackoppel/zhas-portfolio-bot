import { ParseMode } from '../enum/parseMode.enum';

export interface ISendMessage {
  chat_id: number;
  text: string;
  parse_mode?: ParseMode;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
}
