import { IUser } from './user.interface';
import { IChat } from './chat.interface';
import { IMessageEntity } from './messageEntity.interface';

export interface IMessage {
  message_id: number;
  from: IUser;
  date: number; // unix
  sender_chat: IChat;
  entities: IMessageEntity[];
  text: string;
}
