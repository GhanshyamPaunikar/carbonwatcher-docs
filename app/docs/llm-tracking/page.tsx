import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

const anthropicCode = `from carbonwatcher.llm.anthropic_wrapper import TrackedAnthropic

client = TrackedAnthropic()   # drop-in for anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain gradient descent."}],
)
# Carbon + cost logged automatically from response.usage`;

const anthropicStream = `with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=512,
    messages=[{"role": "user", "content": "Write a haiku about energy."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
# Tracked on stream completion`;

const openaiCode = `from carbonwatcher.llm.openai_wrapper import TrackedOpenAI

client = TrackedOpenAI()   # drop-in for openai.OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Summarise this paper."}],
)`;

const ollamaCode = `from carbonwatcher.llm.ollama_wrapper import TrackedOllama

client = TrackedOllama()   # drop-in for ollama.Client()

response = client.chat(
    model="llama3.2",
    messages=[{"role": "user", "content": "What is backpropagation?"}],
)
# Token counts from Ollama's prompt_eval_count / eval_count — exact`;

const hfCode = `from carbonwatcher.llm.huggingface_wrapper import TrackedHuggingFace

model = TrackedHuggingFace("mistralai/Mistral-7B-v0.1")
output = model.generate("The attention mechanism works by", max_new_tokens=200)
# Exact token counts via AutoTokenizer`;

const llamacppCode = `from carbonwatcher.llm.llamacpp_wrapper import TrackedLlamaCpp

llm = TrackedLlamaCpp("models/llama-3.2-3b.gguf")
response = llm.chat([{"role": "user", "content": "Explain LoRA."}])
# Token counts from llama.cpp usage.prompt_tokens / usage.completion_tokens`;

const manualCode = `from carbonwatcher.llm.tracker import LLMTracker

tracker = LLMTracker()

result = tracker.record(
    model="gpt-4o",
    input_tokens=1500,
    output_tokens=300,
    experiment="summarisation-pipeline",
    metadata={"task": "rag-query"},
)

print(f"Carbon: {result.carbon_g:.4f} gCO2e")
print("Cost:  $" + f"{result.total_cost_usd:.4f}")
print(f"Energy: {result.total_energy_wh:.4f} Wh")`;

const compareCode = `from carbonwatcher.llm.tracker import LLMTracker

tracker = LLMTracker()
comparison = tracker.compare_models(input_tokens=1000, output_tokens=400)

for row in comparison[:8]:
    cost = row['cost_usd']
    print(f"{row['model_id']:45s}  {row['carbon_g']:.4f} gCO2e  USD {cost:.4f}")`;

const providers = [
  { provider: "Anthropic", grid: "~200 gCO₂/kWh", note: "AWS + GCP blended" },
  { provider: "OpenAI", grid: "~200 gCO₂/kWh", note: "Azure + custom" },
  { provider: "Mistral AI", grid: "58 gCO₂/kWh", note: "French grid" },
  { provider: "Ollama / llama.cpp", grid: "Your region", note: "Local compute" },
  { provider: "HuggingFace local", grid: "Your region", note: "Local compute" },
];

export default function LLMTracking() {
  return (
    <div className="prose-docs">
      <div className="mb-2 text-sm text-gray-500">Guides</div>
      <h1>LLM Tracking</h1>
      <p className="text-lg text-gray-400 mb-8">
        Track the carbon and cost of every LLM API call. Token counts come directly from API responses — no manual counting, no estimates.
      </p>

      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-8">
        <strong className="text-blue-200">Key distinction:</strong> For cloud LLM calls, the carbon is calculated using the <em>provider&apos;s</em> grid intensity — not your local grid. Anthropic and OpenAI use ~200 gCO₂/kWh (blended cloud), Mistral uses 58 gCO₂/kWh (French grid).
      </div>

      <h2>Provider grids</h2>
      <table>
        <thead><tr><th>Provider</th><th>Grid intensity</th><th>Note</th></tr></thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.provider}>
              <td><code>{p.provider}</code></td>
              <td>{p.grid}</td>
              <td className="text-gray-500">{p.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Anthropic</h2>
      <p>Drop-in replacement for <code>anthropic.Anthropic()</code>. Reads token counts from <code>response.usage</code>.</p>
      <CodeBlock code={anthropicCode} language="python" filename="anthropic_example.py" />
      <h3>Streaming</h3>
      <CodeBlock code={anthropicStream} language="python" filename="streaming.py" />

      <h2>OpenAI</h2>
      <p>Drop-in replacement for <code>openai.OpenAI()</code>.</p>
      <CodeBlock code={openaiCode} language="python" filename="openai_example.py" />

      <h2>Ollama (local models)</h2>
      <p>Drop-in replacement for <code>ollama.Client()</code>. Token counts are exact — read from <code>prompt_eval_count</code> / <code>eval_count</code> in the response.</p>
      <CodeBlock code={ollamaCode} language="python" filename="ollama_example.py" />

      <h2>HuggingFace (local models)</h2>
      <p>Wraps <code>transformers.pipeline</code>. Uses <code>AutoTokenizer</code> for exact token counts.</p>
      <CodeBlock code={hfCode} language="python" filename="huggingface_example.py" />

      <h2>llama.cpp</h2>
      <p>Wraps <code>llama_cpp.Llama</code>. Token counts from <code>usage.prompt_tokens</code> / <code>usage.completion_tokens</code>.</p>
      <CodeBlock code={llamacppCode} language="python" filename="llamacpp_example.py" />

      <h2>Manual recording</h2>
      <p>For any provider not listed, record token counts directly:</p>
      <CodeBlock code={manualCode} language="python" filename="manual.py" />

      <h2>Compare models</h2>
      <p>Rank all known models by carbon footprint for a given workload:</p>
      <CodeBlock code={compareCode} language="python" filename="compare.py" />
      <p>Or use the CLI: <code>carbonwatcher llm-compare</code></p>

      <div className="mt-10 flex gap-4">
        <Link href="/docs/cli" className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition-colors">
          CLI Reference →
        </Link>
        <Link href="/docs/dashboard" className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          Dashboard & Goals →
        </Link>
      </div>
    </div>
  );
}
