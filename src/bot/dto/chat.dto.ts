import { ChatType } from '../connector/enum/chatType.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChatDto {
  @IsNumber()
  id: number;

  @IsEnum(ChatType)
  type: ChatType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  username: string;

  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name?: string;
}
