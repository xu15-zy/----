"use client";

import { useState, useRef, useEffect } from "react";
import { patterns, accentHex } from "@/data/patterns";
import ModelViewer from "@/components/ModelViewer";
import PatternAnimation from "@/components/PatternAnimation";
import Reveal from "@/components/Reveal";

/* ─────────── 数据 ─────────── */
const team = [
  {
    name: "徐志颖",
    id: "2300150090",
    role: "网站搭建部署 · 设计报告撰写 · TouchDesigner手势控制",
  },
  {
    name: "王嘉欣",
    id: "2300150118",
    role: "模型制作 · 动画制作 · AR制作 · 设计手册制作",
  },
];

const muralImages = [
  { src: "/images/murals/rendong.jpg", label: "北周第290窟佛龛忍冬纹" },
  { src: "/images/murals/lianhua.jpg", label: "莲花藻井古代壁画真迹" },
  { src: "/images/murals/yun.jpg", label: "飞天壁画中的祥云纹·莫高窟第428窟" },
  { src: "/images/murals/shuibo.jpg", label: "西方净土变中的八功德水莲池·莫高窟第217窟" },
  { src: "/images/murals/qianfo.jpg", label: "莫高窟第263窟千佛壁画局部" },
  { src: "/images/murals/santu.jpg", label: "莫高窟第407窟三兔共耳藻井" },
];

const svgImages = [
  { src: "/images/svg/rendong.svg", name: "忍冬纹" },
  { src: "/images/svg/lianhua.svg", name: "莲花纹" },
  { src: "/images/svg/yun.svg", name: "云纹" },
  { src: "/images/svg/shuibo.svg", name: "八功德水波纹" },
  { src: "/images/svg/qianfo.svg", name: "千佛点阵纹" },
  { src: "/images/svg/santu.svg", name: "三兔共耳藻井纹" },
];

const renderImages = [
  { src: "/images/render/rendong.png", name: "忍冬纹" },
  { src: "/images/render/lianhua.png", name: "莲花纹" },
  { src: "/images/render/yun.png", name: "云纹" },
  { src: "/images/render/shuibo.png", name: "八功德水波纹" },
  { src: "/images/render/qianfo.png", name: "千佛点阵纹" },
  { src: "/images/render/santu.png", name: "三兔共耳藻井纹" },
];

const arCards = [
  { src: "/images/ar-cards/rendong.png", name: "忍冬纹" },
  { src: "/images/ar-cards/lianhua.png", name: "莲花纹" },
  { src: "/images/ar-cards/yun.png", name: "云纹" },
  { src: "/images/ar-cards/shuibo.png", name: "八功德水波纹" },
  { src: "/images/ar-cards/qianfo.png", name: "千佛点阵纹" },
  { src: "/images/ar-cards/santu.png", name: "三兔共耳藻井纹" },
];

/* ─────────── 导航 ─────────── */
const navItems = [
  { id: "hero", label: "首页" },
  { id: "team", label: "组员" },
  { id: "dunhuang", label: "敦煌背景" },
  { id: "patterns-intro", label: "六大纹样" },
  { id: "reconstruction", label: "数字化重构" },
  { id: "pattern-detail", label: "纹样展示" },
  { id: "ar", label: "AR卡片" },
  { id: "animation", label: "动效展示" },
  { id: "gesture", label: "手势交互" },
];

