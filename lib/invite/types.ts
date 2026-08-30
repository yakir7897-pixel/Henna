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

export function toDatetimeLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
