import * as chalk from 'chalk'

export interface PrettyConsole {
  blue(message: string): PrettyConsole
  red(message: string): PrettyConsole
  green(message: string): PrettyConsole
  // blue(message: string): PrettyConsole
  // blue(message: string): PrettyConsole
  // blue(message: string): PrettyConsole
  // blue(message: string): PrettyConsole
  // blue(message: string): PrettyConsole

  bgRed(): PrettyConsole
  bgGreen(): PrettyConsole
  bgBlue(): PrettyConsole
}

let log = console.log


log(chalk.blue('chalk enabled'))

export class PrettyConsoleChalk implements PrettyConsole {

  private c

  constructor() {
    this.c = chalk
  }

  blue(message: string): PrettyConsole {
    if (this.c) {
      console.log(this.c.blue(message))
    }
    return this;
  }
  red(message: string): PrettyConsole {
    if (this.c) {
      log(this.c.red(message))
    }
    return this;
  }
  green(message: string): PrettyConsole {
    if (this.c) {
      log(this.c.green(message))
    }
    return this;
  }
  bgRed(): PrettyConsole {
    if (this.c) {
      this.c.bgRed()
    }
    return this;
  }
  bgGreen(): PrettyConsole {
    if (this.c) {
      this.c.bgGreen()
    }
    return this;
  }
  bgBlue(): PrettyConsole {
    if (this.c) {
      this.c.bgBlue()
    }
    return this;
  }

}

export default {CreatePrettyConsoleLog: new PrettyConsoleChalk()}
