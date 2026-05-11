import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const teamCLI = `# Compare multiple team members (each has their own ledger)
carbonwatcher team alice.json bob.json carol.json

# Filter by month
carbonwatcher team alice.json bob.json --month 2026-05

# Include LLM usage
carbonwatcher team alice.json --llm-ledger alice_llm.json \\
              bob.json   --llm-ledger bob_llm.json

# Filter by organisation
carbonwatcher team /shared/ledgers/*.json --organization Acme`;

const teamOutput = `              Team Carbon Report — 2026-05
╭──────┬─────────┬──────────┬────────────┬───────────┬─────────────┬───────────╮
│ Rank │ Member  │ Region   │ Train runs │ LLM calls │Carbon(gCO2) │  Cost(USD)│
├──────┼─────────┼──────────┼────────────┼───────────┼─────────────┼───────────┤
│    1 │ alice   │ India    │         15 │        91 │     20.6219 │    $1.0240│
│    2 │ carol   │ us-east-1│         11 │        78 │      7.9823 │    $0.5910│
│    3 │ bob     │ eu-west-1│          9 │       102 │      1.8341 │    $0.4320│
╰──────┴─────────┴──────────┴────────────┴───────────┴─────────────┴───────────╯

  Members:       3
  Total carbon:  30.4383 gCO2e
  Total cost:    $2.0470 USD
  Top emitter:   alice (20.6219 gCO2e)`;

const teamPython = `from carbonwatcher.team.report import team_stats, print_team_report

# Get stats as dict
stats = team_stats(
    ledger_paths=["alice.json", "bob.json", "carol.json"],
    llm_ledger_paths=["alice_llm.json", "bob_llm.json"],
    month="2026-05",     # optional YYYY-MM filter
)

for user, s in stats.items():
    print(f"{user:12s}  {s['total_carbon_g']:.4f} gCO2e  USD {s['total_cost_usd']:.4f}")

# Print formatted table
print_team_report(
    ledger_paths=["alice.json", "bob.json"],
    llm_ledger_paths=["alice_llm.json"],
    month="2026-05",
    organization="Acme",
)`;

const statsShape = `# Per-user stats dict shape:
{
  "alice": {
    "user_name":       "alice",
    "organization":    "Acme",
    "user_region":     "India",
    "train_runs":      15,
    "train_carbon_g":  18.34,
    "train_cost_usd":  0.89,
    "train_energy_kwh": 0.025,
    "llm_calls":       91,
    "llm_carbon_g":    2.28,
    "llm_cost_usd":    0.134,
    "llm_tokens":      142000,
    "total_carbon_g":  20.62,
    "total_cost_usd":  1.024,
  }
}`;

const sharedSetup = `# Option 1: Shared file on network drive
# Each team member sets their ledger path:
carbonwatcher config --ledger-path /Volumes/shared/team_ledger.json

# Option 2: Each person has their own file
# Collect them for the team report:
carbonwatcher team /home/*/carbonwatcher_ledger.json

# Option 3: Commit to a shared git repo
# Each person's ledger lives in the repo:
carbonwatcher team ledgers/alice.json ledgers/bob.json`;

export default function TeamReports() {
  return (
    <div className="prose-docs">
      <div className="mb-2 text-sm text-gray-500">Features</div>
      <h1>Team Reports</h1>
      <p className="text-lg text-gray-400 mb-8">
        Aggregate emissions across your team. Rank members by carbon footprint. No server required — just share ledger files.
      </p>

      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-8">
        <strong className="text-blue-200">How it works:</strong> Each person runs CarbonWatcher locally, writing to their own JSON ledger. The <code>team</code> command reads multiple ledger files and aggregates them. Sharing is just sharing a file — no backend, no accounts.
      </div>

      <h2>CLI</h2>
      <CodeBlock code={teamCLI} language="bash" filename="terminal" />

      <h2>Output</h2>
      <CodeBlock code={teamOutput} language="bash" filename="output" />

      <p>
        In this example, <strong>Alice emits 11× more CO₂ than Bob</strong> for similar workloads. The reason: Alice is in India (708 gCO₂/kWh), Bob is in Ireland (88 gCO₂/kWh). Running Alice&apos;s jobs on an EU cloud region would cut her footprint by 87%.
      </p>

      <h2>Python</h2>
      <CodeBlock code={teamPython} language="python" filename="team.py" />

      <h2>Stats shape</h2>
      <CodeBlock code={statsShape} language="python" filename="stats dict" />

      <h2>Setting up shared ledgers</h2>
      <CodeBlock code={sharedSetup} language="bash" filename="terminal" />

      <h2>Use cases</h2>
      <ul>
        <li>Weekly team review: who drove emissions this week and why?</li>
        <li>Compare experiment branches: which approach is greener?</li>
        <li>ESG reporting: export monthly CSV for Scope 3 AI compute emissions</li>
        <li>Budget enforcement: alert when a team member exceeds their monthly carbon cap</li>
      </ul>

      <div className="mt-10 flex gap-4">
        <Link href="/docs/hardware" className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
          Hardware Profiling →
        </Link>
        <Link href="/docs/cli" className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          CLI Reference →
        </Link>
      </div>
    </div>
  );
}
