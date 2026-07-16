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
        {/* 标记 JS 可用：在内容解析前同步执行，避免内容闪烁 */}
        <script
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* 纯原生滚动揭示：不依赖 React hydration，配 .js .reveal 使用，含安全网 */}
        <script
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var els=document.querySelectorAll('.reveal');" +
              "if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in')});return;}" +
              "try{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.15});" +
              "els.forEach(function(el){io.observe(el);});}catch(err){els.forEach(function(el){el.classList.add('in');});}" +
              "setTimeout(function(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<(window.innerHeight||document.documentElement.clientHeight))el.classList.add('in');});},2000);})();",
          }}
        />
      </body>
    </html>
  );
}
