import Link from "next/link";
import type { Pattern, Accent } from "@/data/patterns";

const accentMap: Record<
  Accent,
  { text: string; border: string; bg: string; dot: string }
> = {
  shiqing: {
    text: "text-shiqing-deep",
    border: "border-shiqing/40",
    bg: "bg-shiqing/5",
    dot: "bg-shiqing",
  },
  zheshi: {
    text: "text-zheshi-deep",
    border: "border-zheshi/40",
    bg: "bg-zheshi/5",
    dot: "bg-zheshi",
  },
  zhusha: {
    text: "text-zhusha-deep",
    border: "border-zhusha/40",
    bg: "bg-zhusha/5",
    dot: "bg-zhusha",
  },
  jin: {
    text: "text-jin-deep",
    border: "border-jin/40",
    bg: "bg-jin/5",
    dot: "bg-jin",
  },
};

export default function PatternCard({ pattern }: { pattern: Pattern }) {
  const a = accentMap[pattern.accent];
  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className={`card-dh group block overflow-hidden border ${a.border}`}
    >
      <div className={`h-1.5 w-full ${a.dot}`} />
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <h3 className={`font-serif text-xl font-medium ${a.text}`}>
            {pattern.name}
          </h3>
          <span className="text-xs text-mo/40">{pattern.ratio}</span>
        </div>
        <p className="mt-1 text-sm text-mo/60">{pattern.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mo/70">
          {pattern.meaning}。{pattern.formFeature}。
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-shiqing-deep opacity-0 transition group-hover:opacity-100">
          查看详情 →
        </span>
      </div>
    </Link>
  );
}
