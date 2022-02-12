import type { TableItemInfo } from '../../models'

export class TableItemEventBus {
  events: Map<string, TableItemInfo> = new Map();
  private static instance: TableItemEventBus;
  private subscribers: ((tableItemInfo: TableItemInfo[]) => void)[] = [];

  private constructor() { }

  public static getInstance() {
    if (!TableItemEventBus.instance) {
      TableItemEventBus.instance = new TableItemEventBus();
    }
    return TableItemEventBus.instance;
  }

  public pushEvent(id: string, info: TableItemInfo) {
    this.events.set(id, info);
    this.subscribers.forEach(subscriber => subscriber([info]));

  }

  public subscribe(consumer: (tableItemInfo: TableItemInfo[]) => void) {
    this.subscribers.push(consumer);
    if (this.events.size > 0) {
      consumer(Array.from(this.events.values()));
    }

  }
}
