import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MessageDto } from './message.dto';

export class UpdateDto {
  @IsNumber()
  update_id: number;

  @ValidateNested()
  @Type(() => MessageDto)
  message: MessageDto;
}
