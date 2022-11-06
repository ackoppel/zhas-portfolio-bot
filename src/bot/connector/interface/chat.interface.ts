import { ChatType } from '../enum/chatType.enum';

export interface IChat {
  id: number;
  type: ChatType;
  title: string;
  username: string;
  first_name: string;
  last_name: string;
}
