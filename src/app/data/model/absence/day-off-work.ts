export enum EventType {
  WEEKEND, HOLIDAY, INTERNAL_EVENT
}

export class DayOffWork {
  id: number;
  date: Date;
  name: string;
  eventType: EventType;
}

