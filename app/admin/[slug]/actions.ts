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

  revalidatePath(`/admin/${event.slug}`);
  revalidatePath(`/i/${event.slug}`);
  return event;
}

export async function deleteRsvp(rsvpId: string, slug: string) {
  await prisma.rsvp.delete({ where: { id: rsvpId } });
  revalidatePath(`/admin/${slug}`);
}
