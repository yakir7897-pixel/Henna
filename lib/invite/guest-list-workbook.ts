import ExcelJS from "exceljs";
import type { Event, Rsvp } from "@prisma/client";

const NAVY = "FF1F3A5F";
const WHITE = "FFFFFFFF";
const THIN_BORDER = {
  top: { style: "thin", color: { argb: "FFD4D4D4" } },
  left: { style: "thin", color: { argb: "FFD4D4D4" } },
  bottom: { style: "thin", color: { argb: "FFD4D4D4" } },
  right: { style: "thin", color: { argb: "FFD4D4D4" } },
} as const;

export function buildGuestListWorkbook(event: Event, rsvps: Rsvp[]): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("אישורי הגעה", { views: [{ rightToLeft: true }] });
  sheet.columns = [{ width: 22 }, { width: 16 }, { width: 12 }, { width: 12 }, { width: 30 }, { width: 18 }];

  const title = sheet.addRow([`אישורי הגעה - ${event.title}`]);
  sheet.mergeCells(title.number, 1, title.number, 6);
  const titleCell = title.getCell(1);
  titleCell.font = { bold: true, size: 14, color: { argb: WHITE } };
  titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  titleCell.alignment = { horizontal: "right", vertical: "middle" };
  title.height = 24;
  sheet.addRow([]);

  const header = sheet.addRow(["שם", "טלפון", "סטטוס", "מס' אורחים", "הערה", "תאריך אישור"]);
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: WHITE } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
    cell.alignment = { horizontal: "right" };
    cell.border = THIN_BORDER;
  });

  for (const rsvp of rsvps) {
    const row = sheet.addRow([
      rsvp.guestName,
      rsvp.phone,
      rsvp.attending ? "מגיע/ה" : "לא מגיע/ה",
      rsvp.attending ? rsvp.guestCount : 0,
      rsvp.note ?? "",
      rsvp.createdAt.toLocaleString("he-IL"),
    ]);
    row.eachCell((cell) => {
      cell.alignment = { horizontal: "right" };
      cell.border = THIN_BORDER;
    });
  }

  const attending = rsvps.filter((r) => r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guestCount, 0);

  sheet.addRow([]);
  const summary = sheet.addRow([
    `סה"כ אישרו: ${attending.length} · סה"כ מגיעים: ${totalGuests} · לא מגיעים: ${rsvps.length - attending.length}`,
  ]);
  sheet.mergeCells(summary.number, 1, summary.number, 6);
  summary.getCell(1).font = { bold: true };
  summary.getCell(1).alignment = { horizontal: "right" };

  return workbook;
}
