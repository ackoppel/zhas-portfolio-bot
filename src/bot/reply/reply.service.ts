import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from './entity/reply.entity';
import { Repository } from 'typeorm';
import { MessageDto } from '../dto/message.dto';
import {
  IModifyReply,
  IUpdateReply,
} from './interface/initOrUpdateReply.interface';
import { BotConnector } from '../connector/botConnector';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    private botConnector: BotConnector,
  ) {}

  async handleReply(message: MessageDto): Promise<any> {
    const userOpenReply = await this.getOpenReply(message.from.id);
    if (!userOpenReply) {
      return this.nothingToAnswer(message.chat.id);
    }
  }

  async initReply(initReply: IModifyReply) {}

  async updateReply(updatedReply: IUpdateReply, reply: Reply) {}

  async getOpenReply(user_id: number): Promise<Reply> {
    return this.replyRepository.findOne({
      user_id,
      isPending: true,
    });
  }

  async nothingToAnswer(chat_id: number) {
    return this.botConnector.sendMessage({
      chat_id,
      text: 'sorry, no active flow for this message',
    });
  }

  // async createOrUpdateReply(reply: ICreateOrUpdateReply): Promise<Reply> {
  //   const
  // }
}
