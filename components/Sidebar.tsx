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
    <aside className="sidebar">
      <div className="sidebar-inner">
        {nav.map((group) => (
          <div key={group.section} className="nav-group">
            <div className="nav-section-label">{group.section}</div>
            <ul>
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    {"external" in item && item.external ? (
                      <a href={item.href} target="_blank" rel="noopener" className="nav-link">
                        {item.label}
                        <svg className="nav-external-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link href={item.href} className={active ? "nav-link nav-link-active" : "nav-link"}>
                        {active && <span className="nav-active-dot" />}
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="nav-version-badge">
          <p className="nav-version-label">v0.3.0 — Latest</p>
          <p className="nav-version-cmd">pip install carbonwatcher</p>
        </div>
      </div>
    </aside>
  );
}
