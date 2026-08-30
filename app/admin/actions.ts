"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { toEntranceEffect, type EventInput } from "@/lib/invite/types";

export type UploadCoverImageResult = { ok: true; url: string } | { ok: false; error: string };

export async function uploadCoverImage(formData: FormData): Promise<UploadCoverImageResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "לא נבחרה תמונה" };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "יש להעלות קובץ תמונה" };
  }
  if (file.size > 8 * 1024 * 1024) {
    return { ok: false, error: "התמונה גדולה מדי (מקסימום 8MB)" };
  }

  try {
    const blob = await put(`event-covers/${randomUUID()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { ok: true, url: blob.url };
  } catch {
    return { ok: false, error: "העלאת התמונה נכשלה, נסה שוב" };
  }
}

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
      loadingImageUrl: input.loadingImageUrl ?? null,
      entranceEffect: toEntranceEffect(input.entranceEffect),
    },
  });

  revalidatePath("/admin");
  return event;
}
