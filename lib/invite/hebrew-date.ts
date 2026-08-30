const HUNDREDS = ["", "ק", "ר", "ש", "ת", "תק", "תר", "תש", "תת", "תתק"];
const TENS = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
const UNITS = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];

function hebrewNumeralLetters(num: number): string {
  let n = num;
  const hundreds = Math.floor(n / 100);
  n %= 100;
  let letters = HUNDREDS[hundreds] ?? "";

  // 15 / 16 avoid spelling the divine name (יה / יו) - convention uses ט"ו / ט"ז instead.
  if (n === 15) {
    letters += "טו";
  } else if (n === 16) {
    letters += "טז";
  } else {
    letters += TENS[Math.floor(n / 10)] + UNITS[n % 10];
  }
  return letters;
}

function withGershayim(letters: string): string {
  if (letters.length === 0) return letters;
  if (letters.length === 1) return `${letters}׳`;
  return `${letters.slice(0, -1)}״${letters.slice(-1)}`;
}

export function toHebrewNumeral(num: number): string {
  return withGershayim(hebrewNumeralLetters(num));
}

const hebrewCalendarFormatter = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function toHebrewDateString(date: Date): string {
  const parts = hebrewCalendarFormatter.formatToParts(date);
  const day = Number(parts.find((p) => p.type === "day")?.value ?? "0");
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = Number(parts.find((p) => p.type === "year")?.value ?? "0");

  return `${toHebrewNumeral(day)} ב${month} ${toHebrewNumeral(year % 1000)}`;
}
