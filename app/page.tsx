import Link from "next/link";
import { patterns } from "@/data/patterns";
import PatternCard from "@/components/PatternCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const spine = [
  { href: "/history", n: "01", title: "敦煌历史", desc: "千年营建与文明交融" },
  { href: "/system", n: "02", title: "装饰符号体系", desc: "三层嵌套 · 对称循环 · 精神内核" },
  { href: "/patterns", n: "03", title: "六大纹样", desc: "独立板块系统呈现" },
  { href: "/culture", n: "04", title: "文化传承", desc: "纹样长效传播" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-mibai-light via-mibai to-mibai-deep/40" />
        <div className="container-dh py-20 text-center sm:py-28">
          <p className="mb-4 text-sm font-medium tracking-[0.4em] text-zhusha">
            敦煌 · 佛教装饰符号体系
          </p>
          <h1 className="heading-dh animate-fade-up text-4xl font-medium leading-tight sm:text-6xl">
            敦煌六大核心纹样
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mo/70 sm:text-lg">
            忍冬纹 · 莲花纹 · 云纹 · 八功德水波纹 · 千佛点阵纹 · 三兔共耳藻井纹
            <br />
            以完整装饰符号体系为框架，探索传统文化由静态遗产向动态数字内容的可持续转译。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/patterns" className="btn-dh">
              浏览六大纹样
            </Link>
            <Link href="/system" className="btn-dh-ghost">
              理解装饰体系
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="pill-dh">文化传承</span>
            <span className="pill-dh">纹样长效传播</span>
            <span className="pill-dh">国风敦煌视觉</span>
            <span className="pill-dh">网页直看 3D</span>
          </div>
        </div>
      </section>

      {/* 叙事主线 */}
      <section className="container-dh py-14">
        <SectionHeading
          label="NARRATIVE"
          title="一条叙事主线"
          desc="从敦煌千年历史，到完整的装饰符号体系，再到六大纹样的独立板块——循序渐进，读懂纹样背后的秩序与精神。"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {spine.map((s, i) => (
            <Reveal key={s.href} delay={i * 80}>
              <Link
                href={s.href}
                className="card-dh group block h-full p-5 text-center"
              >
                <span className="font-serif text-2xl text-jin-deep">{s.n}</span>
                <h3 className="mt-2 font-serif text-lg font-medium text-mo group-hover:text-shiqing-deep">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs text-mo/55">{s.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container-dh">
        <div className="divider-dh">
          <span />
        </div>
      </div>

      {/* 六大纹样矩阵 */}
      <section className="container-dh py-14">
        <SectionHeading
          label="SIX PATTERNS"
          title="六大纹样 · 独立板块"
          desc="每个纹样都是敦煌装饰符号体系的有机组成部分，拥有独立的空间位置、造型语言与文化内涵。"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <PatternCard pattern={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-dh py-16">
        <div className="rounded-3xl bg-mo p-10 text-center text-mibai-light">
          <h2 className="heading-dh text-2xl text-jin-light">文化传承 · 纹样长效传播</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-mibai-light/75">
            不是一次性的文创产品，而是通过可迭代的数字媒介，让敦煌纹样持续融入现代生活。
          </p>
          <Link href="/culture" className="btn-dh mt-6">
            了解传播理念
          </Link>
        </div>
      </section>
    </>
  );
}
