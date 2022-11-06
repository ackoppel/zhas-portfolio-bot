import { Command } from '../enum/command.enum';
import { MessageDto } from '../../dto/message.dto';
import { MessageEntityType } from '../../connector/enum/messageEntityType.enum';

interface IParsedCommand {
  command: Command;
  text: string;
}

export const parseCommand = (message: MessageDto): IParsedCommand => {
  const { length, offset } = message.entities.find(
    (e) => e.type === MessageEntityType.bot_command,
  );
  return {
    command: message.text.slice(offset + 1, length) as Command,
    text: removeWhitespace(message.text.slice(offset + length)),
  };
};

const removeWhitespace = (text: string): string => {
  const cleanedFront = removeWhitespaceInFront(text);
  return cleanedFront.slice(0, findLastWhitespaceIndex(cleanedFront));
};

const removeWhitespaceInFront = (text: string): string => {
  if (text.indexOf(' ') !== 0) {
    return text;
  }
  let cleaned = text;
  while (cleaned.indexOf(' ') === 0) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
};

const findLastWhitespaceIndex = (text: string) => {
  let index: number;
  for (let i = text.length - 1; i > 0; i--) {
    if (text[i] === ' ') {
      continue;
    }
    index = i + 1;
    break;
  }
  return index;
};
