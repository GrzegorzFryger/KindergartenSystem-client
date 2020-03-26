export enum EventType {
  WEEKEND, HOLIDAY, INTERNAL_EVENT
}

export class DayOffWork {
  id: number;
  date: string;
  name: string;
  eventType: EventType;
}

