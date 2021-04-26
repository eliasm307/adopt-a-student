import isProductionEnvironment from './isProductionEnvironment';

/** log function for non production environments only */
export default function log(...args: any[]) {
  if (isProductionEnvironment()) return;

  console.log(...args);
}

/** Util that keeps a context name for when there are a lot of logs */
export class Logger {
  contextName?: string;

  constructor(contextName?: string) {
    this.contextName = contextName;
  }

  log(...args: any[]) {
    const items = [...args];

    if (this.contextName) items.unshift(this.contextName);
    log(...items);
  }
}
