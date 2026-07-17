import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "敦煌纹样 · 数字重生 — 六大核心纹样数字化交互设计",
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
      <body className="font-sans antialiased" style={{ background: "#0a0a0a", color: "#f5e6d0" }}>
        <script
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <main>{children}</main>
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
