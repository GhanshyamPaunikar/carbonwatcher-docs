import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const trackerInit = `from carbonwatcher import CarbonTracker

tracker = CarbonTracker(
    epochs=100,              # total epochs planned
    monitor_epochs=2,        # epochs to monitor before extrapolating
    experiment_name="bert",  # label for grouping in ledger
    model_name="bert-base",  # free text
    region=None,             # None = auto-detect from your IP
    infrastructure="cloud",  # cloud | on_premise | laptop | workstation
    num_vcpus=8,             # vCPUs (used when no GPU)
    gpu_model="default",     # GPU model for cost lookup
    storage_gb=0.0,          # persistent storage (for storage cost)
    sample_interval_s=1.0,   # hardware sampling frequency
    ledger_path="carbonwatcher_ledger.json",
    log_dir="./logs",        # None = no log files
    tags=["baseline"],       # arbitrary string tags
    metadata={"dataset": "imagenet"},
    custom_pue=None,         # override PUE
    custom_intensity=None,   # override grid intensity (gCO2/kWh)
    verbose=1,               # 0=silent, 1=summary, 2=debug
    ignore_errors=False,
)`;

const contextCode = `with CarbonTracker(experiment_name="run1", model_name="resnet50") as ct:
    train()

result = ct.result
print(result.summary())

# Access fields directly
print(result.carbon.carbon_g)         # gCO2e emitted
print(result.energy.total_energy_kwh) # total kWh
print(result.record.total_cost_usd)   # USD cost
print(result.hardware.cpu_model)      # CPU detected`;

const epochCode = `tracker = CarbonTracker(epochs=50, monitor_epochs=3)

for epoch in range(50):
    tracker.epoch_start()
    train_one_epoch()
    tracker.epoch_end()

tracker.stop()

# Access epoch-level results
for ep in tracker.result.epoch_results:
    print(f"Epoch {ep.epoch}: {ep.carbon.carbon_g:.6f} gCO2e")`;

const costTrackerCode = `from carbonwatcher.core.cost import CostTracker

ct = CostTracker("carbonwatcher_ledger.json")

# All runs
runs = ct.get_all_runs()

# Filter by experiment
runs = ct.get_runs_by_experiment("bert-finetune")

# Aggregate
agg = ct.aggregate(runs)
print(agg["num_runs"])
print(agg["total_carbon_kg"])
print(agg["total_cost_usd"])
print(agg["total_energy_kwh"])

# Efficiency ranking
ranking = ct.efficiency_ranking(metric="carbon_per_dollar")
for row in ranking[:5]:
    print(f"{row['run_id']}  {row['score']:.6f}")`;

const llmTrackerCode = `from carbonwatcher.llm.tracker import LLMTracker

lt = LLMTracker("carbonwatcher_llm_ledger.json")

# Record a call
result = lt.record(
    model="gpt-4o",
    input_tokens=1000,
    output_tokens=500,
    experiment="my-pipeline",
)

# Query
calls = lt.get_all_calls()
calls = lt.get_calls_by_experiment("my-pipeline")

agg = lt.aggregate(calls)
print(agg["total_carbon_g"])
print(agg["total_cost_usd"])
print(agg["total_tokens"])

# Compare models for a given workload
comparison = lt.compare_models(input_tokens=1000, output_tokens=400)`;

const runRecord = `# RunRecord fields (training)
record.run_id             # str — unique 8-char ID
record.experiment_name    # str
record.model_name         # str
record.timestamp          # ISO 8601 string
record.duration_s         # float — seconds
record.energy_kwh         # float
record.carbon_kg          # float
record.total_cost_usd     # float
record.region             # str — grid region used
record.infrastructure     # str
record.user_name          # str
record.organization       # str
record.user_region        # str — your location
record.tags               # List[str]
record.metadata           # dict`;

export default function PythonAPI() {
  return (
    <div className="prose-docs">
      <div className="mb-2 text-sm text-gray-500">Guides</div>
      <h1>Python API</h1>
      <p className="text-lg text-gray-400 mb-8">
        Full reference for the <code>CarbonTracker</code> class and supporting modules.
      </p>

      <h2>CarbonTracker — constructor</h2>
      <p>All parameters are optional. Sensible defaults work for most cases.</p>
      <CodeBlock code={trackerInit} language="python" filename="carbonwatcher/core/tracker.py" />

      <h2>Context manager</h2>
      <p>Use for single training blocks. The result is available on <code>ct.result</code> after the block exits.</p>
      <CodeBlock code={contextCode} language="python" filename="context_manager.py" />

      <h2>Epoch-based API</h2>
      <p>
        Recommended for training loops. After <code>monitor_epochs</code> epochs, CarbonWatcher extrapolates
        and prints a full-run prediction. Per-epoch results are stored in <code>result.epoch_results</code>.
      </p>
      <CodeBlock code={epochCode} language="python" filename="epoch_api.py" />

      <h2>CostTracker — ledger queries</h2>
      <p>Query and aggregate training run records from the ledger.</p>
      <CodeBlock code={costTrackerCode} language="python" filename="query_ledger.py" />

      <h2>LLMTracker — query LLM calls</h2>
      <p>Query and aggregate LLM call records.</p>
      <CodeBlock code={llmTrackerCode} language="python" filename="query_llm.py" />

      <h2>RunRecord fields</h2>
      <p>Fields available on each training run record:</p>
      <CodeBlock code={runRecord} language="python" filename="RunRecord" />

      <div className="mt-10 flex gap-4">
        <Link href="/docs/llm-tracking" className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
          LLM Tracking →
        </Link>
        <Link href="/docs/dashboard" className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          Dashboard & Goals →
        </Link>
      </div>
    </div>
  );
}
