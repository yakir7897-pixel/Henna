export const ENTRANCE_EFFECTS = [
  { value: "fade", label: "דהייה עדינה" },
  { value: "slideUp", label: "החלקה מלמטה" },
  { value: "zoomIn", label: "הגדלה מהמרכז" },
  { value: "flip", label: "היפוך" },
] as const;

export type EntranceEffect = (typeof ENTRANCE_EFFECTS)[number]["value"];

const ENTRANCE_EFFECT_VALUES = ENTRANCE_EFFECTS.map((e) => e.value) as string[];

export function toEntranceEffect(value: string): EntranceEffect {
  return ENTRANCE_EFFECT_VALUES.includes(value) ? (value as EntranceEffect) : "fade";
}

export type EventFormValues = {
  title: string;
  hostNames: string;
  eventDate: string; // datetime-local string, e.g. "2026-10-12T19:30"
  venueName: string;
  address: string;
  mapsUrl: string;
  description: string;
  coverImageUrl: string;
  loadingImageUrl: string;
  entranceEffect: EntranceEffect;
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
  loadingImageUrl?: string;
  entranceEffect: string;
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
    loadingImageUrl: "",
    entranceEffect: "fade",
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
    loadingImageUrl: values.loadingImageUrl || undefined,
    entranceEffect: values.entranceEffect,
  };
}

// Event dates are stored as "floating" wall-clock time: the numbers typed in the
// datetime-local input are encoded into a Date using UTC fields, and always read
// back out using UTC fields too. This keeps the displayed date/time identical
// regardless of which timezone the browser or server happens to run in — the
// alternative (`new Date(string)`) is parsed as *local* time to whichever
// machine runs it, which silently shifts the value between browser and server.
export function parseDatetimeLocal(value: string): Date {
  const [datePart, timePart] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = (timePart ?? "00:00").split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

export function toDatetimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}
