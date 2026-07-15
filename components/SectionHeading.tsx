import type { ReactNode } from "react";

export default function SectionHeading({
  label,
  title,
  desc,
}: {
  label?: string;
  title: string;
  desc?: ReactNode;
}) {
  return (
    <div className="mb-8 text-center">
      {label && (
        <p className="mb-2 text-sm font-medium tracking-[0.3em] text-zhusha">
          {label}
        </p>
      )}
      <h2 className="heading-dh text-2xl sm:text-3xl">{title}</h2>
      {desc && (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-mo/70">
          {desc}
        </p>
      )}
    </div>
  );
}
