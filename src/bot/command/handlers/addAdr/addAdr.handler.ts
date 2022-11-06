import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Command } from '../../enum/command.enum';
import { CommandRequestedEvent } from '../../event/commandRequested.event';
import { BotConnector } from '../../../connector/botConnector';

@Injectable()
export class AddAdrHandler {
  constructor(
    private eventEmitter: EventEmitter2,
    private botConnector: BotConnector,
  ) {}

  @OnEvent(Command.addAdr)
  async addAdr(payload: CommandRequestedEvent) {
    const { parsedText, message } = payload;

    const replyInit = {
      isPending: true,
      command: Command.addAdr,
      user_message: message,
    };
    // todo :: parse text
    console.log('CHAT ID\n', message.chat.id);
    console.log('TEXT :: \n', parsedText);

    // await this.sendMessage(message.chat.id, 'Add address endpoint');
  }

  private async sendMessage(chat_id: number, text: string): Promise<void> {
    await this.botConnector.sendMessage({ chat_id, text });
  }
}
