import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { patterns, getPattern, accentHex } from "@/data/patterns";
import ModelViewer from "@/components/ModelViewer";
import LayerRecombine from "@/components/LayerRecombine";
import PatternAnimation from "@/components/PatternAnimation";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getPattern(params.slug);
  return { title: p ? `${p.name} · 敦煌六大核心纹样` : "纹样详情" };
}

export default function PatternDetail({
  params,
}: {
  params: { slug: string };
}) {
  const pattern = getPattern(params.slug);
  if (!pattern) notFound();

  const accent = accentHex[pattern.accent];
  const idx = patterns.findIndex((p) => p.slug === pattern.slug);
  const prev = patterns[(idx - 1 + patterns.length) % patterns.length];
  const next = patterns[(idx + 1) % patterns.length];

  return (
    <div className="pb-10">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${accent}1a, transparent)`,
        }}
      >
        <div className="container-dh py-14">
          <Link
            href="/patterns"
            className="text-sm text-mo/55 transition hover:text-shiqing-deep"
          >
            ← 返回六大纹样
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                className="text-sm font-medium tracking-[0.3em]"
                style={{ color: accent }}
              >
                PATTERN {String(idx + 1).padStart(2, "0")}
              </p>
              <h1
                className="heading-dh mt-1 text-4xl font-medium sm:text-5xl"
                style={{ color: accent }}
              >
                {pattern.name}
              </h1>
              <p className="mt-2 text-base text-mo/70">{pattern.tagline}</p>
            </div>
            <span
              className="rounded-full px-4 py-1.5 text-sm font-medium text-mibai-light"
              style={{ background: accent }}
            >
              内:中:外 = {pattern.ratio}
            </span>
          </div>
        </div>
      </section>

      {/* 3D + 三层重组 */}
      <section className="container-dh py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-[420px] overflow-hidden rounded-3xl border border-jin/30">
              <ModelViewer src={pattern.model} accent={accent} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-jin/30 bg-mibai-light/60 p-7">
              <h2 className="heading-dh text-xl">三层嵌套 · 交互重组</h2>
              <p className="mt-2 text-sm leading-relaxed text-mo/70">
                {pattern.name}遵循“内层核心意象—中层主体图案—外层环绕环饰”的统一构图。
                点击显隐各层，直观理解其结构逻辑。
              </p>
              <div className="mt-6">
                <LayerRecombine layers={pattern.layers} accent={accent} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 差异动画 */}
      <section className="container-dh py-6">
        <Reveal>
          <SectionHeading
            label={`ANIMATION · ${pattern.animationName}`}
            title={`差异动画 · ${pattern.animationName}`}
            desc={pattern.animationLogic}
          />
          <PatternAnimation slug={pattern.slug} accent={accent} />
        </Reveal>
      </section>

      {/* 核心信息 */}
      <section className="container-dh py-10">
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-dh p-6">
              <h3 className="font-serif text-lg font-medium text-shiqing-deep">
                空间位置
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mo/75">
                {pattern.space}
              </p>
            </div>
            <div className="card-dh p-6">
              <h3 className="font-serif text-lg font-medium text-shiqing-deep">
                造型特征
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mo/75">
                {pattern.formFeature}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card-dh mt-6 p-6">
            <h3 className="font-serif text-lg font-medium text-zhusha">
              文化背景
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mo/75">
              {pattern.background}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="card-dh mt-6 h-full p-6">
              <h3 className="font-serif text-lg font-medium text-shiqing-deep">
                3D 建模要点
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mo/75">
                {pattern.modeling}
              </p>
              <p className="mt-3 text-xs text-mo/45">
                三维模型支持拖拽旋转、滚轮缩放；缺失文件时此处显示占位。
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card-dh mt-6 h-full p-6">
              <h3 className="font-serif text-lg font-medium text-zhusha">
                三层比例
              </h3>
              <p className="mt-2 text-sm text-mo/75">
                内 : 中 : 外 ={" "}
                <span className="font-medium" style={{ color: accent }}>
                  {pattern.ratio}
                </span>
              </p>
              <ul className="mt-3 space-y-2 text-sm text-mo/70">
                <li>内层 · {pattern.layers.inner}</li>
                <li>中层 · {pattern.layers.middle}</li>
                <li>外层 · {pattern.layers.outer}</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="card-dh mt-6 p-6">
            <h3 className="font-serif text-lg font-medium text-shiqing-deep">
              美学解析
            </h3>
            <ul className="mt-3 space-y-2">
              {pattern.aesthetic.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-mo/75">
                  <span style={{ color: accent }}>·</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 上一纹样 / 下一纹样 */}
      <section className="container-dh py-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/patterns/${prev.slug}`}
            className="btn-dh-ghost !text-xs"
          >
            ← {prev.name}
          </Link>
          <Link
            href={`/patterns/${next.slug}`}
            className="btn-dh-ghost !text-xs"
          >
            {next.name} →
          </Link>
        </div>
      </section>
    </div>
  );
}
