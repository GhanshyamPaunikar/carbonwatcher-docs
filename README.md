# CarbonWatcher Docs

Documentation site for [CarbonWatcher](https://github.com/GhanshyamPaunikar/carbonwatcher), a CLI and Python module that tracks the energy, carbon footprint, and cost of ML training runs and LLM API calls.

**Live site:** https://carbonwatcher-docs.vercel.app

## Pages

| Page | What it covers |
|---|---|
| [Getting started](https://carbonwatcher-docs.vercel.app/docs/getting-started) | Install, set your region, track your first experiment |
| [CLI](https://carbonwatcher-docs.vercel.app/docs/cli) | `run`, `runs`, `compare`, `estimate` and the other commands |
| [Python API](https://carbonwatcher-docs.vercel.app/docs/python-api) | `CarbonTracker`, `CostTracker`, `LLMTracker`, context manager and epoch APIs |
| [LLM tracking](https://carbonwatcher-docs.vercel.app/docs/llm-tracking) | Drop-in wrappers for hosted and local LLM providers |
| [Hardware](https://carbonwatcher-docs.vercel.app/docs/hardware) | Power measurement, PUE, DRAM estimation, Apple Silicon |
| [Dashboard](https://carbonwatcher-docs.vercel.app/docs/dashboard) | Monthly dashboard and reduction goals |
| [Team reports](https://carbonwatcher-docs.vercel.app/docs/team-reports) | Team stats from the CLI or Python, shared ledgers |

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project layout

```
app/
  page.tsx          Landing page
  docs/<page>/      One folder per documentation page
components/         Sidebar, top bar, and code blocks
public/             Static assets
```

## Build

```bash
npm run build
npm start
```

The site deploys to Vercel on every push to `main`.
