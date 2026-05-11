"use client";
import Link from "next/link";
import { useState } from "react";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#030712]/90 backdrop-blur border-b border-gray-800 flex items-center px-4 gap-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg shrink-0">
        <span className="w-7 h-7 rounded-md bg-green-500 flex items-center justify-center text-black text-xs font-black">CW</span>
        CarbonWatcher
      </Link>

      <div className="hidden md:flex items-center gap-1 ml-4 text-sm">
        <Link href="/docs/getting-started" className="px-3 py-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">Docs</Link>
        <a href="https://pypi.org/project/carbonwatcher/" target="_blank" rel="noopener" className="px-3 py-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">PyPI</a>
        <a href="https://github.com/GhanshyamPaunikar/carbonwatcher" target="_blank" rel="noopener" className="px-3 py-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">GitHub</a>
      </div>

      <div className="flex-1" />

      <a
        href="https://github.com/GhanshyamPaunikar/carbonwatcher"
        target="_blank"
        rel="noopener"
        className="hidden md:flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        Star on GitHub
      </a>

      <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </header>
  );
}
