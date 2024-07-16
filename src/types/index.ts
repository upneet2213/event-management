interface CreateEvent {
  eventName: string;
  eventType: string;
  eventFrom: number;
  eventTo: number;
  eventDescription: string | null;
}

interface Event extends CreateEvent {
  id: string;
}

export { type Event, type CreateEvent };
