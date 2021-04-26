import isProductionEnvironment from './isProductionEnvironment';

/** log function for non production environments only */
export default function log(...args: any[]) {
  if (isProductionEnvironment()) return;

  console.log(...args);
}

/** Util that keeps a context name for when there are a lot of logs */
export class Logger {
  contextName: string;

  constructor(contextName: string) {
    this.contextName = contextName;
  }

  error(...args: any[]) {
    // ? should this show on production?
    console.error(this.contextName, ...args);
  }

  log(...args: any[]) {
    log(this.contextName, ...args);
  }

  warn(...args: any[]) {
    if (isProductionEnvironment()) return;
    console.warn(this.contextName, ...args);
  }
}
