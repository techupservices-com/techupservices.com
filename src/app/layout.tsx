import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Type pairing — deliberate, not a default.
 * brand.md §5.3 ideal: PP Neue Montreal / ABC Diatype (paid foundry).
 * Free substitute that holds the same wide-grotesque + humanist-sans intent:
 *   Display: Bricolage Grotesque (wide, variable, strong black weight)
 *   Body:    Inter Tight        (denser Inter cut, pairs cleanly)
 * Self-hosting the foundry picks is a follow-up.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechUpServices — AI automation & bespoke digital infrastructure",
  description:
    "Premium AI automation, websites, apps, WhatsApp automation, social media, and tech consulting for businesses ready to scale. Built in Pune, shipped worldwide.",
  metadataBase: new URL("https://techupservices.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body className="bg-surface-base text-ink-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
