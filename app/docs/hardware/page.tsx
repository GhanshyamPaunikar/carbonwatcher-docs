import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const profileCode = `from carbonwatcher.core.hardware import HardwareProfiler

profiler = HardwareProfiler(sample_interval_s=1.0)
profiler.start()

# ... your workload ...

profile = profiler.stop()

print(f"CPU:        {profile.cpu_model}  [{profile.cpu_power_source}]")
print(f"Avg power:  {profile.avg_cpu_power_w:.2f} W")
print(f"GPU:        {profile.gpu_label}")
print(f"CPU energy: {profile.total_cpu_energy_kwh*1000:.4f} Wh")
print(f"GPU energy: {profile.total_gpu_energy_kwh*1000:.4f} Wh")
print(f"DRAM:       {profile.total_dram_energy_kwh*1000:.4f} Wh")`;

const energyCode = `from carbonwatcher.core.energy import EnergyCalculator

calc = EnergyCalculator(
    infrastructure="cloud",   # cloud | on_premise | laptop | workstation
    num_vcpus=8,
    gpu_model="nvidia-a100",
    storage_gb=100.0,
    custom_pue=1.2,           # override PUE
)

result = calc.calculate(profile)
print(f"Raw energy: {result.raw_energy_kwh*1000:.4f} Wh")
print(f"PUE:        {result.pue_overhead:.2f}")
print(f"Total:      {result.total_energy_kwh*1000:.4f} Wh")`;

const carbonCode = `from carbonwatcher.core.carbon import CarbonEstimator

est = CarbonEstimator(
    region="eu-west-1",
    custom_intensity=None,   # override gCO2/kWh if needed
)

result = est.estimate(energy_kwh=0.003)
print(f"Carbon:     {result.carbon_g:.6f} gCO2e")
print(f"Grid:       {result.region} @ {result.grid_intensity_gco2_per_kwh} gCO2/kWh")
print(f"Source:     {result.intensity_source}")
print(f"Equiv:      {result.equivalents['km_driven']:.6f} km driven")
print(f"            {result.equivalents['smartphone_charges']:.4f} phone charges")`;

const hardware = [
  { platform: "Intel CPU (Linux)", method: "RAPL — direct hardware energy counter", accuracy: "Exact", color: "green" },
  { platform: "Apple Silicon (macOS)", method: "powermetrics subprocess", accuracy: "High", color: "green" },
  { platform: "NVIDIA GPU", method: "NVML — direct power sensor", accuracy: "Exact", color: "green" },
  { platform: "DRAM", method: "RAM GB × 0.375 W/GB empirical ratio", accuracy: "Estimated", color: "yellow" },
  { platform: "Other CPUs", method: "TDP-based estimate", accuracy: "Conservative", color: "yellow" },
];

const pue = [
  { infra: "Cloud (AWS / GCP / Azure)", pue: "1.10", note: "Industry average for hyperscalers" },
  { infra: "On-premise data centre", pue: "1.50", note: "Typical enterprise DC" },
  { infra: "Workstation", pue: "1.00", note: "Direct consumption" },
  { infra: "Laptop", pue: "1.00", note: "Battery/direct consumption" },
];

export default function Hardware() {
  return (
    <div className="prose-docs">
      <div className="mb-2 text-sm text-gray-500">Features</div>
      <h1>Hardware Profiling</h1>
      <p className="text-lg text-gray-400 mb-8">
        How CarbonWatcher measures CPU, GPU, and DRAM power — and converts it to carbon.
      </p>

      <h2>Power measurement methods</h2>
      <table>
        <thead><tr><th>Platform</th><th>Method</th><th>Accuracy</th></tr></thead>
        <tbody>
          {hardware.map((h) => (
            <tr key={h.platform}>
              <td><strong>{h.platform}</strong></td>
              <td className="text-gray-400">{h.method}</td>
              <td>
                <span className={h.color === "green" ? "text-green-400" : "text-yellow-400"}>
                  {h.accuracy}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>PUE — Power Usage Effectiveness</h2>
      <p>
        PUE accounts for the overhead of cooling, power distribution, and other facility loads. CarbonWatcher applies the correct PUE automatically based on your <code>infrastructure</code> setting.
      </p>
      <table>
        <thead><tr><th>Infrastructure</th><th>PUE</th><th>Note</th></tr></thead>
        <tbody>
          {pue.map((p) => (
            <tr key={p.infra}>
              <td><code>{p.infra}</code></td>
              <td className="font-mono text-green-400">{p.pue}</td>
              <td className="text-gray-500">{p.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Override with <code>custom_pue</code> if you know your facility&apos;s exact PUE.</p>

      <h2>Energy pipeline</h2>
      <p>The full pipeline from hardware sampling to carbon estimate:</p>

      <div className="flex items-center gap-2 flex-wrap text-sm my-4">
        {["HardwareProfiler", "→", "EnergyCalculator", "→", "CarbonEstimator", "→", "CostTracker"].map((s, i) => (
          s === "→"
            ? <span key={i} className="text-gray-600">→</span>
            : <span key={i} className="px-3 py-1.5 bg-gray-800 rounded-lg text-green-400 font-mono">{s}</span>
        ))}
      </div>

      <h3>HardwareProfiler</h3>
      <CodeBlock code={profileCode} language="python" filename="hardware.py" />

      <h3>EnergyCalculator</h3>
      <CodeBlock code={energyCode} language="python" filename="energy.py" />

      <h3>CarbonEstimator</h3>
      <CodeBlock code={carbonCode} language="python" filename="carbon.py" />

      <h2>DRAM estimation</h2>
      <p>
        DRAM power is estimated as <code>RAM used (GB) × 0.375 W/GB</code> — an empirical ratio based on DDR4 measurements. It is included in the raw energy total and appears separately in the summary output.
      </p>

      <h2>Apple Silicon note</h2>
      <p>
        On macOS with Apple Silicon (M1/M2/M3), CarbonWatcher calls <code>powermetrics</code> to read real-time power. This requires <code>sudo</code> for live readings. Without it, CarbonWatcher falls back to a TDP-based estimate (typically 10–15% conservative).
      </p>

      <div className="mt-10 flex gap-4">
        <Link href="/docs/getting-started" className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
          ← Getting Started
        </Link>
        <Link href="/docs/python-api" className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          Python API →
        </Link>
      </div>
    </div>
  );
}
