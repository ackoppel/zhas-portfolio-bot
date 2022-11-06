import axios from 'axios';
import { ISendMessage } from './interface/sendMessage.interface';
import { IChat } from './interface/chat.interface';
import { ICommand } from './interface/command.interface';
import { ISetWebHook } from './interface/setWebHook.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageDto } from '../dto/message.dto';

export enum BotMethod {
  GET_ME = 'getMe',
  SEND_MESSAGE = 'sendMessage',
  GET_CHAT = 'getChat',
  SET_COMMANDS = 'setMyCommands',
  SET_WEBHOOK = 'setWebhook',
}

enum HttpMethod {
  GET = 'get',
  POST = 'post',
}

interface IPerformRequestParams {
  botMethod: string;
  httpMethod: string;
  data?: any;
  query?: string;
}

@Injectable()
export class BotConnector {
  constructor(private configService: ConfigService) {}

  async getMe(): Promise<any> {
    return this.performRequest({
      botMethod: BotMethod.GET_ME,
      httpMethod: HttpMethod.GET,
    });
  }

  async getChat(chat_id: number): Promise<IChat> {
    return this.performRequest({
      botMethod: BotMethod.GET_CHAT,
      httpMethod: HttpMethod.GET,
      query: `chat_id=${chat_id}`,
    });
  }

  async sendMessage(message: ISendMessage): Promise<MessageDto> {
    return this.performRequest({
      botMethod: BotMethod.SEND_MESSAGE,
      httpMethod: HttpMethod.POST,
      data: message,
    });
  }

  async setCommands(commands: ICommand[]): Promise<void> {
    return this.performRequest({
      botMethod: BotMethod.SET_COMMANDS,
      httpMethod: HttpMethod.POST,
      data: {
        commands,
      },
    });
  }

  async setWebHook(data: ISetWebHook): Promise<void> {
    return this.performRequest({
      botMethod: BotMethod.SET_WEBHOOK,
      httpMethod: HttpMethod.POST,
      data,
    });
  }

  // async getUpdates(offset: number, limit: number) {}

  private async performRequest(params: IPerformRequestParams) {
    const { url, token, query } = this.getEndpointData(params.query);
    try {
      const response = await axios[params.httpMethod](
        `${url}/bot${token}/${params.botMethod}${query}`,
        params.data,
      );
      return response.data;
    } catch (e) {
      // todo :: fix error handling
      console.log(e);
      return null;
    }
  }

  private getEndpointData(q: string | undefined) {
    return {
      url: this.configService.get<string>('bot.api_url'),
      token: this.configService.get<string>('bot.token'),
      query: q || '',
    };
  }
}
