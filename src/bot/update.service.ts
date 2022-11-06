import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { BotConnector } from './connector/botConnector';
import { UpdateDto } from './dto/update.dto';
import { MessageEntityType } from './connector/enum/messageEntityType.enum';
import { CommandService } from './command/command.service';
import { ConfigService } from '@nestjs/config';
import { MessageDto } from './dto/message.dto';
import { ReplyService } from './reply/reply.service';

@Injectable()
export class UpdateService implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private commandService: CommandService,
    private configService: ConfigService,
    private botConnector: BotConnector,
    private replyService: ReplyService,
  ) {}

  async onModuleInit() {
    await this.setWebHook();
  }

  async receiveUpdate(update: UpdateDto, token: string): Promise<any> {
    this.validateToken(token);
    const { message } = update;
    const isReply = !!message.reply_to_message;

    switch (true) {
      case !!message.entities && !isReply:
        return this.handleCommandInit(message);
      case isReply:
        return this.replyService.handleReply(message);
      default:
        return this.sendDevMessage(message.chat.id);
    }
  }

  async handleCommandInit(message: MessageDto): Promise<any> {
    const messageEntityTypes = message.entities.map((e) => e.type);
    switch (true) {
      case messageEntityTypes.includes(MessageEntityType.bot_command):
        return this.commandService.handleMessage(message);
      default:
        return this.sendDevMessage(message.chat.id);
    }
  }

  private async sendDevMessage(chat_id: number) {
    return this.botConnector.sendMessage({
      chat_id,
      text: 'yo, still in devvv. check back soon',
    });
  }

  private validateToken(token: string) {
    if (token !== this.configService.get('bot.token')) {
      throw new UnauthorizedException();
    }
  }

  private async setWebHook() {
    if (!this.configService.get<boolean>('bot.send_webhook')) {
      this.logger.warn('Web hook not set.');
      return;
    }
    this.logger.warn('Webhook will be set.');

    const { basePath, token } = this.getEndpointData();

    return this.botConnector.setWebHook({
      url: `${basePath}/bot/receive-update?t=${token}`,
    });
  }

  private getEndpointData() {
    return {
      basePath: this.configService.get('app.basePath'),
      token: this.configService.get('bot.token'),
    };
  }
}
