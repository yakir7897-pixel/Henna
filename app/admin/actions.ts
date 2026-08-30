"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { EventInput } from "@/lib/invite/types";

function generateSlug(): string {
  return randomUUID().replace(/-/g, "").slice(0, 8);
}

export async function createEvent(input: EventInput) {
  const event = await prisma.event.create({
    data: {
      slug: generateSlug(),
      title: input.title,
      hostNames: input.hostNames ?? null,
      eventDate: new Date(input.eventDate),
      venueName: input.venueName,
      address: input.address ?? null,
      mapsUrl: input.mapsUrl ?? null,
      description: input.description ?? null,
      coverImageUrl: input.coverImageUrl ?? null,
    },
  });

  revalidatePath("/admin");
  return event;
}
