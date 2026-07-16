import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// 自托管字体：构建时下载并随站点一同部署，避免依赖 Google Fonts CDN（国内常被拦截/慢）
const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});
const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "敦煌六大核心纹样 · 数字化交互宣传",
  description:
    "以敦煌佛教装饰符号体系为框架，系统介绍忍冬纹、莲花纹、云纹、八功德水波纹、千佛点阵纹、三兔共耳藻井纹六大核心纹样，探索传统文化的可持续传播。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${notoSerifSC.variable} ${notoSansSC.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
