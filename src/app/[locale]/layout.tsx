import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "El Nigo Steakhouse",
  description: "Premium Steakhouse — seit über 30 Jahren für das perfekte Steak.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en" | "hr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen antialiased bg-[#0a0908] text-[#f2ebe0] flex flex-col`}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryProvider>{children}</QueryProvider>
      </NextIntlClientProvider>
    </div>
  );
}
