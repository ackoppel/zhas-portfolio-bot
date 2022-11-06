import { IUser } from './user.interface';
import { MessageEntityType } from '../enum/messageEntityType.enum';

export interface IMessageEntity {
  type: MessageEntityType;
  offset: number;
  length: number;
  url: string;
  user: IUser;
  language: string;
}
