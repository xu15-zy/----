import { patterns } from "@/data/patterns";
import PatternCard from "@/components/PatternCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "六大纹样 · 独立板块总览",
};

export default function PatternsPage() {
  return (
    <div className="container-dh py-14">
      <Reveal>
        <p className="mb-2 text-sm font-medium tracking-[0.3em] text-zhusha">
          SIX PATTERNS
        </p>
        <h1 className="heading-dh text-3xl sm:text-4xl">六大纹样</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-mo/75">
          六大核心纹样贯穿所有洞窟，分别对应窟顶、佛龛、造像、经变、墙面与全域过渡六大空间位置，
          完整承载整套体系的造型规则、空间逻辑与精神内涵。点击进入每个纹样的独立板块。
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60}>
            <PatternCard pattern={p} />
          </Reveal>
        ))}
      </div>

      <div className="divider-dh">
        <span />
      </div>

      <Reveal>
        <SectionHeading
          label="ONE SYSTEM"
          title="不是一个，而是一套"
          desc="六大纹样在空间层级、构图范式与精神内核三个维度高度统一，共同组成完整的敦煌佛教装饰符号体系。"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "空间层级统一", d: "窟顶至四壁分工明确，组合成完整洞窟礼佛空间" },
            { t: "构图范式统一", d: "全部纹样采用统一的三层环形嵌套结构" },
            { t: "精神内核统一", d: "共同指向“恒常不灭 · 慈悲渡世”" },
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
    </div>
  );
}
