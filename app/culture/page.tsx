import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "文化传承 · 纹样长效传播",
};

const chain = [
  "传统纹样",
  "Blender 数字重构",
  "差异化动画输出",
  "TouchDesigner 手势调用",
  "AR 卡片体验",
  "专题网站传播",
  "线上线下融合",
  "传统文化活化",
];

const scenes = [
  { n: "01", t: "高校课程", d: "数字纹样教材、Blender 建模实训、TouchDesigner 交互教学", u: "设计专业师生" },
  { n: "02", t: "数字展览", d: "沉浸式交互装置、动画投影", u: "公众观展群体" },
  { n: "03", t: "博物馆", d: "AR 卡片辅助讲解、纹样数字展柜、互动大屏", u: "博物馆参观者" },
  { n: "04", t: "数字文旅", d: "敦煌数字洞窟、文旅 APP 纹样主题模块", u: "旅游消费者" },
  { n: "05", t: "互动装置", d: "体感交互装置、灯光装置", u: "城市公共人群" },
  { n: "06", t: "数字文创", d: "动态壁纸、数字藏品、动画表情包", u: "年轻消费群体" },
  { n: "07", t: "公共艺术", d: "城市公共空间纹样投影、数字壁画", u: "城市居民" },
  { n: "08", t: "新媒体传播", d: "短视频、社交媒体内容、线上专题", u: "互联网用户" },
];

const future = [
  "完善纹样数据库（魏晋至西夏各时期风格）",
  "网页端手势交互、纹样自定义搭配、知识问答",
  "引入 AI 生成符合敦煌美学的纹样",
  "建立用户共创平台，专业设计 + 大众共创",
  "丰富多模态交互（语音、眼球追踪、VR）",
  "建立季度更新机制，持续运营长效传播",
];

export default function CulturePage() {
  return (
    <div className="container-dh py-14">
      <Reveal>
        <p className="mb-2 text-sm font-medium tracking-[0.3em] text-zhusha">
          CULTURAL HERITAGE
        </p>
        <h1 className="heading-dh text-3xl sm:text-4xl">文化传承 · 纹样长效传播</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-mo/75">
          本设计的核心价值，不是制作一次性文创产品，而是通过可迭代的数字媒介，
          将敦煌纹样由静态文化遗产转化为能够持续更新、持续传播、持续互动的数字文化内容。
        </p>
      </Reveal>

      {/* 传播链路 */}
      <div className="mt-10">
        <SectionHeading label="CHAIN" title="一条完整传播链路" />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {chain.map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              <span className="rounded-full border border-jin/50 bg-mibai-light/70 px-3 py-1.5 text-sm text-shiqing-deep">
                {c}
              </span>
              {i < chain.length - 1 && <span className="text-jin">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="divider-dh">
        <span />
      </div>

      {/* 八大场景 */}
      <Reveal>
        <SectionHeading
          label="SCENARIOS"
          title="八大应用场景"
          desc="覆盖教育、展览、文旅、文创、公共艺术与新媒体传播，形成从专业教学到大众传播的完整应用矩阵。"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {scenes.map((s, i) => (
            <Reveal key={s.n} delay={i * 50}>
              <div className="card-dh h-full p-5">
                <span className="font-serif text-sm text-jin-deep">{s.n}</span>
                <h3 className="mt-1 font-serif text-lg font-medium text-mo">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mo/70">{s.d}</p>
                <p className="mt-3 text-xs text-shiqing-deep">{s.u}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <div className="divider-dh">
        <span />
      </div>

      {/* 未来展望 */}
      <Reveal>
        <SectionHeading
          label="OUTLOOK"
          title="面向可持续传播的未来"
          desc="从一次性的课程作业，进化为可持续运营的数字文化平台。"
        />
        <ul className="mx-auto max-w-2xl space-y-3">
          {future.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-jin/30 bg-mibai-light/60 p-4"
            >
              <span className="mt-0.5 font-serif text-zhusha">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-mo/75">{f}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
