import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

const installCode = `pip install carbonwatcher

# With LLM provider support
pip install "carbonwatcher[anthropic]"   # Anthropic API
pip install "carbonwatcher[openai]"      # OpenAI API
pip install "carbonwatcher[all]"         # Everything`;

const quickCode = `from carbonwatcher import CarbonTracker

with CarbonTracker(experiment_name="resnet50", model_name="ResNet50") as ct:
    train()

# Run:        a3f2c1b8
# Energy:     3.12 Wh  (CPU: 2.84  GPU: 0.22  DRAM: 0.06)  PUE×1.10
# Carbon:     2.209 gCO2e  @ eu-west-1 (88 gCO2/kWh)
# Cost:       $0.0312 USD`;

const epochCode = `tracker = CarbonTracker(epochs=100, monitor_epochs=2)
for epoch in range(100):
    tracker.epoch_start()
    train_one_epoch()
    tracker.epoch_end()   # predicts full-run carbon after epoch 2
tracker.stop()`;

const llmCode = `from carbonwatcher.llm.anthropic_wrapper import TrackedAnthropic

client = TrackedAnthropic()   # drop-in for anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain transformers."}],
)
# carbon + cost logged from API response — no manual token counting`;

const features = [
  {
    icon: "⚡",
    title: "Zero-code wrapping",
    desc: "Run any script under CarbonWatcher with one CLI command. No code changes needed.",
  },
  {
    icon: "🌍",
    title: "Location-aware carbon",
    desc: "Auto-detects your region. Uses provider's grid for cloud LLM calls, your grid for local compute.",
  },
  {
    icon: "🤖",
    title: "LLM token tracking",
    desc: "Anthropic, OpenAI, Ollama, HuggingFace, llama.cpp. Token counts from API responses — no guessing.",
  },
  {
    icon: "📊",
    title: "Monthly dashboard",
    desc: "ASCII bar charts, trend arrows, month-over-month comparisons. Export to JSON or CSV.",
  },
  {
    icon: "🎯",
    title: "Reduction goals",
    desc: "Set monthly and yearly carbon budgets. Visual progress bars show how close you are.",
  },
  {
    icon: "👥",
    title: "Team reports",
    desc: "Aggregate multiple ledgers. Rank team members by emissions. Share a file, no server needed.",
  },
  {
    icon: "🔋",
    title: "Hardware profiling",
    desc: "Intel RAPL (exact), Apple Silicon powermetrics, NVIDIA NVML, DRAM estimation.",
  },
  {
    icon: "📁",
    title: "JSON ledger",
    desc: "All runs persisted locally. Queryable, exportable, shareable. Owned by you.",
  },
];

const regions = [
  { region: "Norway", intensity: "28", level: "low" },
  { region: "France", intensity: "58", level: "low" },
  { region: "Ireland (eu-west-1)", intensity: "88", level: "low" },
  { region: "UK", intensity: "233", level: "mid" },
  { region: "USA (us-east-1)", intensity: "386", level: "mid" },
  { region: "India", intensity: "708", level: "high" },
  { region: "Australia", intensity: "790", level: "high" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          v0.3.0 — now on PyPI
        </div>

        <h1 className="text-5xl font-extrabold text-white mb-5 leading-tight">
          Carbon tracking for<br />
          <span className="text-green-400">ML experiments</span> &{" "}
          <span className="text-green-400">LLM calls</span>
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
          CarbonWatcher automatically measures the energy, CO₂ footprint, and cost of every training run and LLM API call — with zero changes to your existing code.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/getting-started"
            className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg transition-colors"
          >
            Get started →
          </Link>
          <a
            href="https://github.com/GhanshyamPaunikar/carbonwatcher"
            target="_blank"
            rel="noopener"
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* Install */}
      <div id="install" className="mb-14">
        <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-4">Installation</h2>
        <CodeBlock code={installCode} language="bash" filename="terminal" />
      </div>

      {/* Quick example */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick example</h2>
        <div className="grid gap-4">
          <CodeBlock code={quickCode} language="python" filename="context manager" />
          <CodeBlock code={epochCode} language="python" filename="epoch-based (long runs)" />
          <CodeBlock code={llmCode} language="python" filename="LLM tracking" />
        </div>
      </div>

      {/* Why section */}
      <div id="why" className="mb-14">
        <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-4">Why CarbonWatcher?</h2>
        <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 mb-6 text-gray-300 leading-7">
          <p className="mb-3">
            AI is one of the fastest-growing sources of electricity demand on the planet. A single large training run can emit as much CO₂ as five cars over their entire lifetime — yet most teams have no idea what their compute costs the environment.
          </p>
          <p className="mb-3">
            Carbon intensity also varies dramatically by region. <strong className="text-white">The same job running in India emits 8× more CO₂ than in Ireland.</strong> For cloud LLM API calls, it's the provider's grid that matters — not yours.
          </p>
          <p>
            CarbonWatcher tracks both — automatically, in the background, with no changes to your code.
          </p>
        </div>

        {/* Region table */}
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-800">
                <th className="text-left px-4 py-2.5 text-gray-400 font-semibold">Region</th>
                <th className="text-right px-4 py-2.5 text-gray-400 font-semibold">gCO₂/kWh</th>
                <th className="text-right px-4 py-2.5 text-gray-400 font-semibold">vs best</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((r) => (
                <tr key={r.region} className="border-b border-gray-800/50 hover:bg-gray-900/40">
                  <td className="px-4 py-2.5 text-gray-300">{r.region}</td>
                  <td className="px-4 py-2.5 text-right font-mono">
                    <span className={r.level === "low" ? "text-green-400" : r.level === "mid" ? "text-yellow-400" : "text-red-400"}>
                      {r.intensity}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-500 text-xs">
                    {r.intensity === "28" ? "baseline" : `${Math.round(parseInt(r.intensity) / 28)}× more`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features grid */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="text-white font-semibold mb-1 text-sm">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to start tracking?</h2>
        <p className="text-gray-400 mb-6">Install in 30 seconds. No account, no API key, no configuration required.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/docs/getting-started" className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg transition-colors">
            Read the docs →
          </Link>
          <a href="https://pypi.org/project/carbonwatcher/" target="_blank" rel="noopener" className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
            View on PyPI
          </a>
        </div>
      </div>
    </div>
  );
}
