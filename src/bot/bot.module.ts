import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { UpdateService } from './update.service';
import { CommandService } from './command/command.service';
import { ConfigModule } from '@nestjs/config';
import { BaseCommandsHandler } from './command/handlers/baseCommands/baseCommands.handler';
import { AddAdrHandler } from './command/handlers/addAdr/addAdr.handler';
import { BotConnector } from './connector/botConnector';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ReplyService } from './reply/reply.service';

@Module({
  imports: [ConfigModule, BlockchainModule],
  exports: [],
  controllers: [BotController],
  providers: [
    BotConnector,
    UpdateService,

    ReplyService,

    CommandService,

    BaseCommandsHandler,
    AddAdrHandler,
  ],
})
export class BotModule {}
