import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "אישורי הגעה",
  description: "מערכת הזמנות ואישורי הגעה לאירועים",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} h-full`}>
      <body
        className="flex min-h-full flex-col bg-neutral-50 text-neutral-900"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
