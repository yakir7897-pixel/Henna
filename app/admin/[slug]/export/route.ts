import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildGuestListWorkbook } from "@/lib/invite/guest-list-workbook";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const workbook = buildGuestListWorkbook(event, event.rsvps);
  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="guests-${event.slug}.xlsx"`,
    },
  });
}
