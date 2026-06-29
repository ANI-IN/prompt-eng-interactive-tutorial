# Prompt Engineering for JavaScript Engineers

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ANI-IN/prompt-eng-interactive-tutorial)

A hands-on, notebook-based course that teaches prompt engineering and LLM application development with the Claude API, written for software engineers who already know JavaScript. You craft real prompts against a live Claude model and a programmatic grader tells you whether each exercise passes. Every notebook runs on the **Deno** runtime inside Jupyter — no `npm install`, no build step.

> **New here? Read [Getting Started](#getting-started) top to bottom.** The most common setup problems are an API key that the kernel hasn't picked up yet and a `.env` file in the wrong folder — both are covered in detail below.

---

## Contents

- [Who this is for](#who-this-is-for)
- [What you'll learn](#what-youll-learn)
- [Repository layout](#repository-layout)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Option A — GitHub Codespaces (zero install)](#option-a--github-codespaces-zero-install)
  - [Option B — Local setup (step by step)](#option-b--local-setup-step-by-step)
- [How the exercises and grading work](#how-the-exercises-and-grading-work)
- [Solutions](#solutions)
- [Troubleshooting](#troubleshooting)
- [Notes, costs, and the pinned model](#notes-costs-and-the-pinned-model)

---

## Who this is for

Mid-to-senior software engineers comfortable with JavaScript or TypeScript, REST APIs, JSON, and Git. No prior LLM or prompt-engineering experience is required. If you can read a `fetch` call and write a function, you're ready.

---

## What you'll learn

Each chapter teaches one core technique and names it explicitly so you can connect the hands-on practice to the wider prompt-engineering literature.

| Chapter | Technique |
|---|---|
| 00 Setup and How To | Environment check + your first API call |
| 01 Basic Prompt Structure | Prompt anatomy: system, user, and assistant roles |
| 02 Being Clear and Direct | Clear and direct instruction |
| 03 Assigning Roles | Role prompting (persona prompting) |
| 04 Separating Data and Instructions | Templates and XML delimiters |
| 05 Formatting Output | Output formatting and structured responses |
| 06 Precognition | Chain of Thought (CoT) |
| 07 Using Examples | Few-shot prompting |
| 08 Avoiding Hallucinations | Grounding to reduce hallucinations |
| 09 Complex Prompts from Scratch | Combining every technique |
| 10.1 Appendix | Prompt chaining |
| 10.2 Appendix | Tool use (function calling) |
| 10.3 Appendix | Retrieval-Augmented Generation (RAG) |

Work through them in order — each lesson builds on the previous ones.

---

## Repository layout

```
.
├── notebooks/            # The course. 13 notebooks (00 → 10.3). Start here.
├── notebooks_solved/     # Fully-solved, runnable copies of every notebook.
├── lib/
│   ├── helpers.js        # getCompletion(prompt, system?) + the pinned MODEL; loads .env
│   └── grading.js        # tiny grading helpers used by the exercises
├── hints.js              # per-exercise hints (printed by the hint cells)
├── .devcontainer/        # GitHub Codespaces config (auto-installs Deno + the kernel)
├── .env.example          # template — copy to .env and add your key
├── deno.json             # Deno project marker (pairs with deno.lock)
├── deno.lock             # pinned dependency versions for reproducible runs
└── README.md
```

The helper wraps the Anthropic Messages API in a single function:

```js
import { getCompletion, MODEL } from "../lib/helpers.js";
console.log(await getCompletion("In one sentence, what is an idempotent HTTP method?"));
```

`getCompletion(prompt, system?)` is all you need for most chapters. `system` defaults to `""`.

---

## Getting started

### Prerequisites

| Requirement | Notes |
|---|---|
| **Deno 2.x** | The runtime for every notebook. [deno.land](https://deno.land). Deno 1.40+ works; 2.x recommended. |
| **An Anthropic API key** | Create one at [console.anthropic.com](https://console.anthropic.com). A small amount of credit is enough for the whole course. |
| **A Jupyter front-end** | Either **VS Code** + the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) (recommended), or a `jupyter lab` install. |
| **Git** | To clone the repository. |

You do **not** need Node.js or `npm`. Dependencies (`@anthropic-ai/sdk`, `@std/dotenv`) are fetched and cached by Deno on first run.

---

### Option A — GitHub Codespaces (zero install)

Everything runs in your browser; the dev container installs Deno, registers the Deno Jupyter kernel, and configures the editor automatically.

1. **Add your API key once.** On GitHub: **Settings → Codespaces → Secrets → New secret**. Name it exactly `ANTHROPIC_API_KEY`, paste your key, and grant **this repository** access to it.
2. **Launch the Codespace.** Click the **Open in GitHub Codespaces** badge above, or **Code → Codespaces → Create codespace on main**. The first build takes a minute or two while Deno and the kernel install.
3. **Open a notebook** from `notebooks/`. Click **Select Kernel** (top right). If you don't see **Deno**, choose **Select Another Kernel → Jupyter Kernel → Deno**.
4. **Run the cells.** Your `ANTHROPIC_API_KEY` secret is picked up automatically (the container writes it into a repo-root `.env`), so the first API call works immediately.

> Codespaces gives personal accounts a free monthly quota. Stop or delete the Codespace when you're done to conserve it.

If a notebook reports an authentication error in Codespaces, the secret wasn't set before the container started — add the `ANTHROPIC_API_KEY` secret, then **rebuild the container** (Command Palette → *Codespaces: Rebuild Container*).

---

### Option B — Local setup (step by step)

Follow these in order. **The order matters** — in particular, add your `.env` and then **restart the kernel** so the key is actually loaded.

#### Step 1 — Clone the repository

```bash
git clone https://github.com/ANI-IN/prompt-eng-interactive-tutorial.git
cd prompt-eng-interactive-tutorial
```

#### Step 2 — Install Deno

**macOS / Linux:**

```bash
curl -fsSL https://deno.land/install.sh | sh
```

(macOS with Homebrew: `brew install deno`.)

**Windows (PowerShell):**

```powershell
irm https://deno.land/install.ps1 | iex
```

(or `winget install DenoLand.Deno`, or `choco install deno`.)

**Then close and reopen your terminal** so the updated `PATH` takes effect, and verify:

```bash
deno --version
```

You should see `deno 2.x` (or 1.40+). If `deno` is "command not found", the install dir isn't on your `PATH` yet — reopen the terminal, or add `~/.deno/bin` (macOS/Linux) / `%USERPROFILE%\.deno\bin` (Windows) to `PATH`.

#### Step 3 — Install the Deno Jupyter kernel

This registers a kernel named **Deno** that VS Code and JupyterLab can launch:

```bash
deno jupyter --install
```

To overwrite an existing registration, add `--force`.

- **VS Code users:** also install the **Jupyter** extension (`ms-toolsai.jupyter`) and the **Deno** extension (`denoland.vscode-deno`). The Deno kernel is discovered automatically once registered.
- **JupyterLab users:** you need Jupyter installed for the kernel to be discoverable (`pip install jupyterlab`, or via `pipx`/conda). If `deno jupyter --install` reports it can't find a Jupyter data directory, install Jupyter first, then re-run the command.

#### Step 4 — Add your API key (AFTER the kernel is installed)

Create the environment file **in the project root** and set your key:

```bash
cp .env.example .env
# then edit .env and set:
# ANTHROPIC_API_KEY=sk-ant-your-real-key
```

> ⚠️ **The `.env` file must live in the repository root**, not in `notebooks/`. The helper loads `../.env` relative to `lib/helpers.js`, which resolves to the project root regardless of which folder the kernel runs from. A key placed in `notebooks/.env` will **not** be read.

`.env` is gitignored, so your key is never committed.

#### Step 5 — Restart the kernel after configuring `.env`

This is the single most common gotcha. **The key is read only once — the moment `lib/helpers.js` is first imported** — and Deno caches the module for the rest of the kernel session.

- If you create or edit `.env` **after** the kernel already ran the import cell, the client was built with no key and re-running the cell will **not** fix it.
- **Fix:** restart the Deno kernel, then run cells from the top.
  - VS Code: the **Restart** (⟳) button at the top of the notebook, or Command Palette → **Jupyter: Restart Kernel**.
  - JupyterLab: **Kernel → Restart Kernel**.

**Rule to remember:** any time you change `.env`, restart the kernel.

#### Step 6 — Run your first notebook

1. Open `notebooks/00_Setup_and_How_To.ipynb`.
2. Select the **Deno** kernel (top-right kernel picker).
3. Run the cells top to bottom. The import cell prints the model; the next cell prints a one-sentence answer from Claude.

If that prints an answer, your environment is working. Move on to `01_Basic_Prompt_Structure.ipynb` and continue in order.

---

## How the exercises and grading work

Each chapter has one or more **exercise cells** containing a placeholder like `"[Replace this text]"`. Replace it with your own prompt, run the cell, and a grader prints:

```
This exercise has been correctly solved: true
```

The graders are deterministic substring/shape checks (e.g. "the response contains `404`", "the JSON has a `summary` string"). Any prompt that produces the required output passes — there's rarely a single right answer.

- **Editing a prompt does NOT require a kernel restart** — only editing `.env` does. Just re-run the cell.
- Some cells **intentionally throw** to teach you the API contract (e.g. a message missing its `role` returns `400 messages.0.role: Field required` in Chapter 1). The markdown above those cells says so — that error is the lesson, not a bug.

---

## Solutions

`notebooks_solved/` contains **fully-solved, runnable copies** of every notebook, with each placeholder filled in. Open any of them, select the Deno kernel, and **Run All** to see a passing solution end to end. Use them to check your work or to get unstuck — but try each exercise yourself first.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `Could not resolve authentication method` | The kernel imported `helpers.js` before the key was available, and cached a client with no key. | **Restart the kernel** and run from the top. Confirm the key is in the **root** `.env`. |
| Auth error persists after adding the key | `.env` is in `notebooks/` instead of the project root, or the kernel wasn't restarted. | Move `.env` to the repo root; restart the kernel. |
| `400 ... messages.0.role: Field required` | This is the **intentional** malformed-request demo in Chapter 1. | Nothing to fix — it's illustrating that every message needs a `role`. Move to the next cell. |
| Red squiggles in cells: *"Cannot redeclare variable"*, *"Property 'text' does not exist"*, *"implicitly has an 'any' type"* | The Deno VS Code extension type-checks all cells together; these are editor-only warnings. | Harmless — the cells still run. Ignore them. |
| `400 ... credit balance is too low` | Your Anthropic account has no API credits. | Add credit under **Billing** at [console.anthropic.com](https://console.anthropic.com). |
| `401 authentication_error` | Invalid or revoked key. | Regenerate the key in the console, paste it into the **root** `.env`, restart the kernel. |
| Deno kernel doesn't appear in the picker | Kernel not registered, or VS Code needs a reload. | Run `deno jupyter --install --force`; reload the VS Code window; **Select Another Kernel → Jupyter Kernel → Deno**. |
| `deno: command not found` | Deno isn't on your `PATH`. | Reopen the terminal; ensure `~/.deno/bin` (or `%USERPROFILE%\.deno\bin`) is on `PATH`. |
| First cell is slow or fails to fetch dependencies | Deno is downloading `@anthropic-ai/sdk` / `@std/dotenv` on first run. | Ensure you're online; re-run. `deno cache lib/helpers.js` pre-warms the cache. |
| `fetch failed` / connection error | Network, proxy, or firewall is blocking `api.anthropic.com`. | Check connectivity/VPN/proxy settings. |

Still stuck? Open `notebooks_solved/` for a known-good version of the same cell and compare.

---

## Notes, costs, and the pinned model

- **Model:** the course is pinned to `claude-sonnet-4-6` with `temperature: 0` (see `lib/helpers.js`), so the same prompt produces the same output and exercises are predictable. To experiment with another model, change `MODEL` in `lib/helpers.js`.
- **Cost:** exercises are short. The whole course typically costs well under a dollar in API usage, but you must have credit on your Anthropic account.
- **Privacy:** your API key lives only in `.env` (gitignored). It is never sent anywhere except Anthropic's API.
- **Top-level `await`:** notebook cells use top-level `await` directly — that's supported in Deno notebook cells with no wrapper function.
