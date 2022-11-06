import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from './user.dto';
import { ChatDto } from './chat.dto';
import { MessageEntityDto } from './messageEntity.dto';

export class MessageDto {
  @IsNumber()
  message_id: number;

  @ValidateNested()
  @Type(() => UserDto)
  from: UserDto;

  @IsNumber()
  date: number; // unix

  @ValidateNested()
  @Type(() => ChatDto)
  chat: ChatDto;

  @ValidateNested({ each: true })
  @Type(() => MessageEntityDto)
  entities: MessageEntityDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  reply_to_message?: MessageDto;

  @IsString()
  text: string;
}