function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const winH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(winH > 0 ? (window.scrollY / winH) * 100 : 0);
      const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i]!;
        if (s.getBoundingClientRect().top <= 120) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-[#c8a45c] to-[#b23a2e] transition-[width] duration-100"
      style={{ width: `${scrollProgress}%` }}
    />
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#c8a45c]/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <span className="font-serif text-base font-medium text-[#c8a45c]">
          敦煌纹样·数字重生
        </span>
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => scrollTo(n.id)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  active === n.id
                    ? "bg-[#c8a45c]/15 text-[#c8a45c]"
                    : "text-[#f5e6d0]/60 hover:text-[#c8a45c]"
                }`}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    </>
  );
}

/* ─────────── 主页 ─────────── */
export default function HomePage() {
  const [activePattern, setActivePattern] = useState(0);
  const pattern = patterns[activePattern];
  const accent = accentHex[pattern.accent];

  return (
    <>
      <Nav />

      {/* ═══════ 01 Hero ═══════ */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#1a1410] to-[#0a0a0a]"
      >
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a45c]/10 blur-[120px]" />
        </div>
        <Reveal>
          <p className="mb-4 text-sm font-medium tracking-[0.5em] text-[#c8a45c]/70">
            敦煌 · 佛教装饰符号体系
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-serif text-5xl font-medium tracking-wide text-[#f5e6d0] sm:text-7xl">
            敦煌纹样
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="mt-2 font-serif text-2xl font-medium tracking-wide text-[#c8a45c] sm:text-3xl">
            数字重生
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-6 max-w-xl text-center text-base leading-relaxed text-[#f5e6d0]/60">
            六大核心纹样的数字化交互设计
            <br />
            忍冬纹 · 莲花纹 · 云纹 · 八功德水波纹 · 千佛点阵纹 · 三兔共耳藻井纹
          </p>
        </Reveal>
        <Reveal delay={400}>
          <button
            onClick={() =>
              document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-10 rounded-full border border-[#c8a45c]/40 px-8 py-3 text-sm text-[#c8a45c] transition hover:bg-[#c8a45c]/10"
          >
            向下探索 ↓
          </button>
        </Reveal>
      </section>

      {/* ═══════ 02 组员信息 ═══════ */}
      <section id="team" className="bg-[#0f0e0c] py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
              TEAM
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
              设计团队
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="rounded-2xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c8a45c]/10 font-serif text-xl text-[#c8a45c]">
                      {t.name[0]}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#f5e6d0]">
                        {t.name}
                      </h3>
                      <p className="text-xs text-[#f5e6d0]/40">学号：{t.id}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#f5e6d0]/60">
                    {t.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-8 rounded-2xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-6">
              <p className="text-sm text-[#f5e6d0]/50">
                <span className="text-[#c8a45c]">项目：</span>
                基于《设计美学》课程 · 工业设计专业
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ 03 敦煌背景 ═══════ */}
      <section id="dunhuang" className="bg-[#0a0a0a] py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
              DUNHUANG
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
              敦煌莫高窟
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f5e6d0]/60">
              敦煌莫高窟始建于前秦建元二年（366年），历经十六国、北朝、隋、唐、五代、西夏、元等朝代持续营建千余年，
              现存735座洞窟、4.5万平方米壁画、两千余身彩塑，是世界现存规模最大、延续时间最长、内容最丰富的佛教艺术宝库。
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { k: "始建", v: "366年" },
              { k: "历时", v: "千余年" },
              { k: "洞窟", v: "735座" },
              { k: "壁画", v: "4.5万㎡" },
              { k: "彩塑", v: "2000余身" },
            ].map((f, i) => (
              <Reveal key={f.k} delay={i * 60}>
                <div className="rounded-xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-4 text-center">
                  <p className="text-xs text-[#f5e6d0]/40">{f.k}</p>
                  <p className="mt-1 font-serif text-lg font-medium text-[#c8a45c]">
                    {f.v}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[#f5e6d0]/50">
              敦煌艺术融合古印度犍陀罗佛教造型、中亚草原几何审美与中原儒道传统美学，形成独有的本土化佛教视觉语言。
              石窟整体依照完整礼佛空间布局，从窟顶藻井、佛龛、造像背光到净土经变、四壁墙面，全部搭配标准化配套装饰图案，
              构建出一套覆盖洞窟全域、等级清晰、逻辑严密的装饰符号体系。
            </p>
          </Reveal>

          {/* 壁画真迹 */}
          <Reveal>
            <h3 className="mt-14 mb-6 font-serif text-xl font-medium text-[#c8a45c]">
              壁画真迹
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {muralImages.map((m, i) => (
              <Reveal key={m.src} delay={i * 60}>
                <div className="group overflow-hidden rounded-xl border border-[#c8a45c]/20">
                  <div className="aspect-[4/3] overflow-hidden bg-[#1a1410]">
                    <img
                      src={m.src}
                      alt={m.label}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="p-3 text-center text-xs text-[#f5e6d0]/50">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 04 纹样体系 + 六大纹样引入 ═══════ */}
      <section id="patterns-intro" className="bg-[#0f0e0c] py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
              SYMBOL SYSTEM
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
              装饰符号体系 · 六大核心纹样
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f5e6d0]/60">
              在该体系中，六大纹样贯穿所有洞窟，分别对应窟顶藻井、佛龛边饰、造像基座、净土经变、四壁墙面与全域过渡六大空间位置，
              完整承载整套体系的造型规则、空间逻辑与精神内涵。
            </p>
          </Reveal>

          {/* 三层嵌套说明 */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "三层嵌套构图",
                d: '全部纹样固定采用"内层核心意象+中层主体图案+外层环绕环饰"的三层环形嵌套结构。',
              },
              {
                t: "对称与循环结构",
                d: "纹样多遵循中轴对称或旋转对称，同时通过连续循环结构实现首尾相接的无限延展。",
              },
              {
                t: "精神内核统一",
                d: '六大纹样共同承载"佛法恒常、慈悲渡世"两大核心精神，串联完整净土与轮回叙事。',
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 80}>
                <div className="rounded-2xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-6">
                  <span className="font-serif text-sm text-[#c8a45c]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-medium text-[#f5e6d0]">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#f5e6d0]/55">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 六纹样卡片 */}
          <Reveal>
            <h3 className="mt-14 mb-6 font-serif text-xl font-medium text-[#c8a45c]">
              六大核心纹样
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {patterns.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <button
                  onClick={() => {
                    setActivePattern(i);
                    document
                      .getElementById("pattern-detail")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group w-full rounded-2xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-5 text-left transition hover:-translate-y-1 hover:border-[#c8a45c]/40 hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-[#0a0a0a]">
                    <img
                      src={`/images/render/${p.slug}.png`}
                      alt={p.name}
                      className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-3 font-serif text-base font-medium text-[#f5e6d0]">
                    {p.name}
                  </h4>
                  <p className="mt-1 text-xs text-[#f5e6d0]/40">{p.tagline}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 05 数字化重构总览 ═══════ */}
      <section id="reconstruction" className="bg-[#0a0a0a] py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
              DIGITAL RECONSTRUCTION
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
              数字化重构
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f5e6d0]/60">
              以原始壁画为底图，通过矢量描摹与参数化调整，将千年纹样转化为精确的数字化矢量图形。
              保留核心识别特征，统一线条语言，建立参数化结构，为后续三维建模与交互设计奠定基础。
            </p>
          </Reveal>

          {/* SVG线稿 */}
          <Reveal>
            <h3 className="mt-10 mb-6 font-serif text-lg font-medium text-[#c8a45c]">
              线稿重构
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {svgImages.map((s, i) => (
              <Reveal key={s.src} delay={i * 60}>
                <div className="rounded-xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-4">
                  <div className="aspect-square overflow-hidden rounded-lg bg-[#0a0a0a]">
                    <img
                      src={s.src}
                      alt={s.name}
                      className="h-full w-full object-contain p-3"
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-[#f5e6d0]/50">
                    {s.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 渲染效果图 */}
          <Reveal>
            <h3 className="mt-10 mb-6 font-serif text-lg font-medium text-[#c8a45c]">
              渲染效果图
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {renderImages.map((r, i) => (
              <Reveal key={r.src} delay={i * 60}>
                <div className="rounded-xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-4">
                  <div className="aspect-square overflow-hidden rounded-lg bg-[#0a0a0a]">
                    <img
                      src={r.src}
                      alt={r.name}
                      className="h-full w-full object-contain p-3"
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-[#f5e6d0]/50">
                    {r.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 06 六大纹样逐一展示 ═══════ */}
      <section id="pattern-detail" className="bg-[#0f0e0c] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
              PATTERN SHOWCASE
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
              纹样展示
            </h2>
          </Reveal>

          {/* 纹样切换标签 */}
          <div className="mt-8 flex flex-wrap gap-2">
            {patterns.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => setActivePattern(i)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activePattern === i
                    ? "bg-[#c8a45c] text-[#0a0a0a]"
                    : "border border-[#c8a45c]/30 text-[#f5e6d0]/60 hover:border-[#c8a45c]/60"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* 纹样详情 — 左3D模型 右介绍 交替 */}
          <div className="mt-10">
            <div
              className={`grid gap-8 lg:grid-cols-2 ${
                activePattern % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* 3D模型 */}
              <Reveal>
                <div
                  className="h-[420px] overflow-hidden rounded-2xl border"
                  style={{ borderColor: `${accent}40` }}
                >
                  <ModelViewer src={pattern.model} accent={accent} />
                </div>
              </Reveal>

              {/* 介绍 */}
              <Reveal delay={100}>
                <div className="flex flex-col justify-center">
                  <p
                    className="text-sm font-medium tracking-[0.3em]"
                    style={{ color: accent }}
                  >
                    PATTERN {String(activePattern + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-2 font-serif text-4xl font-medium"
                    style={{ color: accent }}
                  >
                    {pattern.name}
                  </h3>
                  <p className="mt-2 text-base text-[#f5e6d0]/60">
                    {pattern.tagline}
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#c8a45c]">
                        空间位置
                      </h4>
                      <p className="mt-1 text-sm text-[#f5e6d0]/55">
                        {pattern.space}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#c8a45c]">
                        文化寓意
                      </h4>
                      <p className="mt-1 text-sm text-[#f5e6d0]/55">
                        {pattern.meaning}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#c8a45c]">
                        文化背景
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[#f5e6d0]/55">
                        {pattern.background}
                      </p>
                    </div>
                  </div>

                  {/* 三层结构 */}
                  <div className="mt-6 rounded-xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-4">
                    <p className="text-xs font-medium text-[#c8a45c]">
                      三层嵌套 · 内:中:外 = {pattern.ratio}
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-[#f5e6d0]/55">
                      <p>
                        <span style={{ color: accent }}>内层：</span>
                        {pattern.layers.inner}
                      </p>
                      <p>
                        <span style={{ color: accent }}>中层：</span>
                        {pattern.layers.middle}
                      </p>
                      <p>
                        <span style={{ color: accent }}>外层：</span>
                        {pattern.layers.outer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 07 AR卡片展示 ═══════ */}
      <section id="ar" className="bg-[#0a0a0a] py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
              AR CARDS
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
              AR互动卡片
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f5e6d0]/60">
              六张AR卡片，手机扫描即可触发动态三维纹样展示。
              卡片采用黑金视觉框架，纹样以渐变科技感呈现，集文化传承与现代交互于一体。
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {arCards.map((c, i) => (
              <Reveal key={c.src} delay={i * 60}>
                <div className="group overflow-hidden rounded-xl border border-[#c8a45c]/20 transition hover:-translate-y-1 hover:border-[#c8a45c]/40 hover:shadow-lg">
                  <div className="aspect-[3/4] overflow-hidden bg-[#1a1410]">
                    <img
                      src={c.src}
                      alt={c.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="p-3 text-center text-xs text-[#f5e6d0]/50">
                    {c.name} AR卡片
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* AR动效视频 */}
          <Reveal>
            <h3 className="mt-14 mb-6 font-serif text-lg font-medium text-[#c8a45c]">
              AR动效演示
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {patterns.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <div className="overflow-hidden rounded-xl border border-[#c8a45c]/20">
                  <video
                    src={`/videos/ar/${p.slug}.mp4`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="aspect-video w-full bg-[#0a0a0a] object-cover"
                  />
                  <p className="p-3 text-center text-xs text-[#f5e6d0]/50">
                    {p.name} AR动效
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 08 动效展示 ═══════ */}
      <section id="animation" className="bg-[#0f0e0c] py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
              ANIMATION
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
              差异化动效
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f5e6d0]/60">
              为每个纹样设计差异化的动画逻辑，使动态表达与纹样寓意紧密呼应。
              动画在Blender中完成制作，通过关键帧与程序化动画实现。
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <div className="overflow-hidden rounded-xl border border-[#c8a45c]/20">
                  <video
                    src={`/videos/animation/${p.slug}.mp4`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="aspect-video w-full bg-[#0a0a0a] object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-serif text-base font-medium text-[#f5e6d0]">
                      {p.name} · {p.animationName}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#f5e6d0]/50">
                      {p.animationLogic}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 09 手势交互 ═══════ */}
      <GestureSection />

      {/* ═══════ Footer ═══════ */}
      <footer className="border-t border-[#c8a45c]/20 bg-[#0a0a0a] py-12">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <p className="font-serif text-lg text-[#c8a45c]">
            敦煌纹样 · 数字重生
          </p>
          <p className="mt-3 text-sm text-[#f5e6d0]/40">
            基于《设计美学》课程设计报告 · 工业设计专业
          </p>
          <p className="mt-2 text-xs text-[#f5e6d0]/25">
            © {new Date().getFullYear()} 徐志颖 · 王嘉欣
          </p>
        </div>
      </footer>
    </>
  );
}

/* ─────────── 手势交互组件 ─────────── */
function GestureSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gestureActive, setGestureActive] = useState(false);
  const [currentGesture, setCurrentGesture] = useState("等待识别...");
  const [currentPatternIdx, setCurrentPatternIdx] = useState(0);

  const startGesture = async () => {
    setGestureActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      // MediaPipe手势识别将在后续集成
      setCurrentGesture("摄像头已启动 — MediaPipe手势识别模块加载中...");
    } catch {
      setCurrentGesture("摄像头权限被拒绝");
      setGestureActive(false);
    }
  };

  const stopGesture = () => {
    setGestureActive(false);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setCurrentGesture("等待识别...");
  };

  return (
    <section id="gesture" className="bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <p className="mb-2 text-sm font-medium tracking-[0.3em] text-[#c8a45c]/60">
            GESTURE INTERACTION
          </p>
          <h2 className="font-serif text-3xl font-medium text-[#f5e6d0]">
            手势交互
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#f5e6d0]/60">
            通过MediaPipe实现实时手势识别，拇指与食指控制纹样动画的播放、位置与切换。
            张合控制大小与播放，移动控制位置，旋转切换不同纹样。
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#c8a45c]/20 bg-[#1a1410]/60 p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 摄像头 */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0a0a0a]">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  playsInline
                  muted
                  style={{ display: gestureActive ? "block" : "none" }}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full"
                  style={{ display: gestureActive ? "block" : "none" }}
                />
                {!gestureActive && (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-[#c8a45c]/40" />
                    <p className="text-sm text-[#f5e6d0]/40">
                      点击启动手势识别
                    </p>
                  </div>
                )}
              </div>

              {/* 控制区 */}
              <div className="flex flex-col justify-center">
                <div className="rounded-xl border border-[#c8a45c]/20 bg-[#0a0a0a] p-4">
                  <p className="text-xs text-[#f5e6d0]/40">手势状态</p>
                  <p className="mt-1 font-serif text-lg text-[#c8a45c]">
                    {currentGesture}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-[#c8a45c]/20 bg-[#0a0a0a] p-4">
                  <p className="text-xs text-[#f5e6d0]/40">当前纹样</p>
                  <p className="mt-1 font-serif text-lg text-[#f5e6d0]">
                    {patterns[currentPatternIdx].name}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-[#f5e6d0]/50">
                  <div className="rounded-lg border border-[#c8a45c]/15 p-3">
                    <p className="text-[#c8a45c]">张合</p>
                    <p className="mt-1">大小+播放</p>
                  </div>
                  <div className="rounded-lg border border-[#c8a45c]/15 p-3">
                    <p className="text-[#c8a45c]">移动</p>
                    <p className="mt-1">位置控制</p>
                  </div>
                  <div className="rounded-lg border border-[#c8a45c]/15 p-3">
                    <p className="text-[#c8a45c]">旋转</p>
                    <p className="mt-1">切换纹样</p>
                  </div>
                </div>

                <button
                  onClick={gestureActive ? stopGesture : startGesture}
                  className={`mt-6 rounded-full px-6 py-3 text-sm font-medium transition ${
                    gestureActive
                      ? "border border-red-500/50 text-red-400 hover:bg-red-500/10"
                      : "bg-[#c8a45c] text-[#0a0a0a] hover:bg-[#c8a45c]/80"
                  }`}
                >
                  {gestureActive ? "停止识别" : "启动手势识别"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
