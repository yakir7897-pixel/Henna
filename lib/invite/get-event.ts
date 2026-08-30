import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getEventBySlug = cache((slug: string) => prisma.event.findUnique({ where: { slug } }));

export const getEventWithRsvpsBySlug = cache((slug: string) =>
  prisma.event.findUnique({
    where: { slug },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  })
);
