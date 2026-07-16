import type { ReactNode } from "react";

/**
 * 纯展示型包裹组件：仅渲染带 .reveal 类的容器。
 * 实际的滚动揭示逻辑由 app/layout.tsx 中的原生脚本统一处理，
 * 不依赖 React hydration，避免部署环境下因 JS 水合失败导致内容永久不可见。
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
