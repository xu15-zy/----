import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
