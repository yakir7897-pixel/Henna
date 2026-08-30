"use server";

import { prisma } from "@/lib/prisma";

export type SubmitRsvpInput = {
  eventId: string;
  guestName: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  note?: string;
};

export type SubmitRsvpResult = { ok: true } | { ok: false; error: string };

export async function submitRsvp(input: SubmitRsvpInput): Promise<SubmitRsvpResult> {
  const guestName = input.guestName.trim();
  const phone = input.phone.trim();

  if (!guestName || !phone) {
    return { ok: false, error: "נא למלא שם וטלפון" };
  }

  const guestCount = input.attending ? Math.min(20, Math.max(1, Math.floor(input.guestCount) || 1)) : 0;

  try {
    await prisma.rsvp.upsert({
      where: { eventId_phone: { eventId: input.eventId, phone } },
      create: {
        eventId: input.eventId,
        guestName,
        phone,
        attending: input.attending,
        guestCount,
        note: input.note?.trim() || null,
      },
      update: {
        guestName,
        attending: input.attending,
        guestCount,
        note: input.note?.trim() || null,
      },
    });
  } catch {
    return { ok: false, error: "משהו השתבש, נסו שוב" };
  }

  return { ok: true };
}
