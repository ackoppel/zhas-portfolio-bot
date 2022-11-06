import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { parseCommand } from './helper/parseCommand';
import { availableCommands } from './data/availableCommands';
import { ConfigService } from '@nestjs/config';
import { BotConnector } from '../connector/botConnector';
import { MessageDto } from '../dto/message.dto';
import { Command } from './enum/command.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommandRequestedEvent } from './event/commandRequested.event';
import { baseCommands } from './data/baseCommands';

@Injectable()
export class CommandService implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private eventEmitter: EventEmitter2,
    private configService: ConfigService,
    private botConnector: BotConnector,
  ) {}

  async onModuleInit() {
    await this.setBaseCommands();
  }

  async handleMessage(message: MessageDto): Promise<void> {
    const { command, text } = await this.validateCommand(message);
    if (!command) {
      return;
    }
    this.emitCommand(command, text, message);
  }

  private async validateCommand(message: MessageDto): Promise<{
    command: Command;
    text: string;
  }> {
    const { command, text } = parseCommand(message);
    const exists = availableCommands.find((c) => c.command === command);
    if (!exists) {
      await this.botConnector.sendMessage({
        chat_id: message.chat.id,
        text: `Command /${command} not defined`,
      });
      return {
        command: undefined,
        text: undefined,
      };
    }
    return {
      command,
      text,
    };
  }

  private emitCommand(
    command: Command,
    parsedText: string,
    message: MessageDto,
  ) {
    this.eventEmitter.emit(
      command,
      new CommandRequestedEvent(parsedText, message),
    );
  }

  private async setBaseCommands(): Promise<void> {
    if (!this.configService.get<boolean>('bot.send_base_commands')) {
      this.logger.warn('Bot base commands not sent.');
      return;
    }
    this.logger.warn('Bot base commands will be sent.');

    return this.botConnector.setCommands(baseCommands);
  }
}
