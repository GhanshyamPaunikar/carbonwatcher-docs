import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const installCore = `pip install carbonwatcher`;
const installExtras = `pip install "carbonwatcher[anthropic]"    # Anthropic API
pip install "carbonwatcher[openai]"       # OpenAI API
pip install "carbonwatcher[ollama]"       # Ollama local models
pip install "carbonwatcher[huggingface]"  # HuggingFace models
pip install "carbonwatcher[llamacpp]"     # llama.cpp
pip install "carbonwatcher[all]"          # Everything`;

const configCode = `# Set your location once — used for all future runs
carbonwatcher config --region India --user-name Alice --organization Acme

# Verify
carbonwatcher config --show`;

const wrapCode = `# Track any existing script — zero code changes
carbonwatcher run python train.py

# With options
carbonwatcher run --region eu-west-1 --log-dir ./logs -- python train.py --epochs 50`;

const contextCode = `from carbonwatcher import CarbonTracker

with CarbonTracker(
    experiment_name="resnet50",
    model_name="ResNet50",
    region="eu-west-1",          # or None to auto-detect
    infrastructure="cloud",      # cloud | on_premise | laptop | workstation
    log_dir="./logs",
    verbose=1,
) as ct:
    train()

# Prints automatically:
# Run:        a3f2c1b8
# Energy:     3.12 Wh  (CPU: 2.84  GPU: 0.22  DRAM: 0.06)  PUE×1.10
# Carbon:     2.209 gCO2e  (0.00000221 kg)
# Grid:       eu-west-1 @ 88.0 gCO2/kWh
# Cost:       $0.0312 USD`;

const epochCode = `from carbonwatcher import CarbonTracker

tracker = CarbonTracker(
    epochs=100,
    monitor_epochs=2,         # monitor 2 epochs then extrapolate
    experiment_name="bert-ft",
    model_name="bert-base-uncased",
)

for epoch in range(100):
    tracker.epoch_start()
    train_one_epoch(model, data)
    tracker.epoch_end()       # prints per-epoch stats + prediction after epoch 2

tracker.stop()`;

const decoratorCode = `from carbonwatcher import CarbonTracker

@CarbonTracker.track(experiment="gpt2-ft", model="GPT-2", region="us-west-2")
def train():
    # your training code here
    ...

train()   # tracked automatically`;

const viewCode = `# List all runs
carbonwatcher runs

# Filter by experiment
carbonwatcher runs --experiment bert-ft

# Rank by efficiency
carbonwatcher compare`;

export default function GettingStarted() {
  return (
    <div className="prose-docs">
      <div className="mb-2 text-sm text-gray-500">Guides</div>
      <h1>Getting Started</h1>
      <p className="text-lg text-gray-400 mb-8">
        Track your first experiment in under a minute. No account, no API key, no configuration required to get going.
      </p>

      <h2>1. Install</h2>
      <p>Install the core package with pip:</p>
      <CodeBlock code={installCore} language="bash" filename="terminal" />
      <p>Add optional extras for LLM provider support:</p>
      <CodeBlock code={installExtras} language="bash" filename="terminal" />

      <h2>2. Set your region (optional but recommended)</h2>
      <p>
        CarbonWatcher auto-detects your location via IP geolocation. For more accurate results, set it explicitly:
      </p>
      <CodeBlock code={configCode} language="bash" filename="terminal" />
      <p>
        Your region determines the carbon intensity used for local compute. See the{" "}
        <Link href="/#why">full region table</Link> on the home page.
      </p>

      <h2>3. Track your first experiment</h2>

      <h3>Option A — Wrap any script (no code changes)</h3>
      <p>The fastest way to start. Run your existing script under <code>carbonwatcher run</code>:</p>
      <CodeBlock code={wrapCode} language="bash" filename="terminal" />

      <h3>Option B — Context manager</h3>
      <p>Wrap a block of code inside a <code>with</code> statement:</p>
      <CodeBlock code={contextCode} language="python" filename="train.py" />

      <h3>Option C — Epoch-based API (recommended for long runs)</h3>
      <p>
        For training loops with many epochs. After <code>monitor_epochs</code> epochs, CarbonWatcher extrapolates
        and prints a prediction for the full run:
      </p>
      <CodeBlock code={epochCode} language="python" filename="train.py" />

      <h3>Option D — Decorator</h3>
      <CodeBlock code={decoratorCode} language="python" filename="train.py" />

      <h2>4. View your results</h2>
      <CodeBlock code={viewCode} language="bash" filename="terminal" />

      <div className="mt-10 flex gap-4">
        <Link href="/docs/python-api" className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
          Python API →
        </Link>
        <Link href="/docs/llm-tracking" className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          LLM Tracking →
        </Link>
      </div>
    </div>
  );
}
