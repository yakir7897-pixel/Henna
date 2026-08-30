export type EventFormValues = {
  title: string;
  hostNames: string;
  eventDate: string; // datetime-local string, e.g. "2026-10-12T19:30"
  venueName: string;
  address: string;
  mapsUrl: string;
  description: string;
  coverImageUrl: string;
};

export type EventInput = {
  title: string;
  hostNames?: string;
  eventDate: string;
  venueName: string;
  address?: string;
  mapsUrl?: string;
  description?: string;
  coverImageUrl?: string;
};

export function emptyEventFormValues(): EventFormValues {
  return {
    title: "",
    hostNames: "",
    eventDate: "",
    venueName: "",
    address: "",
    mapsUrl: "",
    description: "",
    coverImageUrl: "",
  };
}

export function toEventInput(values: EventFormValues): EventInput {
  return {
    title: values.title,
    hostNames: values.hostNames || undefined,
    eventDate: values.eventDate,
    venueName: values.venueName,
    address: values.address || undefined,
    mapsUrl: values.mapsUrl || undefined,
    description: values.description || undefined,
    coverImageUrl: values.coverImageUrl || undefined,
  };
}

export function toDatetimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
