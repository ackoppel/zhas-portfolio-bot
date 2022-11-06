import { MessageEntityType } from '../connector/enum/messageEntityType.enum';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from './user.dto';
import { Type } from 'class-transformer';

export class MessageEntityDto {
  @IsEnum(MessageEntityType)
  type: MessageEntityType;

  @IsNumber()
  offset: number;

  @IsNumber()
  length: number;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  user?: UserDto;

  @IsOptional()
  @IsString()
  language?: string;
}
