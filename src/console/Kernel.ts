import { CreateModule } from './Commands/MakeCreateModule';

interface ICommand {
  'create:module': any;
}

export class Kernel {
  commands(): ICommand {
    return {
      'create:module': CreateModule,
    };
  }
}
