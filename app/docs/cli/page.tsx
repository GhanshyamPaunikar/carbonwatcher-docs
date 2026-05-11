import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const runCode = `# Basic — wraps and tracks your script
carbonwatcher run python train.py

# With options
carbonwatcher run \\
  --region eu-west-1 \\
  --infrastructure on_premise \\
  --log-dir ./logs \\
  --epochs 100 \\
  --monitor-epochs 3 \\
  --verbose 1 \\
  -- python train.py --batch-size 32`;

const runsCode = `# List all recorded training runs
carbonwatcher runs

# Filter by experiment
carbonwatcher runs --experiment bert-finetune

# Use a specific ledger file
carbonwatcher runs --ledger /shared/team_ledger.json`;

const compareCode = `# Rank runs by carbon efficiency (carbon per dollar)
carbonwatcher compare

# Rank by energy efficiency
carbonwatcher compare --metric energy_per_dollar`;

const estimateCode = `# Estimate carbon for given energy + region
carbonwatcher estimate --energy 0.5 --region India
carbonwatcher estimate --energy 0.5 --region eu-west-1`;

const regionsCode = `# Compare carbon intensity across all known regions
carbonwatcher regions`;

const configCode = `# Set your identity and region
carbonwatcher config --region India
carbonwatcher config --user-name Alice --organization Acme
carbonwatcher config --region India --user-name Alice --organization Acme

# Show current config
carbonwatcher config --show`;

const dashCode = `# Monthly emissions dashboard
carbonwatcher dashboard

# Filter to a specific user or org
carbonwatcher dashboard --user Alice
carbonwatcher dashboard --organization Acme

# Export
carbonwatcher dashboard --export-json report.json
carbonwatcher dashboard --export-csv  report.csv`;

const goalsCode = `# Set targets
carbonwatcher goals set --monthly 500
carbonwatcher goals set --monthly 500 --cost-monthly 10.0
carbonwatcher goals set --yearly 5000 --cost-yearly 100.0

# Check progress
carbonwatcher goals progress`;

const teamCode = `# Aggregate multiple ledgers and rank by emissions
carbonwatcher team alice.json bob.json carol.json

# Filter by month
carbonwatcher team *.json --month 2026-05

# Include LLM ledgers
carbonwatcher team alice.json --llm-ledger alice_llm.json

# Filter by organisation
carbonwatcher team *.json --organization Acme`;

const llmCode = `# List all LLM calls
carbonwatcher llm-runs
carbonwatcher llm-runs --experiment my-pipeline

# Estimate for a single call
carbonwatcher llm-estimate -m gpt-4o -i 2000 -o 500
carbonwatcher llm-estimate -m claude-sonnet-4-6 -i 1000 -o 300

# Rank all models by carbon footprint
carbonwatcher llm-compare

# List all supported models
carbonwatcher llm-models`;

const commands = [
  { cmd: "run", desc: "Wrap and track any script" },
  { cmd: "runs", desc: "List recorded training runs" },
  { cmd: "compare", desc: "Rank runs by efficiency" },
  { cmd: "estimate", desc: "Quick carbon estimate" },
  { cmd: "regions", desc: "Compare grid intensities" },
  { cmd: "config", desc: "Set region, name, organisation" },
  { cmd: "dashboard", desc: "Monthly emissions dashboard" },
  { cmd: "goals set", desc: "Set carbon/cost targets" },
  { cmd: "goals progress", desc: "Show progress toward targets" },
  { cmd: "team", desc: "Team emissions comparison" },
  { cmd: "llm-runs", desc: "List LLM call records" },
  { cmd: "llm-estimate", desc: "Estimate one LLM call" },
  { cmd: "llm-compare", desc: "Rank models by carbon" },
  { cmd: "llm-models", desc: "List supported LLM models" },
  { cmd: "logs", desc: "Parse structured log files" },
];

export default function CLI() {
  return (
    <div className="prose-docs">
      <div className="mb-2 text-sm text-gray-500">Guides</div>
      <h1>CLI Reference</h1>
      <p className="text-lg text-gray-400 mb-8">
        All commands available via the <code>carbonwatcher</code> CLI.
      </p>

      <h2>All commands</h2>
      <table>
        <thead><tr><th>Command</th><th>Description</th></tr></thead>
        <tbody>
          {commands.map((c) => (
            <tr key={c.cmd}>
              <td><code>carbonwatcher {c.cmd}</code></td>
              <td>{c.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>run</h2>
      <p>Track any script without modifying it. All flags before <code>--</code> are CarbonWatcher options; everything after is passed to your script.</p>
      <CodeBlock code={runCode} language="bash" filename="terminal" />

      <h2>runs</h2>
      <CodeBlock code={runsCode} language="bash" filename="terminal" />

      <h2>compare</h2>
      <CodeBlock code={compareCode} language="bash" filename="terminal" />

      <h2>estimate</h2>
      <CodeBlock code={estimateCode} language="bash" filename="terminal" />

      <h2>regions</h2>
      <CodeBlock code={regionsCode} language="bash" filename="terminal" />

      <h2>config</h2>
      <p>Config is saved to <code>~/.carbonwatcher/config.json</code> and used by all future runs.</p>
      <CodeBlock code={configCode} language="bash" filename="terminal" />

      <h2>dashboard</h2>
      <CodeBlock code={dashCode} language="bash" filename="terminal" />

      <h2>goals</h2>
      <CodeBlock code={goalsCode} language="bash" filename="terminal" />

      <h2>team</h2>
      <CodeBlock code={teamCode} language="bash" filename="terminal" />

      <h2>llm-*</h2>
      <CodeBlock code={llmCode} language="bash" filename="terminal" />

      <div className="mt-10 flex gap-4">
        <Link href="/docs/dashboard" className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
          Dashboard & Goals →
        </Link>
        <Link href="/docs/team-reports" className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          Team Reports →
        </Link>
      </div>
    </div>
  );
}
