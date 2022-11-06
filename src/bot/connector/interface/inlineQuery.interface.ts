import { IUser } from './user.interface';
import { ChatType } from '../enum/chatType.enum';

export interface IInlineQuery {
  id: string;
  from: IUser;
  query: string;
  offset: string;
  chat_type: ChatType;
}
