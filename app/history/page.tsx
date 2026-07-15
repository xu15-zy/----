import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "敦煌历史 · 千年营建与文明交融",
};

const facts = [
  { k: "始建", v: "前秦建元二年（366 年）" },
  { k: "历时", v: "十六国至元，千余年" },
  { k: "洞窟", v: "现存 735 座" },
  { k: "壁画", v: "4.5 万平方米" },
  { k: "彩塑", v: "两千余身" },
];

const pains = [
  "文化消费一次性，热度生命周期短暂",
  "纹样开发碎片化，文化体系被割裂",
  "展示形式静态单向，用户缺乏深度参与",
  "线上线下传播割裂，文化难以融入日常",
];

export default function HistoryPage() {
  return (
    <div className="container-dh py-14">
      <Reveal>
        <p className="mb-2 text-sm font-medium tracking-[0.3em] text-zhusha">
          DUNHUANG HISTORY
        </p>
        <h1 className="heading-dh text-3xl sm:text-4xl">敦煌历史</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-mo/75">
          敦煌莫高窟历经千年营建，构建了覆盖洞窟全部空间的标准化佛教装饰符号体系。
          忍冬纹、莲花纹、云纹、八功德水波纹、千佛点阵纹、三兔共耳藻井纹六大核心纹样贯穿其中，
          形成完整的空间叙事系统，是研究中国传统装饰美学的最佳样本。
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {facts.map((f, i) => (
          <Reveal key={f.k} delay={i * 60}>
            <div className="card-dh p-4 text-center">
              <p className="text-xs text-mo/55">{f.k}</p>
              <p className="mt-1 font-serif text-sm font-medium text-shiqing-deep">
                {f.v}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="divider-dh">
        <span />
      </div>

      <Reveal>
        <SectionHeading
          label="CIVILIZATION"
          title="多元文明的视觉融合"
          desc="敦煌艺术融合古印度犍陀罗佛教造型、中亚草原几何审美与中原儒道传统美学，形成独有的本土化佛教视觉语言。"
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { t: "古印度", d: "犍陀罗佛教造型与莲花造像传统" },
            { t: "中亚草原", d: "几何审美与连续卷草的韵律" },
            { t: "中原儒道", d: "宝相花、云气纹与秩序化构图" },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 80}>
              <div className="card-dh h-full p-5">
                <h3 className="font-serif text-lg font-medium text-zhusha">
                  {x.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mo/70">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <div className="divider-dh">
        <span />
      </div>

      <Reveal>
        <SectionHeading
          label="PAIN POINTS"
          title="行业痛点"
          desc="现有传统文化数字化传播普遍存在的四大核心问题，正是本设计试图回应与解决的。"
        />
        <ul className="mx-auto max-w-2xl space-y-3">
          {pains.map((p, i) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl border border-jin/30 bg-mibai-light/60 p-4"
            >
              <span className="mt-0.5 font-serif text-lg text-zhusha">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-mo/75">{p}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
