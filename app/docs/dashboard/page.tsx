import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const dashCLI = `carbonwatcher dashboard
carbonwatcher dashboard --user Alice
carbonwatcher dashboard --organization Acme
carbonwatcher dashboard --export-json report.json
carbonwatcher dashboard --export-csv  report.csv`;

const dashPython = `from carbonwatcher.dashboard.monthly import (
    combined_monthly,
    print_monthly_dashboard,
    export_json,
    export_csv,
)

# Get data as dict
data = combined_monthly(
    training_ledger="carbonwatcher_ledger.json",
    llm_ledger="carbonwatcher_llm_ledger.json",
    user_name="Alice",        # optional filter
    organization="Acme",      # optional filter
)

for month, d in data.items():
    print(f"{month}  {d['total_carbon_g']:.4f} gCO2e  USD {d['total_cost_usd']:.4f}")

# Print to terminal
print_monthly_dashboard()

# Export
export_json("report.json")
export_csv("report.csv")`;

const monthData = `# Each month entry contains:
{
  "month": "2026-05",
  "total_carbon_g": 20.62,
  "total_cost_usd": 1.024,
  "total_energy_kwh": 0.0291,
  "training": {
    "runs": 15,
    "energy_kwh": 0.025,
    "carbon_g": 17.7,
    "cost_usd": 0.89,
    "experiments": ["bert-ft", "resnet"],
    "models": ["bert-base", "ResNet50"],
    "regions": ["eu-west-1"],
  },
  "llm": {
    "calls": 91,
    "total_tokens": 142000,
    "carbon_g": 2.92,
    "cost_usd": 0.134,
    "models": ["gpt-4o", "claude-sonnet-4-6"],
  }
}`;

const goalsSet = `# CLI
carbonwatcher goals set --monthly 500                      # carbon only
carbonwatcher goals set --monthly 500 --cost-monthly 10.0  # carbon + cost
carbonwatcher goals set --yearly  5000 --cost-yearly 100.0

# Python
from carbonwatcher.dashboard.goals import set_goal

set_goal("monthly", carbon_g=500, cost_usd=10.0, note="Q2 target")
set_goal("yearly",  carbon_g=5000)`;

const goalsProgress = `# CLI
carbonwatcher goals progress

# Python
from carbonwatcher.dashboard.goals import print_goals_progress
print_goals_progress()`;

const goalsOutput = `                       Reduction Goals Progress
╭────────────────┬────────┬─────────────┬──────────────┬──────────────┬────────╮
│ Period         │ Metric │ Goal        │ Used         │ Remaining    │ Status │
├────────────────┼────────┼─────────────┼──────────────┼──────────────┼────────┤
│ 2026-05        │ Carbon │ 500.00 gCO2e│ 20.62 gCO2e  │ 479.38 gCO2e │ ✓ 4.1% │
│ (monthly)      │ Cost   │ 10.00 USD   │ 1.02 USD     │ 8.98 USD     │ ✓ 10.2%│
│ 2026 (yearly)  │ Carbon │ 5000.0 gCO2e│ 51.28 gCO2e  │ 4948.7 gCO2e │ ✓ 1.0% │
╰────────────────┴────────┴─────────────┴──────────────┴──────────────┴────────╯

Monthly carbon vs goal (500.00 gCO2e)
  2026-03  ███░░░░░░░░░░░░░░░░░░░░░░░░░░░  17.23 / 500.00 g
  2026-04  ███░░░░░░░░░░░░░░░░░░░░░░░░░░░  13.42 / 500.00 g
  2026-05  ████░░░░░░░░░░░░░░░░░░░░░░░░░░  20.62 / 500.00 g`;

export default function Dashboard() {
  return (
    <div className="prose-docs">
      <div className="mb-2 text-sm text-gray-500">Features</div>
      <h1>Dashboard & Goals</h1>
      <p className="text-lg text-gray-400 mb-8">
        Monthly emissions dashboard with trend tracking, ASCII bar charts, and export. Set carbon budgets and monitor progress.
      </p>

      <h2>Monthly dashboard</h2>
      <p>Aggregates training runs and LLM calls by month, showing energy, carbon, cost, and month-over-month trends.</p>

      <h3>CLI</h3>
      <CodeBlock code={dashCLI} language="bash" filename="terminal" />

      <h3>Python</h3>
      <CodeBlock code={dashPython} language="python" filename="dashboard.py" />

      <h3>Month data structure</h3>
      <CodeBlock code={monthData} language="python" filename="data shape" />

      <h2>Reduction goals</h2>
      <p>
        Goals are saved to <code>~/.carbonwatcher/goals.json</code>. You can set separate monthly and yearly targets
        for both carbon and cost.
      </p>

      <h3>Set goals</h3>
      <CodeBlock code={goalsSet} language="bash" filename="terminal" />

      <h3>Check progress</h3>
      <CodeBlock code={goalsProgress} language="bash" filename="terminal" />

      <h3>Progress output</h3>
      <CodeBlock code={goalsOutput} language="bash" filename="output" />

      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm mt-6">
        <strong className="text-green-200">Status colours:</strong>
        <ul className="mt-2 space-y-1 text-gray-400">
          <li><span className="text-green-400">✓ green</span> — under 80% of budget</li>
          <li><span className="text-yellow-400">⚠ yellow</span> — 80–99% of budget</li>
          <li><span className="text-red-400">EXCEEDED red</span> — over budget</li>
        </ul>
      </div>

      <div className="mt-10 flex gap-4">
        <Link href="/docs/team-reports" className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
          Team Reports →
        </Link>
        <Link href="/docs/hardware" className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          Hardware Profiling →
        </Link>
      </div>
    </div>
  );
}
