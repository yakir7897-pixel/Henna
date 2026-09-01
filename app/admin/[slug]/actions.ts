"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { parseDatetimeLocal, toEntranceEffect, type EventInput } from "@/lib/invite/types";

export async function updateEvent(eventId: string, input: EventInput) {
  const event = await prisma.event.update({
    where: { id: eventId },
    data: {
      title: input.title,
      hostNames: input.hostNames ?? null,
      eventDate: parseDatetimeLocal(input.eventDate),
      venueName: input.venueName,
      address: input.address ?? null,
      mapsUrl: input.mapsUrl ?? null,
      description: input.description ?? null,
      coverImageUrl: input.coverImageUrl ?? null,
      loadingImageUrl: input.loadingImageUrl ?? null,
      entranceEffect: toEntranceEffect(input.entranceEffect),
    },
  });

  revalidatePath(`/admin/${event.slug}`, "layout");
  revalidatePath(`/i/${event.slug}`);
  return event;
}

export async function deleteRsvp(rsvpId: string, slug: string) {
  await prisma.rsvp.delete({ where: { id: rsvpId } });
  revalidatePath(`/admin/${slug}`, "layout");
}

export type UpdateRsvpInput = {
  guestName: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  note?: string;
};

export type UpdateRsvpResult = { ok: true } | { ok: false; error: string };

export async function updateRsvp(rsvpId: string, slug: string, input: UpdateRsvpInput): Promise<UpdateRsvpResult> {
  const guestName = input.guestName.trim();
  const phone = input.phone.trim();

  if (!guestName || !phone) {
    return { ok: false, error: "נא למלא שם וטלפון" };
  }

  const guestCount = input.attending ? Math.min(20, Math.max(1, Math.floor(input.guestCount) || 1)) : 0;

  try {
    await prisma.rsvp.update({
      where: { id: rsvpId },
      data: {
        guestName,
        phone,
        attending: input.attending,
        guestCount,
        note: input.note?.trim() || null,
      },
    });
  } catch {
    return { ok: false, error: "כבר קיים אורח עם מספר הטלפון הזה באירוע" };
  }

  revalidatePath(`/admin/${slug}`, "layout");
  return { ok: true };
}
