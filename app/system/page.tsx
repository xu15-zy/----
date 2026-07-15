import { getPattern } from "@/data/patterns";
import LayerRecombine from "@/components/LayerRecombine";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "装饰符号体系 · 三层嵌套与精神内核",
};

const principles = [
  {
    t: "三层嵌套构图",
    d: "全部纹样固定采用“内层核心意象 + 中层主体图案 + 外层环绕环饰”的三层环形嵌套结构，使六大纹样共享相同视觉框架。",
  },
  {
    t: "对称与循环结构",
    d: "纹样多遵循中轴对称或旋转对称，强调稳定与秩序；同时通过连续循环结构实现首尾相接的无限延展，如忍冬连续卷草与三兔共耳闭环。",
  },
  {
    t: "精神内核统一",
    d: "六大纹样共同承载“佛法恒常、慈悲渡世”两大核心精神，串联完整净土与轮回叙事，不存在孤立无关联的花纹。",
  },
];

export default function SystemPage() {
  const demo = getPattern("lianhua")!;
  return (
    <div className="container-dh py-14">
      <Reveal>
        <p className="mb-2 text-sm font-medium tracking-[0.3em] text-zhusha">
          SYMBOL SYSTEM
        </p>
        <h1 className="heading-dh text-3xl sm:text-4xl">装饰符号体系</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-mo/75">
          敦煌石窟佛教装饰符号体系，是莫高窟历经千年营建、融合多元审美形成的标准化全域视觉图案系统。
          其底层规则体现在构图、结构、精神三个层面，六大纹样正是这一体系的有机组成。
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.t} delay={i * 80}>
            <div className="card-dh h-full p-6">
              <span className="font-serif text-sm text-jin-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-xl font-medium text-shiqing-deep">
                {p.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mo/70">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="divider-dh">
        <span />
      </div>

      <Reveal>
        <SectionHeading
          label="RECOMBINE"
          title="三层嵌套 · 交互重组"
          desc="以莲花纹为例，直观感受“内层核心意象—中层主体图案—外层环绕环饰”的嵌套关系，点击显隐各层。"
        />
        <div className="rounded-3xl border border-jin/30 bg-mibai-light/60 p-8">
          <LayerRecombine layers={demo.layers} accent="#b23a2e" />
        </div>
      </Reveal>
    </div>
  );
}
