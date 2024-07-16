type Event = {
  id: string;
  eventName: string;
  eventType: string;
  eventFrom: number;
  eventTo: number;
};

type CreateEvent = {
  eventName: string;
  eventType: string;
  eventFrom: number;
  eventTo: number;
};

export { type Event, type CreateEvent };
