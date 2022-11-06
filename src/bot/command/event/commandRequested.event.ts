import { MessageDto } from '../../dto/message.dto';

export class CommandRequestedEvent {
  constructor(public parsedText: string, public message: MessageDto) {}
}
