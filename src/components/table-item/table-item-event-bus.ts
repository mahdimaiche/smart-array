import type { TableItemInfo } from '../../models'

export class TableItemEventBus {
  events: Map<string, TableItemInfo> = new Map();
  private subscribers: ((tableItemInfo: TableItemInfo[]) => void)[] = [];
  private static instanceMap: Map<string, TableItemEventBus> = new Map();
  private constructor() { }

  public static getInstance(id: string) {
    if (!TableItemEventBus.instanceMap.has(id)) {
      TableItemEventBus.instanceMap.set(id, new TableItemEventBus());
    }
    return TableItemEventBus.instanceMap.get(id);
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
