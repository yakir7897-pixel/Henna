import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminRootPage() {
  const latestEvent = await prisma.event.findFirst({ orderBy: { createdAt: "desc" } });

  if (latestEvent) {
    redirect(`/admin/${latestEvent.slug}`);
  }

  redirect("/admin/events");
}
