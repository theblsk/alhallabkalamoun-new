import type { Metadata } from "next";
import { Montserrat, Amiri } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Refaat Al Hallab - Authentic Lebanese Sweets Since 1881",
  description:
    "Discover our exquisite collection of authentic Lebanese sweets, crafted with love and tradition passed down through generations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body
        className={`${montserrat.variable} ${amiri.variable} ${
          isRTL ? "font-amiri" : "font-montserrat"
        } bg-hlb-bg text-hlb-text antialiased`}
      >
        <NextIntlClientProvider>
          <HeroUIProvider>{children}</HeroUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
