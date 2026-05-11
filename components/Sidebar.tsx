"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    section: "Overview",
    items: [
      { label: "Introduction", href: "/" },
      { label: "Why CarbonWatcher?", href: "/#why" },
      { label: "Installation", href: "/#install" },
    ],
  },
  {
    section: "Guides",
    items: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "Python API", href: "/docs/python-api" },
      { label: "LLM Tracking", href: "/docs/llm-tracking" },
      { label: "CLI Reference", href: "/docs/cli" },
    ],
  },
  {
    section: "Features",
    items: [
      { label: "Dashboard & Goals", href: "/docs/dashboard" },
      { label: "Team Reports", href: "/docs/team-reports" },
      { label: "Hardware Profiling", href: "/docs/hardware" },
    ],
  },
  {
    section: "Resources",
    items: [
      { label: "PyPI Package", href: "https://pypi.org/project/carbonwatcher/", external: true },
      { label: "GitHub", href: "https://github.com/GhanshyamPaunikar/carbonwatcher", external: true },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-[260px] bg-[#030712] border-r border-gray-800 overflow-y-auto hidden md:block z-40 py-6 px-3">
      {nav.map((group) => (
        <div key={group.section} className="mb-6">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            {group.section}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  {"external" in item && item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      {item.label}
                      <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-1.5 rounded-md text-sm transition-colors ${
                        active
                          ? "bg-green-500/10 text-green-400 font-medium"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      {active && <span className="w-1 h-1 rounded-full bg-green-400 mr-2" />}
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="mt-8 mx-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <p className="text-xs text-green-400 font-medium mb-1">v0.3.0 — Latest</p>
        <p className="text-xs text-gray-500">pip install carbonwatcher</p>
      </div>
    </aside>
  );
}
