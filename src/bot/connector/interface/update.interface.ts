import { IMessage } from './message.interface';
import { IInlineQuery } from './inlineQuery.interface';

export interface IUpdate {
  update_id: number;
  message: IMessage;
  edited_message: IMessage;
  channel_post: IMessage;
  edited_channel_post: IMessage;
  inline_query: IInlineQuery;
}
