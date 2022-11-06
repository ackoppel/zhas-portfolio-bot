import { Body, Controller, Post, Query } from '@nestjs/common';
import { UpdateDto } from './dto/update.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateService } from './update.service';

@Controller('bot')
export class BotController {
  constructor(private updateService: UpdateService) {}

  @Post('receive-update')
  async receiveUpdate(
    @Body()
    update: UpdateDto,
    @Query()
    query: QueryDto,
  ): Promise<void> {
    return this.updateService.receiveUpdate(update, query.t);
  }
}
