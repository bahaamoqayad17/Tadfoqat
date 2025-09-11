import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/locales/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Tadfoqat - Buy Now, Pay Later",
  description:
    "Divide your bill into 4 easy payments without complications between wholesalers and retailers",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <body className="font-sans antialiased">
          <Navbar />
          {children}
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
