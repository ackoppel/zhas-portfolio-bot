import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Command } from '../../enum/command.enum';
import { readTextFile } from '../../../common/readTextFile';
import { BotConnector } from '../../../connector/botConnector';
import { CommandRequestedEvent } from '../../event/commandRequested.event';
import { ParseMode } from '../../../connector/enum/parseMode.enum';

@Injectable()
export class BaseCommandsHandler {
  constructor(
    private eventEmitter: EventEmitter2,
    private botConnector: BotConnector,
  ) {}

  @OnEvent(Command.start)
  async start(payload: CommandRequestedEvent) {
    return readTextFile(
      './src/bot/command/handlers/baseCommands/template/start.html',
      async (welcomeMessage) => {
        await this.sendMessage(payload.message.chat.id, welcomeMessage);
      },
    );
  }

  @OnEvent(Command.help)
  async help(payload: CommandRequestedEvent) {
    return readTextFile(
      './src/bot/command/handlers/baseCommands/template/help.html',
      async (helpMessage) => {
        await this.sendMessage(payload.message.chat.id, helpMessage);
      },
    );
  }

  private async sendMessage(chat_id: number, text: string): Promise<void> {
    await this.botConnector.sendMessage({
      chat_id,
      text,
      parse_mode: ParseMode.HTML,
    });
  }
}
