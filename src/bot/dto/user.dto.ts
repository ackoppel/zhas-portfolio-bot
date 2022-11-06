import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  is_bot: boolean;

  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsString()
  username: string;
}
