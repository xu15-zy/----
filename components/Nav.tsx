"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "首页" },
  { href: "/history", label: "敦煌历史" },
  { href: "/system", label: "装饰符号体系" },
  { href: "/patterns", label: "六大纹样" },
  { href: "/culture", label: "文化传承" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-jin/30 bg-mibai/85 backdrop-blur">
      <nav className="container-dh flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-lg font-medium tracking-wide text-zhusha">
          敦煌纹样<span className="text-mo"> · 六大核心</span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    active
                      ? "bg-shiqing/10 text-shiqing-deep"
                      : "text-mo/70 hover:text-shiqing-deep"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/patterns" className="btn-dh hidden md:inline-flex">
          进入纹样
        </Link>
      </nav>
    </header>
  );
}
