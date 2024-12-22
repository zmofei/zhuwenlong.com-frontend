import localFont from "next/font/local";
import { use } from "react"
import "../globals.css";
import Nav from '@/components/Common/Nav'
import { LanguageProvider } from "@/components/Context/LanguageContext";
import CustomCursor from "@/components/util/Mouse";
import type { Metadata, ResolvingMetadata } from 'next'
import { title } from "process";


export async function generateMetadata(params: any): Promise<Metadata> {
  const { lang } = await params.params
  return {
    title: lang === 'zh' ? '你好我是Mofei' : 'Hi! I am Mofei!',
  }
}


export default function RootLayout(params: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { children } = params
  const { lang } = use(params.params)

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased`}
      >
        <LanguageProvider defaultLang={lang}>
          <CustomCursor />
          <Nav lang={lang} />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
