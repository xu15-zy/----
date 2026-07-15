"use client";

function Motif({ slug, accent }: { slug: string; accent: string }) {
  switch (slug) {
    case "rendong":
      return (
        <svg viewBox="0 0 200 120" className="h-40">
          <path
            d="M10 100 C 40 40, 70 40, 90 80 S 140 120, 170 60"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            className="dh-grow"
          />
          <path
            d="M90 80 q 10 -20 25 -10"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            className="dh-grow"
            style={{ animationDelay: "0.4s" }}
          />
        </svg>
      );
    case "lianhua":
      return (
        <svg viewBox="0 0 200 200" className="h-44">
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="22"
              ry="54"
              fill={accent}
              opacity="0.8"
              style={{
                transformOrigin: "100px 100px",
                transform: `rotate(${deg}deg)`,
                animation: "dh-bloom 2.4s ease-out both",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
          <circle cx="100" cy="100" r="16" fill="#c9a227" />
        </svg>
      );
    case "yun":
      return (
        <svg viewBox="0 0 240 120" className="h-32">
          <g className="dh-drift" style={{ transformOrigin: "center" }}>
            <path
              d="M40 70 q 20 -30 50 -10 q 20 -25 50 0 q 25 -10 40 15 q -20 20 -60 12 q -40 8 -80 -17 Z"
              fill={accent}
              opacity="0.85"
            />
          </g>
        </svg>
      );
    case "shuibo":
      return (
        <svg viewBox="0 0 200 200" className="h-44">
          {[0, 0.6, 1.2, 1.8].map((d, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={accent}
              strokeWidth="3"
              style={{
                transformOrigin: "100px 100px",
                animation: "dh-ripple 3s ease-out infinite",
                animationDelay: `${d}s`,
              }}
            />
          ))}
          <circle cx="100" cy="100" r="10" fill="#c9a227" />
        </svg>
      );
    case "qianfo":
      return (
        <svg viewBox="0 0 200 200" className="h-44">
          {Array.from({ length: 36 }).map((_, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            return (
              <circle
                key={i}
                cx={40 + col * 24}
                cy={40 + row * 24}
                r="6"
                fill={accent}
                style={{
                  animation: "dh-dot 2.4s ease-in-out infinite",
                  animationDelay: `${(col + row) * 0.12}s`,
                }}
              />
            );
          })}
        </svg>
      );
    case "santu":
      return (
        <svg viewBox="0 0 200 200" className="h-44">
          <g className="dh-orbit" style={{ transformOrigin: "100px 100px" }}>
            {[0, 120, 240].map((deg, i) => (
              <g
                key={i}
                style={{
                  transform: `rotate(${deg}deg)`,
                  transformOrigin: "100px 100px",
                }}
              >
                <circle cx="100" cy="45" r="16" fill={accent} />
                <circle cx="84" cy="58" r="5" fill="#2b2620" />
                <circle cx="116" cy="58" r="5" fill="#2b2620" />
              </g>
            ))}
          </g>
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="#c9a227"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
        </svg>
      );
    default:
      return <div className="text-sm text-mo/50">动画占位</div>;
  }
}

export default function PatternAnimation({
  slug,
  accent = "#9c5b3b",
}: {
  slug: string;
  accent?: string;
}) {
  return (
    <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-mibai-deep/40">
      <Motif slug={slug} accent={accent} />
      <span className="absolute bottom-2 right-3 text-[11px] text-mo/40">
        差异动画占位（待替换 MP4）
      </span>
    </div>
  );
}
