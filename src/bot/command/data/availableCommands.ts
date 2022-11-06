import { ICommand } from '../../connector/interface/command.interface';
import { Command } from '../enum/command.enum';
import { baseCommands } from './baseCommands';

export const availableCommands: ICommand[] = [
  ...baseCommands,
  {
    command: Command.addAdr,
    description: 'Add an address to keep track of',
  },
  // todo :: implement
  // {
  //   command: Command.alerts,
  //   description: 'How to use alerts',
  // },
  // {
  //   command: Command.tracking,
  //   description: 'How to track addresses and tokens',
  // },
  // {
  //   command: Command.setAlert,
  //   description: 'Set alert of available type',
  // },
  // {
  //   command: Command.addTkn,
  //   description: 'Add a token for balance tracking',
  // },
];
