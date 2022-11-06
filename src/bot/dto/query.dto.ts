import { IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  t: string;
}
