# How supersets.sh works

**Session ID:** ses_f1afd5944ffeelJ57lLtBI21vC
**Created:** 9/27/2026, 3:35:51 PM
**Updated:** 9/27/2026, 4:07:09 PM

---

## User

hey i want you to undernderstand supersets.sh and tell me how that works

---

## Assistant (Build · MiMo-V2.6-Flash Free · 11.6s)

_Thinking:_

Let me explore the codebase to find supersets.sh.

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/supersets.sh"
}
```

**Output:**
```
No files found
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/*superset*"
}
```

**Output:**
```
No files found
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 7.7s)

_Thinking:_

Not found. Check the working directory contents.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la"
}
```

**Output:**
```
total 264
drwxr-xr-x   6 kgensupertramp  staff     192 Sep 27 15:14 .
drwx------+ 64 kgensupertramp  staff    2048 Sep 27 15:21 ..
drwxr-xr-x  14 kgensupertramp  staff     448 Sep 27 15:35 .git
-rw-r--r--   1 kgensupertramp  staff    8347 Sep 27 14:30 ARCHITECTURE.md
drwxr-xr-x@ 21 kgensupertramp  staff     672 Sep 27 15:14 harmony-engineering-handoff
-rw-r--r--@  1 kgensupertramp  staff  119035 Sep 27 14:39 mermaid-diagram (1).png

```

**Tool: bash**

**Input:**
```json
{
  "command": "ls /Users/kgensupertramp 2>/dev/null; find /Users/kgensupertramp -maxdepth 3 -name \"*superset*\" 2>/dev/null"
}
```

**Output:**
```
0
0.
Applications
Desktop
Documents
Downloads
Library
Movies
Music
Pictures
Public
__pycache__
h3-free-run.mp4
hotspot-mode.sh
modal_ltx_talking.py
run_h3_lightx8.py

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 0.1s)

---

## User

checkwebsite

---

## Assistant (Build · MiMo-V2.6-Flash Free · 74.4s)

_Thinking:_

The user's message "checkwebsite" is ambiguous. But context: they asked about supersets.sh which doesn't exist in this repo. Maybe "check website" - they want me to check a website? Unclear. Let me first address that supersets.sh wasn't found. Actually the previous turn ended with tool results and no answer. Then user says "checkwebsite".

Possibly they want to check a website URL. I don't have a URL. I should ask for clarification—there's a question tool. But maybe "checkwebsite" means check if website is up? No URL provided.

Let me search more broadly for supersets.sh first? Actually maybe in harmony-engineering-handoff folder. Let me check.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la harmony-engineering-handoff; find / -name \"supersets.sh\" -not -path \"*/node_modules/*\" 2>/dev/null | head -20"
}
```

**Output:**
```
total 880
drwxr-xr-x@ 21 kgensupertramp  staff     672 Sep 27 15:14 .
drwxr-xr-x   6 kgensupertramp  staff     192 Sep 27 15:14 ..
-rw-r--r--@  1 kgensupertramp  staff   13404 Sep 27  2026 01-product-requirements.md
-rw-r--r--@  1 kgensupertramp  staff   12123 Sep 27  2026 02-decisions-and-invariants.md
-rw-r--r--@  1 kgensupertramp  staff   11590 Sep 27  2026 03-system-architecture.md
-rw-r--r--@  1 kgensupertramp  staff   12241 Sep 27  2026 04-upstream-forks-and-integration.md
-rw-r--r--@  1 kgensupertramp  staff   14983 Sep 27  2026 05-domain-model-and-storage.md
-rw-r--r--@  1 kgensupertramp  staff   23928 Sep 27  2026 06-api-and-event-contracts.md
-rw-r--r--@  1 kgensupertramp  staff   13933 Sep 27  2026 07-workflows-and-state-machines.md
-rw-r--r--@  1 kgensupertramp  staff   12188 Sep 27  2026 08-agent-roles-and-execution.md
-rw-r--r--@  1 kgensupertramp  staff   10312 Sep 27  2026 09-gbrain-knowledge-and-provenance.md
-rw-r--r--@  1 kgensupertramp  staff   10605 Sep 27  2026 10-feedback-and-market-intelligence.md
-rw-r--r--@  1 kgensupertramp  staff   11345 Sep 27  2026 11-repository-preview-and-delivery.md
-rw-r--r--@  1 kgensupertramp  staff   11107 Sep 27  2026 12-identity-security-and-isolation.md
-rw-r--r--@  1 kgensupertramp  staff   10527 Sep 27  2026 13-infrastructure-and-operations.md
-rw-r--r--@  1 kgensupertramp  staff   13270 Sep 27  2026 14-testing-and-acceptance.md
-rw-r--r--@  1 kgensupertramp  staff   11286 Sep 27  2026 15-implementation-backlog-and-runbook.md
-rw-r--r--@  1 kgensupertramp  staff   11748 Sep 27  2026 16-sources-assumptions-and-coverage.md
-rw-r--r--@  1 kgensupertramp  staff  212388 Sep 27  2026 ALL-SPECIFICATIONS.md
-rw-r--r--@  1 kgensupertramp  staff    6565 Sep 27  2026 README.md
-rw-r--r--@  1 kgensupertramp  staff    2377 Sep 27  2026 VALIDATION.md


<shell_metadata>
User aborted the command
</shell_metadata>
```

---

## User

https://superset.sh/team

---

## Assistant (Build · MiMo-V2.6-Flash Free · 11.5s)

_Thinking:_

The user gives a URL: https://superset.sh/team. They want me to check the website presumably. Let me fetch it.

**Tool: webfetch**

**Input:**
```json
{
  "url": "https://superset.sh/team",
  "format": "markdown"
}
```

**Output:**
```
About | Superset

[Superset](/)

-   Product
-   Resources
-   [Pricing](/pricing)
-   [Enterprise](/enterprise)
-   [Join us](/join-us)

[GitHub14.7k](https://github.com/superset-sh/superset)

Download for macOSDownload

Download for macOSDownload

About Superset

# Building the last piece of software.

Superset is building self-improving software. It starts with giving engineers the best tools that adapt to their needs over time. We're 3 ex-YC CTOs building a tool that we love.

## So how did we get here?

Superset started as a hackathon project in November 2025. It was a simple desktop app for managing worktrees.

In just a few months, tens of thousands of engineers run Superset as their primary IDE, at companies like Wix, DoorDash, and Netflix.

Now, we've raised $11M from the best investors in Silicon Valley to build the platform for software factories.

![The Superset founders at a hackathon, YC HQ San Francisco](/_next/image?url=%2Fjoin-us%2Ffounders.jpg&w=3840&q=75)

The founders at the hackathon where Superset started | YC HQ, November 2025

## The founders

[

![Kiet Ho](/_next/image?url=%2Fteam%2Fkiet.jpg&w=3840&q=75)

](/team/kiet)[

### Kiet Ho

](/team/kiet)

Cofounder and CEO

Ex-CTO at [Onlook](https://onlook.com) (YC W25). Previously at [Amazon](https://amazon.com) and [ServiceNow](https://servicenow.com). Trains fighting.

[](https://github.com/Kitenite)[](https://linkedin.com/in/kiet-ho)[](https://twitter.com/kietho_)

[

![Satya Patel](/_next/image?url=%2Fteam%2Fsatya.jpeg&w=3840&q=75)

](/team/satya)[

### Satya Patel

](/team/satya)

Cofounder and CTO

Ex-CTO at [Untether Labs](https://www.untetherlabs.com) (YC W23). Previously at [Scribe](https://scribehow.com), [Google](https://google.com), [Amazon](https://amazon.com), and [Facebook](https://meta.com). Lifts heavy.

[](https://github.com/saddlepaddle)[](https://linkedin.com/in/saddlepaddle)[](https://twitter.com/saddle_paddle)

[

![Avi Peltz](/_next/image?url=%2Fteam%2Favi.jpg&w=3840&q=75)

](/team/avi)[

### Avi Peltz

](/team/avi)

Cofounder and CPO

Ex-CTO at [Adam](https://adam.new) (YC W25). Previously founded [BioGlyph](https://bioglyph.app), computer vision research. Builds robots.

[](https://github.com/avipeltz)[](https://linkedin.com/in/avipeltz)[](https://twitter.com/avimakesrobots)

[We're hiring in San Francisco](/join-us)

## Bring your agents together.

Download for macOSDownloadStar on GitHub

Or ask your coding agent to install the Superset CLI.

brewcurlagent

$`brew install superset-sh/tap/superset`

[Superset](/)

[Discord](https://discord.gg/cZeD9WYcV7)[X/Twitter](https://x.com/superset_sh)[LinkedIn](https://www.linkedin.com/company/superset-sh)[YouTube](https://www.youtube.com/@superset-sh)

[](https://apps.apple.com/app/id6788926383)

[SOC 2 Type II compliantSERVICE ORGANIZATION CONTROLSINDEPENDENTLY AUDITEDSOC 2TYPE II](https://trust.superset.sh)

© 2026 Superset Inc.

English

Product

-   [Download](/download)
-   [Mobile](/mobile)
-   [How it works](/#how-it-works)
-   [Features](/#features)
-   [Security](/#security)
-   [MCP](/mcp-install)
-   [Marketplace](/marketplace)
-   [Compare](/compare)

Company

-   [About](/team)
-   [Contact](/contact)
-   [Careers](/join-us)
-   [Media kit](/media)
-   [Status](https://status.superset.sh)

Resources

-   [Documentation](https://docs.superset.sh)
-   [Pricing](/pricing)
-   [Blog](/blog)
-   [Parallel agents guide](/parallel-coding-agents)
-   [Orchestration guide](/agent-orchestration)
-   [Community](/community)
-   [Enterprise](/enterprise)
-   [Changelog](/changelog)
-   [Roadmap](/roadmap)

Legal

-   [Security](/security)
-   [Terms](/terms)
-   [Privacy](/privacy)
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 19.4s)

_Thinking:_

The user wants me to check the website https://superset.sh/team. I fetched it. Summarize concisely.

Also earlier they asked about "supersets.sh" — it's actually superset.sh, a product (IDE/agent orchestration tool). So maybe they wanted understanding of how superset.sh works. Let me give a concise summary of the team page.

**superset.sh/team** loads fine (title: "About | Superset").

- **Product**: Superset — a desktop IDE/agent-orchestration tool ("self-improving software"), started as a Nov 2025 hackathon worktree manager; now claims tens of thousands of engineers, $11M raised, GitHub ~14.7k stars
- **Founders**: Kiet Ho (CEO, ex-CTO Onlook YC W25), Satya Patel (CTO, ex-CTO Untether Labs YC W23), Avi Peltz (CPO, ex-CTO Adam YC W25) — all 3 ex-YC CTOs
- **Links**: docs, pricing, marketplace, SOC 2 Type II trust page, `brew install superset-sh/tap/superset`
- No broken sections; hiring in SF

Note: you asked about `supersets.sh` earlier — that file doesn't exist locally; this is the website. Want me to fetch docs/docs.superset.sh to explain how the tool works?

---

## User

how to make it work with qm?

---

## Assistant (Build · MiMo-V2.6-Flash Free · 19.0s)

_Thinking:_

The user asks "how to make it work with qm?" — qm likely refers to something. Context: Superset (IDE/agent tool). "qm" could be QEMU's `qm` (Proxmox qm command)? Or maybe a tool called "qm"? Given repo context "own-your-intelligence" with handoff docs... Let me think.

Ambiguous. Possibly "qm" = a CLI? Let me search the codebase/docs for "qm".

**Tool: grep**

**Input:**
```json
{
  "pattern": "\\bqm\\b",
  "path": "/Users/kgensupertramp/Desktop/own-your-intelligence"
}
```

**Output:**
```
Found 19 matches
/Users/kgensupertramp/Desktop/own-your-intelligence/ARCHITECTURE.md:
  Line 104: | **CLIs you drive** | `gbrain`, `memorable`, `ufo` / `ufoctl`, `qm`, `superset` CLI/MCP/SDK, River API | Sponsors do the heavy lifting |


/Users/kgensupertramp/Desktop/own-your-intelligence/harmony-engineering-handoff/04-upstream-forks-and-integration.md:
  Line 5: Use one developer workspace with four independent repositories: harmony, ufo, qm, and gbrain. The harmony repository owns these documents, shared schemas, contract fixtures, local orchestration, infrastructure, integration tests, and the release lock. The other repositories preserve their own Git history and language/tooling. Cross-repository changes land under one integration change ID and are released only as a tested set.

  Line 7: Canonical upstreams are https://github.com/ufo-ai/ufo-core, https://github.com/yc-software/qm, and https://github.com/garrytan/gbrain. The relevant UFO is ufo-ai/ufo-core; neither Microsoft/UFO nor the earlier paired-machine product description is the implementation baseline.

  Line 19: git clone https://github.com/yc-software/qm.git qm

  Line 22: git -C qm remote rename origin upstream

  Line 25: git -C qm switch -c harmony/main


/Users/kgensupertramp/Desktop/own-your-intelligence/harmony-engineering-handoff/16-sources-assumptions-and-coverage.md:
  Line 31: | S03 | [QM repository](https://github.com/yc-software/qm) | Organization/scoped harness, Slack/web surfaces, backgrounds and sandbox architecture |

  Line 32: | S04 | [QM swarms](https://github.com/yc-software/qm/blob/main/docs/swarms.md) | Bounded swarms, worker identity/computers, messages, lifetime and delivery constraints |

  Line 33: | S05 | [QM memory providers](https://github.com/yc-software/qm/blob/main/docs/memory-providers.md) | Scope-aware external-memory routing, explicit writes, machine credentials and fail-open configuration caveat |


/Users/kgensupertramp/Desktop/own-your-intelligence/harmony-engineering-handoff/06-api-and-event-contracts.md:
  Line 168: QM callbacks go to a configured /internal/harmony/v1/events/qm endpoint. Requests carry a QM service identity bound to its tenant cell and the task generation. The inbox is committed before acknowledgement. Processing then validates the current state machine. A callback that cannot be authenticated is never persisted as trusted progress.


/Users/kgensupertramp/Desktop/own-your-intelligence/harmony-engineering-handoff/ALL-SPECIFICATIONS.md:
  Line 451: Use one developer workspace with four independent repositories: harmony, ufo, qm, and gbrain. The harmony repository owns these documents, shared schemas, contract fixtures, local orchestration, infrastructure, integration tests, and the release lock. The other repositories preserve their own Git history and language/tooling. Cross-repository changes land under one integration change ID and are released only as a tested set.

  Line 453: Canonical upstreams are https://github.com/ufo-ai/ufo-core, https://github.com/yc-software/qm, and https://github.com/garrytan/gbrain. The relevant UFO is ufo-ai/ufo-core; neither Microsoft/UFO nor the earlier paired-machine product description is the implementation baseline.

  Line 465: git clone https://github.com/yc-software/qm.git qm

  Line 468: git -C qm remote rename origin upstream

  Line 471: git -C qm switch -c harmony/main

  Line 859: QM callbacks go to a configured /internal/harmony/v1/events/qm endpoint. Requests carry a QM service identity bound to its tenant cell and the task generation. The inbox is committed before acknowledgement. Processing then validates the current state machine. A callback that cannot be authenticated is never persisted as trusted progress.

  Line 1980: | S03 | [QM repository](https://github.com/yc-software/qm) | Organization/scoped harness, Slack/web surfaces, backgrounds and sandbox architecture |

  Line 1981: | S04 | [QM swarms](https://github.com/yc-software/qm/blob/main/docs/swarms.md) | Bounded swarms, worker identity/computers, messages, lifetime and delivery constraints |

  Line 1982: | S05 | [QM memory providers](https://github.com/yc-software/qm/blob/main/docs/memory-providers.md) | Scope-aware external-memory routing, explicit writes, machine credentials and fail-open configuration caveat |

```

**Tool: bash**

**Input:**
```json
{
  "command": "which qm; qm --help 2>&1 | head -30; alias | grep -i qm; ls ~/.config 2>/dev/null | head -40"
}
```

**Output:**
```
qm not found
zsh:1: command not found: qm
browseruse
fish
muse
opencode
qm
uv

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 5.3s)

_Thinking:_

There's `~/.config/qm`. So the user has qm installed/configured. Let's look at that config, and also the repo's ARCHITECTURE.md around line 104 to understand how superset and qm are meant to work together.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la ~/.config/qm; find ~/.config/qm -maxdepth 2 -type f | head -30"
}
```

**Output:**
```
total 8
drwxr-xr-x  4 kgensupertramp  staff  128 Sep 27 14:58 .
drwxr-xr-x  8 kgensupertramp  staff  256 Sep 27 14:57 ..
-rw-------  1 kgensupertramp  staff  197 Sep 27 15:11 dev.env
drwx------  3 kgensupertramp  staff   96 Sep 27 15:09 slack-pool
/Users/kgensupertramp/.config/qm/dev.env
/Users/kgensupertramp/.config/qm/slack-pool/pool1.env

```

**Tool: read**

**Input:**
```json
{
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/ARCHITECTURE.md"
}
```

**Output:**
```
<path>/Users/kgensupertramp/Desktop/own-your-intelligence/ARCHITECTURE.md</path>
<type>file</type>
<content>
1: # Feedback → Feature Factory
2: 
3: Google reviews drive a software factory: pick features and bug fixes, PM/QA subagents spec each one, engineering opens PRs, a company-brain reviewer checks them, a human merges to main.
4: 
5: ## Pipeline
6: 
7: ```mermaid
8: flowchart LR
9:   Reviews[Google_reviews] --> BigAgent[Company_agent]
10:   BigAgent --> Pick[X_features_or_bugs]
11:   Pick --> PM[PM_QA_subagent]
12:   PM --> Spec[Mockup_plus_why]
13:   Spec --> Eng[Engineering_agent]
14:   Eng --> PR[GitHub_PR]
15:   PR --> Review[Review_agent]
16:   Review --> Human[Human_merge_to_main]
17: ```
18: 
19: 1. **Google reviews → decide** — Company agent reads reviews (API and/or browser), clusters pain into **X features or bug fixes**, ranked with quotes as evidence. Writes themes into the **company GBrain**.
20: 2. **Per-feature PM/QA subagent** — For each item, a subagent acts like a PM/QA: mockup / acceptance criteria / what to fix or add **and why** (tied to review quotes + company constraints). Writes into that item’s **PR GBrain**.
21: 3. **Engineering agent** — Implements from the PM/QA spec and opens a **PR** (Superset).
22: 4. **Code review agent** — Reviews the PR with access to the **company GBrain** (full product knowledge) plus that PR’s GBrain (spec, decisions, review evidence).
23: 5. **Human merge** — Only a real human merges to `main`. Agents never auto-merge.
24: 
25: ## Memory model
26: 
27: | Brain | Scope | Holds | Who uses it |
28: | --- | --- | --- | --- |
29: | **Company GBrain** | Whole business | Product docs, brand, past decisions, all review themes, shipping norms | **One big company agent**; review agent; any agent that needs “everything about the business” |
30: | **PR GBrain** | One feature / one PR | That item’s reviews evidence, PM/QA mockup & why, eng notes, review comments | Feature subagents for that PR only |
31: 
32: ```mermaid
33: flowchart TB
34:   CompanyBrain[Company_GBrain]
35:   BigAgent[Big_company_agent]
36: 
37:   BigAgent --- CompanyBrain
38: 
39:   subgraph pr1 [PR_1]
40:     PRBrain1[PR_GBrain]
41:     PM1[PM_QA_subagent]
42:     Eng1[Eng_agent]
43:     PM1 --- PRBrain1
44:     Eng1 --- PRBrain1
45:   end
46: 
47:   subgraph pr2 [PR_2]
48:     PRBrain2[PR_GBrain]
49:     PM2[PM_QA_subagent]
50:     Eng2[Eng_agent]
51:     PM2 --- PRBrain2
52:     Eng2 --- PRBrain2
53:   end
54: 
55:   CompanyBrain --> Pick[X_items]
56:   Pick --> pr1
57:   Pick --> pr2
58:   ReviewAgent[Review_agent] --- CompanyBrain
59:   ReviewAgent --- PRBrain1
60:   ReviewAgent --- PRBrain2
61: ```
62: 
63: - **Big agent** = single brain of the business (company GBrain). Decides what to build from Google reviews; answers cross-cutting questions; company-aware code review draws on it.
64: - **Smaller GBrain per PR** = isolation so feature work stays scoped; PM/QA and eng for that PR don’t pollute (or get polluted by) other PRs’ drafts.
65: - PR brains can **ask up** to the company agent / company GBrain when they need global context (“does dark mode conflict with brand?”).
66: 
67: ## Sponsor map
68: 
69: | Sponsor | Role |
70: | --- | --- |
71: | **UFO** | Business agent OS — home of the **big company agent**; founder/PM chat; kick off “read reviews → ship X”; human sees review verdicts before merge |
72: | **QM** | Multiplayer harness — scopes for discovery, per-feature PM/QA subagents, review agent |
73: | **GBrain** | Company brain + one brain per PR (slug/source prefixes or bound scopes) |
74: | **Memorable** | Procedural memory — how we scrape/cluster reviews, how we write a PM spec, how we open a PR |
75: | **Superset** | Engineering agents — implement + open PRs in worktrees |
76: | **River** | Train the company/orchestrator agent on this business’s docs + accepted specs so review→feature taste is owned |
77: 
78: ## Demo surface
79: 
80: **AcmePulse** — fake SaaS with intentional gaps that Google-style reviews complain about.
81: 
82: **Reviews** — real Google reviews for a similar public product (and/or Places API), plus fixtures so the demo still runs if scrape fails. Live path is first-class: reviews in → X items out.
83: 
84: ## Agent jobs
85: 
86: | Agent | Knows | Does |
87: | --- | --- | --- |
88: | **Company agent** (big) | Company GBrain (+ River model) | Ingest Google reviews; choose X features/bugs; answer business questions; hand work to subagents |
89: | **PM/QA subagent** (per item) | PR GBrain; can query company GBrain | Mockup / AC / “what + why” from review evidence |
90: | **Engineering agent** | PR GBrain spec + repo | Implement; open PR |
91: | **Review agent** | Company GBrain + that PR GBrain | Code review against product truth and the PM/QA why |
92: | **Human** | GitHub | Merge to `main` only |
93: 
94: ## What this repo actually is
95: 
96: **Not** mostly “Python that calls Superset.”
97: 
98: | Layer | What it is | Approx. share of work |
99: | --- | --- | --- |
100: | **`apps/acmepulse`** | Fake SaaS the factory ships into (UI + intentional bugs) | Product demo surface |
101: | **`factory/`** | Thin Python glue: fetch Google reviews, cluster, write GBrain, kick pipeline stages | Small — orchestration, not the brains |
102: | **`agents/`** | Prompts, skills, UFO/QM agent configs — company agent, PM/QA, review | Most of the “intelligence” behavior |
103: | **`memory/`** | Seed content for company GBrain + templates for per-PR brains | Docs the big agent knows |
104: | **CLIs you drive** | `gbrain`, `memorable`, `ufo` / `ufoctl`, `qm`, `superset` CLI/MCP/SDK, River API | Sponsors do the heavy lifting |
105: 
106: **Eng step:** company/PM agents (or a small Python step) spawn work via **Superset CLI / MCP / SDK** (`superset new "…"`, or `agents_create`) against `apps/acmepulse` — they do not reimplement coding agents in Python.
107: 
108: ```text
109: factory (thin)     →  reviews in, GBrain writes, “start eng”
110: UFO / QM agents    →  decide X, PM/QA specs, review
111: Superset           →  implement + open PR
112: Human              →  merge main
113: ```
114: 
115: ## Folder structure
116: 
117: ```text
118: intel/
119: ├── ARCHITECTURE.md
120: ├── README.md
121: ├── apps/
122: │   └── acmepulse/                 # fake SaaS (Next.js or similar)
123: │       ├── app/                   # intentional gaps reviews complain about
124: │       ├── package.json
125: │       └── ...
126: ├── factory/                       # thin Python orchestration
127: │   ├── pyproject.toml
128: │   ├── explore.py                 # Google reviews ingest (API + fixture fallback)
129: │   ├── cluster.py                 # themes → candidate features/bugs
130: │   ├── gbrain_sync.py             # write company / PR brain notes
131: │   ├── pipeline.py                # stage runner: decide → pm → eng → review
132: │   ├── superset_spawn.py          # CLI/SDK: open workspace + coding agent
133: │   └── fixtures/
134: │       └── reviews.json           # demo-safe review corpus
135: ├── agents/                        # agent definitions (not heavy app code)
136: │   ├── company/                   # big agent — full company GBrain
137: │   │   ├── SYSTEM.md
138: │   │   └── skills/
139: │   ├── pm_qa/                     # per-feature subagent
140: │   │   └── SYSTEM.md
141: │   ├── review/                    # company-aware code review
142: │   │   └── SYSTEM.md
143: │   └── ufo/                       # UFO pack/extension or prompt wiring
144: │       └── ...
145: ├── memory/
146: │   ├── company/                   # seed notes → company GBrain
147: │   │   ├── product.md
148: │   │   ├── brand.md
149: │   │   ├── decisions.md
150: │   │   └── reviews/               # ingested themes land here conceptually
151: │   └── pr/                        # template for per-PR GBrain slug
152: │       └── TEMPLATE.md
153: ├── river/                         # optional train set for orchestrator taste
154: │   ├── dataset.jsonl
155: │   └── train_notes.md
156: └── demo/
157:     ├── SCRIPT.md                  # live demo beats
158:     └── screenshots/
159: ```
160: 
161: **GBrain layout (logical, inside GBrain — not necessarily all files on disk):**
162: 
163: ```text
164: company/                 # big brain
165:   product, brand, decisions, review-themes
166: pr/<feature-id>/         # small brain per PR
167:   evidence, pm-spec, mockup, eng-notes, review
168: ```
169: 
170: ## Pitch (30s)
171: 
172: “Google reviews decide what to build. A company agent with a full **GBrain** picks X fixes. Each gets a PM/QA subagent and its own PR brain, Superset ships the PR, a reviewer with the company brain checks it, and a human merges. We don’t rent intelligence—we own the business memory and the factory.”

(End of file - total 172 lines)
</content>
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 25.4s)

_Thinking:_

Now the user wants: "how to make it work with qm?" — i.e., how to make Superset work with QM (the multiplayer harness, yc-software/qm). Context: their architecture uses Superset for engineering agents and QM as multiplayer harness for subagents.

I should research: QM repo docs (github.com/yc-software/qm) and Superset's MCP/CLI/API to find integration points. Also the handoff docs (04-upstream-forks-and-integration.md, 08-agent-roles-and-execution.md, 06-api-and-event-contracts.md) likely describe integration.

Let me read relevant handoff docs and fetch qm repo README + superset docs.

Do parallel: read 04 and 08 docs, fetch github qm README, fetch superset docs (docs.superset.sh) for MCP/CLI.

Note: I should be careful — is yc-software/qm real? Might be fictional. Web fetch will tell.

Let's do it.

**Tool: webfetch**

**Input:**
```json
{
  "url": "https://github.com/yc-software/qm",
  "format": "markdown"
}
```

**Output:**
```
                                                                                                               GitHub - yc-software/qm: Multiplayer agent harness for work. · GitHub                                             

[Skip to content](#start-of-content)     

    

            

## Navigation Menu

[](/)

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Fyc-software%2Fqm)

Appearance settings

-   Platform
    
    -   AI CODE CREATION
        
        -   [GitHub CopilotWrite better code with AI](https://github.com/features/copilot)
        -   [GitHub Copilot appDirect agents from issue to merge](https://github.com/features/ai/github-app)
        -   [MCP RegistryIntegrate external tools](https://github.com/mcp)
        
    -   DEVELOPER WORKFLOWS
        
        -   [ActionsAutomate any workflow](https://github.com/features/actions)
        -   [CodespacesInstant dev environments](https://github.com/features/codespaces)
        -   [IssuesPlan and track work](https://github.com/features/issues)
        -   [Code ReviewManage code changes](https://github.com/features/code-review)
        -   [Code QualityEnforce quality at merge](https://github.com/features/code-quality)
        
    -   APPLICATION SECURITY
        
        -   [GitHub Advanced SecurityFind and fix vulnerabilities](https://github.com/security/advanced-security)
        -   [Code securitySecure your code as you build](https://github.com/security/advanced-security/code-security)
        -   [Secret protectionStop leaks before they start](https://github.com/security/advanced-security/secret-protection)
        
    -   EXPLORE
        
        -   [Why GitHub](https://github.com/why-github)
        -   [Documentation](https://docs.github.com)
        -   [Blog](https://github.blog)
        -   [Changelog](https://github.blog/changelog)
        -   [Marketplace](https://github.com/marketplace)
        
    
    [View all features](https://github.com/features)
    
-   Solutions
    
    -   BY COMPANY SIZE
        
        -   [Enterprises](https://github.com/enterprise)
        -   [Small and medium teams](https://github.com/team)
        -   [Startups](https://github.com/enterprise/startups)
        -   [Nonprofits](https://github.com/solutions/industry/nonprofits)
        
    -   BY USE CASE
        
        -   [App Modernization](https://github.com/solutions/use-case/app-modernization)
        -   [DevSecOps](https://github.com/solutions/use-case/devsecops)
        -   [DevOps](https://github.com/solutions/use-case/devops)
        -   [CI/CD](https://github.com/solutions/use-case/ci-cd)
        -   [View all use cases](https://github.com/solutions/use-case)
        
    -   BY INDUSTRY
        
        -   [Healthcare](https://github.com/solutions/industry/healthcare)
        -   [Financial services](https://github.com/solutions/industry/financial-services)
        -   [Manufacturing](https://github.com/solutions/industry/manufacturing)
        -   [Government](https://github.com/solutions/industry/government)
        -   [View all industries](https://github.com/solutions/industry)
        
    
    [View all solutions](https://github.com/solutions)
    
-   Resources
    
    -   EXPLORE BY TOPIC
        
        -   [AI](https://github.com/resources/articles?topic=ai)
        -   [Software Development](https://github.com/resources/articles?topic=software-development)
        -   [DevOps](https://github.com/resources/articles?topic=devops)
        -   [Security](https://github.com/resources/articles?topic=security)
        -   [View all topics](https://github.com/resources/articles)
        
    -   EXPLORE BY TYPE
        
        -   [Customer stories](https://github.com/customer-stories)
        -   [Events & webinars](https://github.com/resources/events)
        -   [Ebooks & reports](https://github.com/resources/whitepapers)
        -   [Business insights](https://github.com/solutions/executive-insights)
        -   [GitHub Skills](https://skills.github.com)
        
    -   SUPPORT & SERVICES
        
        -   [Documentation](https://docs.github.com)
        -   [Customer support](https://support.github.com)
        -   [Community forum](https://github.com/orgs/community/discussions)
        -   [Trust center](https://github.com/trust-center)
        -   [Partners](https://github.com/partners)
        
    
    [View all resources](https://github.com/resources)
    
-   Open Source
    
    -   COMMUNITY
        
        -   [GitHub SponsorsFund open source developers](https://github.com/open-source/sponsors)
        
    -   PROGRAMS
        
        -   [Security Lab](https://securitylab.github.com)
        -   [Maintainer Community](https://maintainers.github.com)
        -   [GitHub Stars](https://stars.github.com)
        -   [Archive Program](https://archiveprogram.github.com)
        
    -   REPOSITORIES
        
        -   [Topics](https://github.com/topics)
        -   [Trending](https://github.com/trending)
        -   [Collections](https://github.com/collections)
        
    
-   Enterprise
    
    -   ENTERPRISE SOLUTIONS
        
        -   [Enterprise platformAI-powered developer platform](https://github.com/enterprise)
        
    -   AVAILABLE ADD-ONS
        
        -   [GitHub Advanced SecurityEnterprise-grade security features](https://github.com/security/advanced-security)
        -   [Copilot for BusinessEnterprise-grade AI features](https://github.com/features/copilot/copilot-business)
        -   [Premium SupportEnterprise-grade 24/7 support](https://github.com/enterprise/premium-support)
        
    
-   [Pricing](https://github.com/pricing)

Search/

[Sign in](/login?return_to=https%3A%2F%2Fgithub.com%2Fyc-software%2Fqm)

[Sign up](/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E&source=header-repo&source_repo=yc-software%2Fqm)

Appearance settings

You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert

[yc-software](/yc-software) / **[qm](/yc-software/qm)** Public

-   [Notifications](/login?return_to=%2Fyc-software%2Fqm) You must be signed in to change notification settings
-   [Fork 1.9k](/login?return_to=%2Fyc-software%2Fqm)
-   [Star 15.3k](/login?return_to=%2Fyc-software%2Fqm)
    

-   [Code](/yc-software/qm)
-   [Issues 292](/yc-software/qm/issues)
-   [Pull requests 291](/yc-software/qm/pulls)
-   [Discussions](/yc-software/qm/discussions)
-   [Actions](/yc-software/qm/actions)
-   [Security and quality 0](/yc-software/qm/security)
-   [Insights](/yc-software/qm/pulse)

Additional navigation options

-   [Code](/yc-software/qm)
-   [Issues](/yc-software/qm/issues)
-   [Pull requests](/yc-software/qm/pulls)
-   [Discussions](/yc-software/qm/discussions)
-   [Actions](/yc-software/qm/actions)
-   [Security and quality](/yc-software/qm/security)
-   [Insights](/yc-software/qm/pulse)

 [](/yc-software/qm)

main

[Branches](/yc-software/qm/branches)[Tags](/yc-software/qm/tags)

[](/yc-software/qm/branches)[](/yc-software/qm/tags)

Go to file

Code

Open more actions menu

## Latest commit

## History

[696 Commits](/yc-software/qm/commits/main/)

[](/yc-software/qm/commits/main/)696 Commits

## Folders and files

Name

Name

Last commit message

Last commit date

[.claude](/yc-software/qm/tree/main/.claude ".claude")

[.claude](/yc-software/qm/tree/main/.claude ".claude")

[.codex/skills](/yc-software/qm/tree/main/.codex/skills "This path skips through empty directories")

[.codex/skills](/yc-software/qm/tree/main/.codex/skills "This path skips through empty directories")

[.github/workflows](/yc-software/qm/tree/main/.github/workflows "This path skips through empty directories")

[.github/workflows](/yc-software/qm/tree/main/.github/workflows "This path skips through empty directories")

[.husky](/yc-software/qm/tree/main/.husky ".husky")

[.husky](/yc-software/qm/tree/main/.husky ".husky")

[adrs](/yc-software/qm/tree/main/adrs "adrs")

[adrs](/yc-software/qm/tree/main/adrs "adrs")

[aws/microvm-agent](/yc-software/qm/tree/main/aws/microvm-agent "This path skips through empty directories")

[aws/microvm-agent](/yc-software/qm/tree/main/aws/microvm-agent "This path skips through empty directories")

[cli](/yc-software/qm/tree/main/cli "cli")

[cli](/yc-software/qm/tree/main/cli "cli")

[deploy](/yc-software/qm/tree/main/deploy "deploy")

[deploy](/yc-software/qm/tree/main/deploy "deploy")

[desktop](/yc-software/qm/tree/main/desktop "desktop")

[desktop](/yc-software/qm/tree/main/desktop "desktop")

[docs](/yc-software/qm/tree/main/docs "docs")

[docs](/yc-software/qm/tree/main/docs "docs")

[fly](/yc-software/qm/tree/main/fly "fly")

[fly](/yc-software/qm/tree/main/fly "fly")

[local](/yc-software/qm/tree/main/local "local")

[local](/yc-software/qm/tree/main/local "local")

[plugins](/yc-software/qm/tree/main/plugins "plugins")

[plugins](/yc-software/qm/tree/main/plugins "plugins")

[porter](/yc-software/qm/tree/main/porter "porter")

[porter](/yc-software/qm/tree/main/porter "porter")

[scripts](/yc-software/qm/tree/main/scripts "scripts")

[scripts](/yc-software/qm/tree/main/scripts "scripts")

[skills-seed](/yc-software/qm/tree/main/skills-seed "skills-seed")

[skills-seed](/yc-software/qm/tree/main/skills-seed "skills-seed")

[src](/yc-software/qm/tree/main/src "src")

[src](/yc-software/qm/tree/main/src "src")

[superserve/templates](/yc-software/qm/tree/main/superserve/templates "This path skips through empty directories")

[superserve/templates](/yc-software/qm/tree/main/superserve/templates "This path skips through empty directories")

[test](/yc-software/qm/tree/main/test "test")

[test](/yc-software/qm/tree/main/test "test")

[.dockerignore](/yc-software/qm/blob/main/.dockerignore ".dockerignore")

[.dockerignore](/yc-software/qm/blob/main/.dockerignore ".dockerignore")

[.env.example](/yc-software/qm/blob/main/.env.example ".env.example")

[.env.example](/yc-software/qm/blob/main/.env.example ".env.example")

[.gitignore](/yc-software/qm/blob/main/.gitignore ".gitignore")

[.gitignore](/yc-software/qm/blob/main/.gitignore ".gitignore")

[.node-version](/yc-software/qm/blob/main/.node-version ".node-version")

[.node-version](/yc-software/qm/blob/main/.node-version ".node-version")

[.npmrc](/yc-software/qm/blob/main/.npmrc ".npmrc")

[.npmrc](/yc-software/qm/blob/main/.npmrc ".npmrc")

[.oxlintrc.json](/yc-software/qm/blob/main/.oxlintrc.json ".oxlintrc.json")

[.oxlintrc.json](/yc-software/qm/blob/main/.oxlintrc.json ".oxlintrc.json")

[.prettierignore](/yc-software/qm/blob/main/.prettierignore ".prettierignore")

[.prettierignore](/yc-software/qm/blob/main/.prettierignore ".prettierignore")

[.prettierrc.json](/yc-software/qm/blob/main/.prettierrc.json ".prettierrc.json")

[.prettierrc.json](/yc-software/qm/blob/main/.prettierrc.json ".prettierrc.json")

[AGENTS.md](/yc-software/qm/blob/main/AGENTS.md "AGENTS.md")

[AGENTS.md](/yc-software/qm/blob/main/AGENTS.md "AGENTS.md")

[CLAUDE.md](/yc-software/qm/blob/main/CLAUDE.md "CLAUDE.md")

[CLAUDE.md](/yc-software/qm/blob/main/CLAUDE.md "CLAUDE.md")

[CONTRIBUTING.md](/yc-software/qm/blob/main/CONTRIBUTING.md "CONTRIBUTING.md")

[CONTRIBUTING.md](/yc-software/qm/blob/main/CONTRIBUTING.md "CONTRIBUTING.md")

[LICENSE](/yc-software/qm/blob/main/LICENSE "LICENSE")

[LICENSE](/yc-software/qm/blob/main/LICENSE "LICENSE")

[README.md](/yc-software/qm/blob/main/README.md "README.md")

[README.md](/yc-software/qm/blob/main/README.md "README.md")

[SECURITY.md](/yc-software/qm/blob/main/SECURITY.md "SECURITY.md")

[SECURITY.md](/yc-software/qm/blob/main/SECURITY.md "SECURITY.md")

[deployment.md](/yc-software/qm/blob/main/deployment.md "deployment.md")

[deployment.md](/yc-software/qm/blob/main/deployment.md "deployment.md")

[eslint.config.mjs](/yc-software/qm/blob/main/eslint.config.mjs "eslint.config.mjs")

[eslint.config.mjs](/yc-software/qm/blob/main/eslint.config.mjs "eslint.config.mjs")

[knip.json](/yc-software/qm/blob/main/knip.json "knip.json")

[knip.json](/yc-software/qm/blob/main/knip.json "knip.json")

[package-lock.json](/yc-software/qm/blob/main/package-lock.json "package-lock.json")

[package-lock.json](/yc-software/qm/blob/main/package-lock.json "package-lock.json")

[package.json](/yc-software/qm/blob/main/package.json "package.json")

[package.json](/yc-software/qm/blob/main/package.json "package.json")

[tsconfig.contract.json](/yc-software/qm/blob/main/tsconfig.contract.json "tsconfig.contract.json")

[tsconfig.contract.json](/yc-software/qm/blob/main/tsconfig.contract.json "tsconfig.contract.json")

[tsconfig.json](/yc-software/qm/blob/main/tsconfig.json "tsconfig.json")

[tsconfig.json](/yc-software/qm/blob/main/tsconfig.json "tsconfig.json")

View all files

## Repository files navigation

-   [README](#)
-   [Contributing](#)
-   [MIT license](#)
-   [Security](#)

More items

# qm

[](#qm)

A multiplayer agent harness for work. In Slack and on the web.

## Setup

[](#setup)

Tell your coding agent of choice `Let's deploy https://github.com/yc-software/qm`. From here, it should follow the deployment guide in this repo.

You can also try out a 3rd-party hosted version of QM [here](https://www.agent37.com/qm).

If you're an infra provider interested in offering a hosted version of QM, feel free to reach out.

## What is QM?

[](#what-is-qm)

Most agents are designed like personal assistants. You can make one work for a whole company, but it quickly gets complex. QM is designed for startups. Employees each get their own isolated workspace, and can also collaborate with the agent in channels, group messages, and projects.

Each person and each room has its own scoped memory, files, keychain view, permissions, crons, web apps, and durable sandbox.

It's built with open source in mind. Pick your own harness and model and switch between them. Pi, OpenCode, Codex, and Claude Code all drive the same core, so a deployment isn't tied to any single vendor.

## Features

[](#features)

-   **Personal and shared scopes.** People customize the agent to be *theirs*, and still work with it collaboratively in Slack channels and projects.
-   **Slack and web.** The same identity and configuration carries between Slack and the web app.
-   **Admin control.** Set org-level configuration, security and sharing postures. Choose which harnesses and models are available.
-   **Web apps.** Spin up custom internal apps and publish them to the right people.
-   **Shared skills.** Skills are scope-owned and shareable by grant, with admin-gated promotion to the whole org and skill packs imported from git repositories.
-   **Background work.** Crons, watches, and inbound webhooks work while you're away.

## What you can do with it

[](#what-you-can-do-with-it)

-   Search internal notes, email, documents, databases, and the web together
-   Build internal apps, publish them to the right people, and keep their data current
-   Learn your writing voice from past sends, then triage your inbox on a schedule — labels and reply drafts included
-   Work in an existing repository: run tests, open PRs, monitor CI, check system logs
-   Track a project in a shared channel and post updates and follow-ups

## Architecture

[](#architecture)

flowchart LR
  DB\[("Postgres<br/>sessions · memory · queue")\]

  subgraph CORE\["Headless core"\]
    API\["API · identity · policy · scheduler"\]
    LOOP\["Agent loop<br/>(Pi, OpenCode, Claude Code)"\]
    API <--> LOOP
  end

  SBX\["Per-scope sandbox<br/>files · tools · logged-in services"\]

  DB <--> API
  LOOP <--> SBX

Loading

For durability, set `DATABASE_URL` and `SESSION_STORE=postgres` — without it, sessions live in process memory and vanish on restart. To exercise a branch against a real model and real Postgres, run `npm run dev-instance:web` for web/admin or `npm run dev-instance:slack` for Slack. Use `npm run dev-instance:both` when testing both surfaces together. Bare `npm run dev-instance` defaults to web for new instances and preserves the surface on reload. Switch an existing instance with an explicit surface command.

## Architecture

[](#architecture-1)

Every turn runs through a central core, which can use a variety of models and harnesses to generate the response. A Postgres persistence layer holds user data, session history, and other durable state. The agent has a small, fixed tool surface; one of those tools is `execute`, which runs commands in the scope's own isolated sandbox — its durable computer, where installed tools stay installed. The web UI and admin panel share one service; the portal and optional built-in auth broker share another. These modules communicate with core over its HTTP API. See [combined services](/yc-software/qm/blob/main/docs/combined-services.md) for configuration and migration; Slack is an optional in-process plugin that core starts and supervises through a direct service client.

The core runs TypeScript directly on Node and uses Fastify for HTTP. The Slack plugin uses Bolt; the web UI builds with Vite and renders with Lit.

The core itself is generic. Everything specific to one company — org config, custom tools and skills, sandbox image, infrastructure — lives in a **deployment directory** that the [`qm` CLI](/yc-software/qm/blob/main/cli/README.md) validates and deploys. Every substrate (harness, session store, sandbox, memory) sits behind an interface. Memory can also be routed by scope to [external providers](/yc-software/qm/blob/main/docs/memory-providers.md) while retaining the built-in notebook.

## Security and secrets

[](#security-and-secrets)

QM's approach follows local coding agents like OpenCode, Codex, and Claude Code: the agent acts as the person it's working for, with their credentials and permissions, and everything it does is audited. An org picks one security posture, which narrower scopes can only tighten:

-   **Strict** — every harness tool call pauses for human approval, except the two no-effect turn enders.
-   **Auto** (default) — blocks private-network access and uses a content screener when the deployment configures one. Model screening is off by default; deployments can use an external proxy or explicitly opt into the built-in model classifier.
-   **Dangerous** — no posture-based content screening or tool approval gates.

Deployments can set `securityScreen.allPostures: true` to require external-content screening under every posture, including Dangerous and Strict, without changing tool approvals or private-network policy. Flagged content still requires release approval.

The predeclared command policy — approval rules and hard denials for things like recursive deletes or destructive SQL — applies in every posture, Dangerous included.

Sharing posture is independent:

-   **Isolated** (default) — resources stay in their scope unless explicitly shared.
-   **Open** — on a live authenticated internal human turn, the speaker's opted-in personal files, artifacts, skills, and memory may be read in an opted-in shared room.

[`SECURITY.md`](/yc-software/qm/blob/main/SECURITY.md) has the threat model, the operator assumptions, and the known limitations.

## Deploy it for your org

[](#deploy-it-for-your-org)

Create an organization-owned deployment repository that depends on `@yc-software/qm`:

npm exec --yes --package=@yc-software/qm@latest -- \\
  qm init . --org <slug\> --target <fly-or-aws\>
npm install

Initialization materializes a deployment skill for an agent and walks through infrastructure, web sign-in, connector credentials, optional Slack access, deployment, and live verification — no source checkout required. Each deployment runs in the operator's own cloud account; initialization does not generate or enable deployment CI, and this repository has no production deployment workflow. See [`deployment.md`](/yc-software/qm/blob/main/deployment.md) for the details.

## Contributing

[](#contributing)

We take contributions as *human-written* text, not code — see [`CONTRIBUTING.md`](/yc-software/qm/blob/main/CONTRIBUTING.md). Describe the change you'd like informally in a `.txt` or `.md` file in [`adrs/`](/yc-software/qm/blob/main/adrs), and if we're aligned we'll handle the implementation. Report vulnerabilities privately — see [`SECURITY.md`](/yc-software/qm/blob/main/SECURITY.md), not a public issue.

## Customize your instance

[](#customize-your-instance)

Choose how you want to customize QM:

-   **Config, tools, skills, and services:** use the deployment repository above. It pins `@yc-software/qm` and uses that release's runtime images; no source copy is needed.
-   **Changes to QM itself:** keep your own source fork, public or private. You may modify any part of core, including the runtime, plugins, CLI, docs, and CI. Contributing those changes upstream is optional.

### Create a source fork

[](#create-a-source-fork)

For a private source fork, create a standalone private repository, outside GitHub's fork network. Seed only `main` and explicitly set it as the default branch:

gh repo create <org\>/qm-private --private
git clone --single-branch --branch main --no-tags git@github.com:yc-software/qm qm-private
git -C qm-private remote rename origin upstream
git -C qm-private remote add origin git@github.com:<org\>/qm-private
git -C qm-private push -u origin main
gh repo edit <org\>/qm-private --default-branch main

Do not seed with `git push --mirror`: it copies unrelated upstream branches and tags, leaves default-branch selection implicit, and can delete destination-only refs on later pushes. The `upstream` remote supplies source updates without copying those refs to your repository. For a public source fork, GitHub's Fork button is also an option. A GitHub fork of a public repository cannot be private; keep private work outside that network.

Review inherited workflows before enabling Actions or adding credentials. Choose the CI checks you want, and disable or adapt upstream release and publishing workflows for your own package and image registries. Copying the source does not configure production deployment CI.

### Customize and run your source

[](#customize-and-run-your-source)

Keep deployment configuration, tools, skills, plugin images, and infrastructure in `deploy/layers/<org>/` in a private source fork, or in a separate private deployment repository when your source is public. Never commit secrets. See [`deploy/layers/README.md`](/yc-software/qm/blob/main/deploy/layers/README.md) for initialization and layout. Keep deployment data separate from core code, but change core wherever your desired behavior requires it.

From the source checkout, install dependencies with `npm ci` and use the in-tree CLI. After completing the provider setup in [`deployment.md`](/yc-software/qm/blob/main/deployment.md), build and deploy your modified services explicitly:

node cli/bin/qm.ts check --config <deployment-dir\>/qm.config.jsonc
node cli/bin/qm.ts plan --config <deployment-dir\>/qm.config.jsonc --build-from .
node cli/bin/qm.ts up --config <deployment-dir\>/qm.config.jsonc --build-from .
node cli/bin/qm.ts check --config <deployment-dir\>/qm.config.jsonc --live

Use this checkout's CLI when changing the CLI itself. Without `--build-from`, the normal deployment path selects published images, so editing source alone does not change the deployed runtime. If you publish custom images instead, configure their immutable references through `imageOverrides`. Follow the provider guide for sandbox image builds; service builds do not replace that step.

### Keep it current

[](#keep-it-current)

For a source fork, `update-qm` merges upstream changes while preserving intentional local behavior. Land sync PRs with their merge ancestry intact, never squash or rebase them. Conflicts are expected maintenance work, not a requirement to discard customizations. Use `upstream-pr` only when you want to contribute a generic change; it prepares a clean upstream branch without private deployment data or history.

For a package deployment, upgrade the exact `@yc-software/qm` dependency and lockfile, review contract changes and generated assets, then validate and deploy. There is no upstream source history to merge.

## Going deeper

[](#going-deeper)

-   [`docs/getting-started.md`](/yc-software/qm/blob/main/docs/getting-started.md) — first run, end to end
-   [`cli/README.md`](/yc-software/qm/blob/main/cli/README.md) — the `qm` CLI and the deployment directory contract
-   [`docs/deploy-directory.md`](/yc-software/qm/blob/main/docs/deploy-directory.md) — the deployment directory in full
-   [`docs/principal-links.md`](/yc-software/qm/blob/main/docs/principal-links.md) — one person, several sign-ins: linking principals
-   [`docs/porter.md`](/yc-software/qm/blob/main/docs/porter.md) — running qm on Porter
-   [`docs/superserve.md`](/yc-software/qm/blob/main/docs/superserve.md) — using Superserve for agent sandboxes
-   [`.env.example`](/yc-software/qm/blob/main/.env.example) — every knob, documented in place
-   [`docs/swarms.md`](/yc-software/qm/blob/main/docs/swarms.md) — durable agent pools, scoped messages, and blank Modal workers
-   [`docs/model-gateway.md`](/yc-software/qm/blob/main/docs/model-gateway.md) — discover and route models through a gateway
-   [`plugins/`](/yc-software/qm/blob/main/plugins) — the surfaces (Slack, web UI, admin, portal)

## License

[](#license)

Except where otherwise noted, QM is available under the [MIT License](/yc-software/qm/blob/main/LICENSE).

## About

Multiplayer agent harness for work.

[x.com/qm\_\_dev](https://x.com/qm__dev)

### Topics

[ai](/topics/ai)[assistant](/topics/assistant)[harness](/topics/harness)[qm](/topics/qm)

### Resources

[Readme](#readme-ov-file)

[MIT license](#MIT-1-ov-file)

### Contributing

[Contributing](#contributing-ov-file)

### Security policy

[Security policy](#security-ov-file)

[Activity](/yc-software/qm/activity)

[Custom properties](/yc-software/qm/custom-properties)

### Stars

**15.3k** stars

### Watchers

**75** watching

### Forks

[**1.9k** forks](/yc-software/qm/forks)

[Report repository](/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2Fyc-software%2Fqm&report=yc-software+%28user%29)

## Releases

## Packages

## Used by

## Contributors

## Languages

## Footer

[](https://github.com)© 2026 GitHub, Inc.

### Footer navigation

-   [Terms](https://docs.github.com/site-policy/github-terms/github-terms-of-service)
-   [Privacy](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement)
-   [Security](https://github.com/security)
-   [Status](https://www.githubstatus.com/)
-   [Community](https://github.community/)
-   [Docs](https://docs.github.com/)
-   [Contact](https://support.github.com?tags=dotcom-footer)
-   Manage cookies
-   Do not share my personal information

You can’t perform that action at this time.
```

**Tool: webfetch**

**Input:**
```json
{
  "url": "https://docs.superset.sh",
  "format": "markdown"
}
```

**Output:**
```
Superset Documentation | Superset Docs

[Superset](https://superset.sh)

[Changelog](https://superset.sh/changelog)[Website](https://superset.sh)[](https://github.com/superset-sh/superset)-   English日本語简体中文Français한국어繁體中文EspañolDeutschPortuguês (Brasil)ItalianoРусскийTürkçePolskiNederlandsBahasa IndonesiaČeštinaTiếng Việt
[Download](https://superset.sh/download)

Get Started

[What is Superset?](/overview)[Install](/install)[Your First Parallel Session](/first-workspace)[The Superset Model](/superset-model)

Recipes

[Race Agents on One Task](/recipes/race-agents)[Run Three Workstreams at Once](/recipes/parallel-workstreams)[Clear PR Feedback in the Background](/recipes/pr-feedback)[Fan Out a Big Refactor](/recipes/fan-out-refactor)[Wake Up to a Finished Audit](/recipes/nightly-audit)[Command Your Fleet from the CLI](/recipes/command-your-fleet)[Drive Superset from Your Agent](/recipes/agent-driven-superset)[Agent Orchestration](/orchestration)

Core Features

[Workspaces](/workspaces)[Diff Viewer](/diff-viewer)[Editor & Files](/editor)[Terminal](/terminal-integration)[Port Management](/ports)[In-App Browser](/browser)[Computer Control](/computer)[Pages](/pages)[AI Agents](/agent-integration)[Agent Status & Notifications](/agent-status)[Tasks](/tasks)[Pull Requests](/pull-requests)[Remote Access](/remote-access)[Automations](/automations)[Usage](/usage)[Skills](/skills)[Superset MCP Server](/mcp-server)

CLI

[Getting Started](/cli/getting-started)[Superset CLI Reference](/cli/cli-reference)[Host Server](/cli/host-server)[Environment variables](/cli/env-vars)

TypeScript SDK

[Getting Started](/sdk/getting-started)[Superset SDK Reference](/sdk/reference)[Advanced Usage](/sdk/advanced)

Integrations

[IDE Integration](/use-with-ide)[Linear Integration](/use-with-linear)[Slack Integration](/use-with-slack)[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers)

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts)[Monorepos](/using-monorepos)[Terminal Scripts](/terminal-scripts)[Keyboard Shortcuts](/keyboard-shortcuts)[Custom Themes](/custom-themes)[Customization](/customization)

Help

[Troubleshooting](/troubleshooting)[FAQ](/faq)[Community & Support](/community)

Search docs...⌘K

Get Started

[What is Superset?](/overview "What is Superset?")[Install](/install "Install")[Your First Parallel Session](/first-workspace "Your First Parallel Session")[The Superset Model](/superset-model "The Superset Model")

Recipes

[Race Agents on One Task](/recipes/race-agents "Race Agents on One Task")[Run Three Workstreams at Once](/recipes/parallel-workstreams "Run Three Workstreams at Once")[Clear PR Feedback in the Background](/recipes/pr-feedback "Clear PR Feedback in the Background")[Fan Out a Big Refactor](/recipes/fan-out-refactor "Fan Out a Big Refactor")[Wake Up to a Finished Audit](/recipes/nightly-audit "Wake Up to a Finished Audit")[Command Your Fleet from the CLI](/recipes/command-your-fleet "Command Your Fleet from the CLI")[Drive Superset from Your Agent](/recipes/agent-driven-superset "Drive Superset from Your Agent")[Agent Orchestration](/orchestration "Agent Orchestration")

Core Features

[Workspaces](/workspaces "Workspaces")[Diff Viewer](/diff-viewer "Diff Viewer")[Editor & Files](/editor "Editor & Files")[Terminal](/terminal-integration "Terminal")[Port Management](/ports "Port Management")[In-App Browser](/browser "In-App Browser")[Computer Control](/computer "Computer Control")[Pages](/pages "Pages")[AI Agents](/agent-integration "AI Agents")[Agent Status & Notifications](/agent-status "Agent Status & Notifications")[Tasks](/tasks "Tasks")[Pull Requests](/pull-requests "Pull Requests")[Remote Access](/remote-access "Remote Access")[Automations](/automations "Automations")[Usage](/usage "Usage")[Skills](/skills "Skills")[Superset MCP Server](/mcp-server "Superset MCP Server")

CLI

[Getting Started](/cli/getting-started "Getting Started")[Superset CLI Reference](/cli/cli-reference "Superset CLI Reference")[Host Server](/cli/host-server "Host Server")[Environment variables](/cli/env-vars "Environment variables")

TypeScript SDK

[Getting Started](/sdk/getting-started "Getting Started")[Superset SDK Reference](/sdk/reference "Superset SDK Reference")[Advanced Usage](/sdk/advanced "Advanced Usage")

Integrations

[IDE Integration](/use-with-ide "IDE Integration")[Linear Integration](/use-with-linear "Linear Integration")[Slack Integration](/use-with-slack "Slack Integration")[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers "Use with OpenRouter, Bedrock, Vertex, or Vercel")

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts "Project Lifecycle Scripts")[Monorepos](/using-monorepos "Monorepos")[Terminal Scripts](/terminal-scripts "Terminal Scripts")[Keyboard Shortcuts](/keyboard-shortcuts "Keyboard Shortcuts")[Custom Themes](/custom-themes "Custom Themes")[Customization](/customization "Customization")

Help

[Troubleshooting](/troubleshooting "Troubleshooting")[FAQ](/faq "FAQ")[Community & Support](/community "Community & Support")

On this page

# Superset Documentation

Run AI coding agents in parallel, each in its own isolated workspace

Copy MarkdownOpen in

Superset gives every task its own isolated git worktree, so you can delegate to many agents at once and integrate the results through ordinary branches and PRs.

![The Superset home screen: describe a task, pick an agent, go](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprompt-first.1ecsaxm7lzgu-.png&w=3840&q=75)

## [Start Here](#start-here)

[

### What is Superset?

The 60-second version.



](/overview)[

### Install

Requirements and first launch. Two minutes.



](/install)[

### Your First Parallel Session

Three agents in parallel, ship the winner. Ten minutes.



](/first-workspace)[

### The Superset Model

The five concepts everything else builds on.



](/superset-model)

## [What You Can Do](#what-you-can-do)

[

### Race agents on one task

Same prompt, multiple agents, isolated branches. Merge the best diff.



](/recipes/race-agents)[

### Run parallel workstreams

A feature, a bugfix, and a PR review at once, without branch juggling.



](/recipes/parallel-workstreams)[

### Review and ship

Stage, commit, push, and open PRs from the built-in diff viewer.



](/diff-viewer)[

### Automate maintenance

Schedule agent sessions; wake up to a reviewable workspace.



](/automations)[

### Bring any agent

Claude Code, Codex, Amp, Gemini, and more, or the built-in chat.



](/agent-integration)[

### Work across devices

Reach workspaces hosted on another machine through the relay.



](/remote-access)

## [Build On It](#build-on-it)

[

### CLI

Drive projects, workspaces, and automations from the command line.



](/cli/getting-started)[

### TypeScript SDK

Programmatic access to everything the CLI can do.



](/sdk/getting-started)[

### MCP Server

Let agents drive Superset itself over MCP.



](/mcp-server)

## [Help](#help)

Stuck? Check [Troubleshooting](/troubleshooting) and the [FAQ](/faq), or [open an issue](https://github.com/superset-sh/superset/issues).

[Edit on GitHub](https://github.com/superset-sh/superset/blob/main/apps/docs/content/docs/index.mdx)
```

**Tool: grep**

**Input:**
```json
{
  "path": "/Users/kgensupertramp/Desktop/own-your-intelligence/harmony-engineering-handoff",
  "pattern": "[Ss]uperset",
  "include": "08-agent-roles-and-execution.md"
}
```

**Output:**
```
No files found
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 15.4s)

_Thinking:_

The user wants: "how to make it work with qm?" — i.e., integrate Superset with QM.

I should figure out concrete integration paths:
1. Superset side: MCP server, CLI (`superset new`), SDK, automations, "Drive Superset from Your Agent" recipe.
2. QM side: custom tools/skills in deployment directory, harness selection (OpenCode etc.), swarms, memory providers. Also QM agent can run commands in its sandbox — so a QM skill that shells out to `superset` CLI, or connects to Superset MCP.

Key question: does QM run on the same machine as Superset (host server)? Superset has "Host Server" CLI doc and remote access. QM's sandbox is per-scope durable sandbox — so the QM agent's `execute` tool runs in QM's sandbox, not on the user's Mac. So integration requires either: Superset running as a reachable host server with API token, QM skill calling Superset's HTTP API/MCP, or Superset's relay/remote access.

Let me fetch two key docs: superset "Drive Superset from Your Agent" (recipes/agent-driven-superset) and CLI host-server, plus mcp-server page; and QM docs on custom tools/skills (deploy-directory.md) to know where to add a tool.

I'll fetch a few in parallel. Also maybe qm docs/getting-started and skills-seed.

Let's fetch:
- https://docs.superset.sh/recipes/agent-driven-superset
- https://docs.superset.sh/mcp-server
- https://docs.superset.sh/cli/host-server
- https://github.com/yc-software/qm/blob/main/docs/deploy-directory.md (raw)

Use raw.githubusercontent for qm docs.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://docs.superset.sh/recipes/agent-driven-superset"
}
```

**Output:**
```
Drive Superset from Your Agent | Superset Docs

[Superset](https://superset.sh)

[Changelog](https://superset.sh/changelog)[Website](https://superset.sh)[](https://github.com/superset-sh/superset)-   English日本語简体中文Français한국어繁體中文EspañolDeutschPortuguês (Brasil)ItalianoРусскийTürkçePolskiNederlandsBahasa IndonesiaČeštinaTiếng Việt
[Download](https://superset.sh/download)

Get Started

[What is Superset?](/overview)[Install](/install)[Your First Parallel Session](/first-workspace)[The Superset Model](/superset-model)

Recipes

[Race Agents on One Task](/recipes/race-agents)[Run Three Workstreams at Once](/recipes/parallel-workstreams)[Clear PR Feedback in the Background](/recipes/pr-feedback)[Fan Out a Big Refactor](/recipes/fan-out-refactor)[Wake Up to a Finished Audit](/recipes/nightly-audit)[Command Your Fleet from the CLI](/recipes/command-your-fleet)[Drive Superset from Your Agent](/recipes/agent-driven-superset)[Agent Orchestration](/orchestration)

Core Features

[Workspaces](/workspaces)[Diff Viewer](/diff-viewer)[Editor & Files](/editor)[Terminal](/terminal-integration)[Port Management](/ports)[In-App Browser](/browser)[Computer Control](/computer)[Pages](/pages)[AI Agents](/agent-integration)[Agent Status & Notifications](/agent-status)[Tasks](/tasks)[Pull Requests](/pull-requests)[Remote Access](/remote-access)[Automations](/automations)[Usage](/usage)[Skills](/skills)[Superset MCP Server](/mcp-server)

CLI

[Getting Started](/cli/getting-started)[Superset CLI Reference](/cli/cli-reference)[Host Server](/cli/host-server)[Environment variables](/cli/env-vars)

TypeScript SDK

[Getting Started](/sdk/getting-started)[Superset SDK Reference](/sdk/reference)[Advanced Usage](/sdk/advanced)

Integrations

[IDE Integration](/use-with-ide)[Linear Integration](/use-with-linear)[Slack Integration](/use-with-slack)[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers)

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts)[Monorepos](/using-monorepos)[Terminal Scripts](/terminal-scripts)[Keyboard Shortcuts](/keyboard-shortcuts)[Custom Themes](/custom-themes)[Customization](/customization)

Help

[Troubleshooting](/troubleshooting)[FAQ](/faq)[Community & Support](/community)

Search docs...⌘K

Get Started

[What is Superset?](/overview "What is Superset?")[Install](/install "Install")[Your First Parallel Session](/first-workspace "Your First Parallel Session")[The Superset Model](/superset-model "The Superset Model")

Recipes

[Race Agents on One Task](/recipes/race-agents "Race Agents on One Task")[Run Three Workstreams at Once](/recipes/parallel-workstreams "Run Three Workstreams at Once")[Clear PR Feedback in the Background](/recipes/pr-feedback "Clear PR Feedback in the Background")[Fan Out a Big Refactor](/recipes/fan-out-refactor "Fan Out a Big Refactor")[Wake Up to a Finished Audit](/recipes/nightly-audit "Wake Up to a Finished Audit")[Command Your Fleet from the CLI](/recipes/command-your-fleet "Command Your Fleet from the CLI")[Drive Superset from Your Agent](/recipes/agent-driven-superset "Drive Superset from Your Agent")[Agent Orchestration](/orchestration "Agent Orchestration")

Core Features

[Workspaces](/workspaces "Workspaces")[Diff Viewer](/diff-viewer "Diff Viewer")[Editor & Files](/editor "Editor & Files")[Terminal](/terminal-integration "Terminal")[Port Management](/ports "Port Management")[In-App Browser](/browser "In-App Browser")[Computer Control](/computer "Computer Control")[Pages](/pages "Pages")[AI Agents](/agent-integration "AI Agents")[Agent Status & Notifications](/agent-status "Agent Status & Notifications")[Tasks](/tasks "Tasks")[Pull Requests](/pull-requests "Pull Requests")[Remote Access](/remote-access "Remote Access")[Automations](/automations "Automations")[Usage](/usage "Usage")[Skills](/skills "Skills")[Superset MCP Server](/mcp-server "Superset MCP Server")

CLI

[Getting Started](/cli/getting-started "Getting Started")[Superset CLI Reference](/cli/cli-reference "Superset CLI Reference")[Host Server](/cli/host-server "Host Server")[Environment variables](/cli/env-vars "Environment variables")

TypeScript SDK

[Getting Started](/sdk/getting-started "Getting Started")[Superset SDK Reference](/sdk/reference "Superset SDK Reference")[Advanced Usage](/sdk/advanced "Advanced Usage")

Integrations

[IDE Integration](/use-with-ide "IDE Integration")[Linear Integration](/use-with-linear "Linear Integration")[Slack Integration](/use-with-slack "Slack Integration")[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers "Use with OpenRouter, Bedrock, Vertex, or Vercel")

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts "Project Lifecycle Scripts")[Monorepos](/using-monorepos "Monorepos")[Terminal Scripts](/terminal-scripts "Terminal Scripts")[Keyboard Shortcuts](/keyboard-shortcuts "Keyboard Shortcuts")[Custom Themes](/custom-themes "Custom Themes")[Customization](/customization "Customization")

Help

[Troubleshooting](/troubleshooting "Troubleshooting")[FAQ](/faq "FAQ")[Community & Support](/community "Community & Support")

On this page

Recipes

# Drive Superset from Your Agent

Delegate work in parallel, then make it recurring with the automate skill, without leaving the conversation

Copy MarkdownOpen in

Use when

you're mid-conversation with an agent and the next step is a Superset action (fan this work out in parallel, or make it recur on a schedule) and you'd rather say so than click through the app.

## [The Idea](#the-idea)

Superset ships [skills](/skills) to your coding agents automatically, so the agent in front of you already knows how to run Superset itself. `superset:orchestrate` makes it a coordinator of parallel workers; that has [its own page](/orchestration). This recipe is about the move that follows: `superset:automate` turns anything you've asked for twice into a scheduled [automation](/automations), in the same conversation.

## [Steps](#steps)

1.  Delegate something splittable to the agent you're talking to: "split this migration into independent slices and run a worker on each" ([Agent Orchestration](/orchestration) covers what to ask for and how the coordination works). Review each workspace's diff as it lands.
2.  When the job turns out to be recurring (a dependency sweep, a triage pass, a weekly cleanup), promote it without switching surfaces:

```
That worked. Make it a Superset automation that runs every Monday at 7am
on this project, and walk me through the first run.
```

3.  The agent writes the automation prompt, schedules it, and reviews the first run with you. From then on it's a [workspace waiting for you](/recipes/nightly-audit) instead of a task on your list.

## [Variations](#variations)

-   **Catch up instead of fan out**: "what did my agents do overnight?" gets you a standup digest of finished, blocked, and needs-review work
-   **When Superset itself misbehaves**: "diagnose why this host shows offline" has the agent fix it instead of you reading logs
-   The full list of shipped skills, and how they're delivered and updated, is on the [Skills](/skills) page

[Edit on GitHub](https://github.com/superset-sh/superset/blob/main/apps/docs/content/docs/recipes/agent-driven-superset.mdx)

[

Previous

Command Your Fleet from the CLI

](/recipes/command-your-fleet)[

Next

Agent Orchestration

](/orchestration)

### On this page

[

The Idea](#the-idea)[

Steps](#steps)[

Variations](#variations)
```

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://docs.superset.sh/cli/host-server"
}
```

**Output:**
```
Host Server | Superset Docs

[Superset](https://superset.sh)

[Changelog](https://superset.sh/changelog)[Website](https://superset.sh)[](https://github.com/superset-sh/superset)-   English日本語简体中文Français한국어繁體中文EspañolDeutschPortuguês (Brasil)ItalianoРусскийTürkçePolskiNederlandsBahasa IndonesiaČeštinaTiếng Việt
[Download](https://superset.sh/download)

Get Started

[What is Superset?](/overview)[Install](/install)[Your First Parallel Session](/first-workspace)[The Superset Model](/superset-model)

Recipes

[Race Agents on One Task](/recipes/race-agents)[Run Three Workstreams at Once](/recipes/parallel-workstreams)[Clear PR Feedback in the Background](/recipes/pr-feedback)[Fan Out a Big Refactor](/recipes/fan-out-refactor)[Wake Up to a Finished Audit](/recipes/nightly-audit)[Command Your Fleet from the CLI](/recipes/command-your-fleet)[Drive Superset from Your Agent](/recipes/agent-driven-superset)[Agent Orchestration](/orchestration)

Core Features

[Workspaces](/workspaces)[Diff Viewer](/diff-viewer)[Editor & Files](/editor)[Terminal](/terminal-integration)[Port Management](/ports)[In-App Browser](/browser)[Computer Control](/computer)[Pages](/pages)[AI Agents](/agent-integration)[Agent Status & Notifications](/agent-status)[Tasks](/tasks)[Pull Requests](/pull-requests)[Remote Access](/remote-access)[Automations](/automations)[Usage](/usage)[Skills](/skills)[Superset MCP Server](/mcp-server)

CLI

[Getting Started](/cli/getting-started)[Superset CLI Reference](/cli/cli-reference)[Host Server](/cli/host-server)[Environment variables](/cli/env-vars)

TypeScript SDK

[Getting Started](/sdk/getting-started)[Superset SDK Reference](/sdk/reference)[Advanced Usage](/sdk/advanced)

Integrations

[IDE Integration](/use-with-ide)[Linear Integration](/use-with-linear)[Slack Integration](/use-with-slack)[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers)

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts)[Monorepos](/using-monorepos)[Terminal Scripts](/terminal-scripts)[Keyboard Shortcuts](/keyboard-shortcuts)[Custom Themes](/custom-themes)[Customization](/customization)

Help

[Troubleshooting](/troubleshooting)[FAQ](/faq)[Community & Support](/community)

Search docs...⌘K

Get Started

[What is Superset?](/overview "What is Superset?")[Install](/install "Install")[Your First Parallel Session](/first-workspace "Your First Parallel Session")[The Superset Model](/superset-model "The Superset Model")

Recipes

[Race Agents on One Task](/recipes/race-agents "Race Agents on One Task")[Run Three Workstreams at Once](/recipes/parallel-workstreams "Run Three Workstreams at Once")[Clear PR Feedback in the Background](/recipes/pr-feedback "Clear PR Feedback in the Background")[Fan Out a Big Refactor](/recipes/fan-out-refactor "Fan Out a Big Refactor")[Wake Up to a Finished Audit](/recipes/nightly-audit "Wake Up to a Finished Audit")[Command Your Fleet from the CLI](/recipes/command-your-fleet "Command Your Fleet from the CLI")[Drive Superset from Your Agent](/recipes/agent-driven-superset "Drive Superset from Your Agent")[Agent Orchestration](/orchestration "Agent Orchestration")

Core Features

[Workspaces](/workspaces "Workspaces")[Diff Viewer](/diff-viewer "Diff Viewer")[Editor & Files](/editor "Editor & Files")[Terminal](/terminal-integration "Terminal")[Port Management](/ports "Port Management")[In-App Browser](/browser "In-App Browser")[Computer Control](/computer "Computer Control")[Pages](/pages "Pages")[AI Agents](/agent-integration "AI Agents")[Agent Status & Notifications](/agent-status "Agent Status & Notifications")[Tasks](/tasks "Tasks")[Pull Requests](/pull-requests "Pull Requests")[Remote Access](/remote-access "Remote Access")[Automations](/automations "Automations")[Usage](/usage "Usage")[Skills](/skills "Skills")[Superset MCP Server](/mcp-server "Superset MCP Server")

CLI

[Getting Started](/cli/getting-started "Getting Started")[Superset CLI Reference](/cli/cli-reference "Superset CLI Reference")[Host Server](/cli/host-server "Host Server")[Environment variables](/cli/env-vars "Environment variables")

TypeScript SDK

[Getting Started](/sdk/getting-started "Getting Started")[Superset SDK Reference](/sdk/reference "Superset SDK Reference")[Advanced Usage](/sdk/advanced "Advanced Usage")

Integrations

[IDE Integration](/use-with-ide "IDE Integration")[Linear Integration](/use-with-linear "Linear Integration")[Slack Integration](/use-with-slack "Slack Integration")[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers "Use with OpenRouter, Bedrock, Vertex, or Vercel")

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts "Project Lifecycle Scripts")[Monorepos](/using-monorepos "Monorepos")[Terminal Scripts](/terminal-scripts "Terminal Scripts")[Keyboard Shortcuts](/keyboard-shortcuts "Keyboard Shortcuts")[Custom Themes](/custom-themes "Custom Themes")[Customization](/customization "Customization")

Help

[Troubleshooting](/troubleshooting "Troubleshooting")[FAQ](/faq "FAQ")[Community & Support](/community "Community & Support")

On this page

CLI

# Host Server

Set up the daemon the CLI and desktop app talk to when targeting the local machine.

Copy MarkdownOpen in

The `superset start` command runs a headless HTTP server that any Superset desktop app or CLI can communicate with.

It manages workspaces, ports, and agent runs on the machine it's running on. The desktop app starts it automatically; on a CLI-only or headless machine you start it yourself.

If you installed the desktop app, it already includes the CLI and installs a `~/.superset/bin/superset` shim on app launch. Superset terminals prepend that directory to `PATH` automatically. On a headless machine, use the standalone installer from [Getting Started](/cli/getting-started).

## [Prerequisites](#prerequisites)

`git` and `gh` need to be on your `PATH`. `git` handles clone, worktree, and branch ops; `gh` handles PR checkout and metadata.

```
gh auth login
```

The host server reuses your existing `gh` auth. For sandboxes or CI, set `GH_TOKEN` (or `GITHUB_TOKEN`) instead of running `gh auth login`. `gh` picks it up automatically.

### [Agent CLIs (optional)](#agent-clis-optional)

If you plan to run AI agents inside workspaces, install whichever agent CLIs you want available. The host server launches them based on which are on your `PATH`:

Agent

Install

Claude Code

`npm install -g @anthropic-ai/claude-code`

Codex

`npm install -g @openai/codex`

Cursor Agent

install via Cursor's website

Amp

`npm install -g @sourcegraph/amp`

Gemini CLI

`npm install -g @google/gemini-cli`

OpenCode

see [opencode.ai/docs](https://opencode.ai/docs)

None are required to start the host server or create workspaces. Install only what you plan to run.

## [Authenticate the Superset CLI](#authenticate-the-superset-cli)

The host server starts under your Superset session. If you haven't already:

```
superset auth login
```

See [Getting Started](/cli/getting-started) for the full sign-in flow, including API-key auth for CI.

## [Start the host server](#start-the-host-server)

```
superset start --daemon
```

Spawns the daemon in the background and writes a manifest at `~/.superset/host/<organizationId>/manifest.json` so other clients can find it. Binds to `127.0.0.1` only.

Verify it's healthy:

```
superset status
```

## [Getting started](#getting-started)

### [Create or adopt a project](#create-or-adopt-a-project)

A workspace branches off a project: a repo registered with Superset.

Each repo gets one cloud project record, shared across the organization. The first machine to register the repo runs `projects create`; every machine after that uses `projects setup` to attach to the existing project instead of creating a duplicate.

Start by checking what's already in your org:

```
superset projects list
```

#### [First machine: `projects create`](#first-machine-projects-create)

If the project doesn't exist yet, clone a remote repo or import an existing local one:

```
# Clone from a Git URL
superset projects create \
  --name "My Project" \
  --local \
  --clone https://github.com/org/repo.git \
  --parent-dir ~/code

# Or import a repo that's already on disk
superset projects create \
  --name "My Project" \
  --local \
  --import ~/code/existing-repo
```

The host server clones (or registers) the repo, creates the cloud project record, and ensures the main workspace.

#### [Subsequent machines: `projects setup <id>`](#subsequent-machines-projects-setup-id)

If a previous machine of yours already created the project, adopt it instead of running `create` again: `create` would register a second, unrelated project for the same repo. Projects are host-owned, so pick the ID from a machine that has it (`projects list --host <id>`), then:

```
# Clone the project's repo onto this machine
superset projects setup 47c31b04-… --local --parent-dir ~/code

# Or attach to an existing local checkout
superset projects setup 47c31b04-… --local --import ~/code/repo
```

The URL for clone mode comes from the cloud project record, so `setup` doesn't need `--clone <url>`. `setup` is idempotent: re-running against a project that's already set up here is a no-op.

### [Create your first workspace](#create-your-first-workspace)

```
superset projects list
superset workspaces create \
  --project prj_… \
  --name "fix-login-bug" \
  --branch fix/login-bug
```

The host server clones the project (if it isn't already on disk), creates a git worktree at the chosen branch, and registers the workspace.

You can also create a workspace from a pull request number:

```
superset workspaces create \
  --project prj_… \
  --name "review-pr-123" \
  --pr 123 \
  --local
```

## [Stop the host server](#stop-the-host-server)

```
superset stop
```

## [Shared state](#shared-state)

State lives under `~/.superset/host/<organizationId>/`:

```
~/.superset/host/<organizationId>/manifest.json    # endpoint + auth token
~/.superset/host/<organizationId>/host.db          # local host server DB
```

A host server started by the desktop app is visible to the CLI and vice-versa. `SUPERSET_HOME_DIR` relocates the whole tree.

## [Command details](#command-details)

For full flags, exit codes, and output shapes:

-   [`superset start`](/cli/cli-reference#superset-start)
-   [`superset status`](/cli/cli-reference#superset-status)
-   [`superset stop`](/cli/cli-reference#superset-stop)

[Edit on GitHub](https://github.com/superset-sh/superset/blob/main/apps/docs/content/docs/cli/host-server.mdx)

[

Previous

Superset CLI Reference

](/cli/cli-reference)[

Next

Environment variables

](/cli/env-vars)

### On this page

[

Prerequisites](#prerequisites)[

Agent CLIs (optional)](#agent-clis-optional)[

Authenticate the Superset CLI](#authenticate-the-superset-cli)[

Start the host server](#start-the-host-server)[

Getting started](#getting-started)[

Create or adopt a project](#create-or-adopt-a-project)[

First machine: `projects create`](#first-machine-projects-create)[

Subsequent machines: `projects setup <id>`](#subsequent-machines-projects-setup-id)[

Create your first workspace](#create-your-first-workspace)[

Stop the host server](#stop-the-host-server)[

Shared state](#shared-state)[

Command details](#command-details)
```

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://raw.githubusercontent.com/yc-software/qm/main/docs/deploy-directory.md"
}
```

**Output:**
```
# Deployment directory contract

Contract v1 makes a QM deployment a committed, portable directory. The `qm` CLI is the only interpreter of that directory: it validates the same inputs it uses to render containers, task definitions, secret routing, and the agent-computer layer.

## Layout

`package.json` pins the `@yc-software/qm` deployment engine at the exact version that scaffolded the directory, so the directory records which CLI interprets it rather than drifting with whatever version an operator has installed; `contract: 1` remains only the compatibility floor. `package-lock.json` records the installed artifact. `qm.config.jsonc` is the deployment config. `deployment.md` and `.codex/skills/deploy-qm/` are materialized package assets an operator can hand to an agent. `sandbox/` adds tools and skills to agent computers; `plugins/` adds services; `.env.example` documents the computed secret names; `.env` supplies local values and is never committed. `qm init` writes `slack-app-manifest.yml` for the optional Socket Mode bot. It also writes `slack-sso-manifest.yml` only when the portal is configured to use Slack OpenID. `qm slack render` refreshes the applicable manifests after `publicUrl` changes, and `qm outputs` returns their creation links and the web coordinates. `qm init --target aws` also vendors the reference `infra/` Terraform module and its derived `terraform.tfvars`; the copy belongs to the deployment after generation. Init never overwrites an existing deployment config.

The sandbox layout is:

```text
sandbox/
  Dockerfile
  tools/<id>/tool.json
  tools/<id>/<binary>
  skills/<id>/SKILL.md
  skills/<id>/<text assets>
```

The Dockerfile is optional when every declared binary is present in its tool directory. Skill assets delivered through the deployment-layer API are text in v1. Executable text scripts can be delivered as skill assets. Native binary tools must already be installed in the platform image.

## Configuration

The root object requires `contract: 1`, `orgId`, `publicUrl`, `target`, and `services` including `core`. On AWS the sandbox substrate is an explicit choice: omitting the `sandbox` block runs named Lambda MicroVM images; declaring one requires `sandbox.backend` — `"sprites"` runs Fly Sprites, `"aws"` states the MicroVM default in the file. Unknown contract majors fail closed. `target` is `docker`, `fly`, or `aws`.

Common optional fields select the model, plugins, extra skill directories, per-service non-secret environment values, image overrides, sandbox settings, and an external security screen. `botName` (at most 31 characters, so the generated "`<botName>` SSO" app name fits Slack's 35-character cap) names the bot everywhere users see it — the generated Slack app manifests, the prompt identity, and sign-in pages — and `orgName` (at most 40) is how the bot refers to the organization; both default to neutral values and can be changed live from the Admin page's Branding card, which then takes precedence over the deployed values. `sandbox.backend` selects the aws-target sandbox substrate (see above); `sandbox.baseImage` records the digest-pinned build input for local layer builds; `sandbox.env` is non-secret runtime environment; `sandbox.secretEnv` lists org-wide secret names whose values are forwarded to every sandbox. `securityScreen` contains `backend: "proxy"`, a lowercase provider label, an HTTPS endpoint, and a `shadow` or `enforce` rollout. Its presence requires `secretEnv.core.SECURITY_SCREEN_PROXY_TOKEN`; absence disables model screening. Set `securityScreen: { "backend": "model" }` to opt into the built-in model classifier, or `{ "backend": "off" }` to explicitly disable screening. Proxy `enforce` uses only the external screener, with no model fallback on errors; `shadow` explicitly runs the model classifier and compares the external verdict. Security posture and tool approval settings remain independent.

Fly requires `region` and `flyOrg`. AWS requires a 12-digit account, region, deployment label, ECS cluster, deploy-role ARN, Secrets Manager prefix, DNS-valid Cloud Map namespace, and an entry for every enabled first-party service and discovered plugin containing a unique valid ECR repository, a unique valid ECS service, and a valid Fargate CPU/memory combination. The cluster is constrained so every IAM, RDS, ALB, and related name derived by the reference module is valid. `imageLabel` identifies the complete deployment manifest used by rollback and live drift checks; the matching OCI/ECR tag is a convenience pointer. Workloads may also set `arm64`/`amd64` architecture, non-secret build arguments, or role ARNs. External prebuilt images must declare their architecture; source-built and built-in workloads use their platform default. Cloud Map names are the private workload addresses. The reference AWS module exposes CloudFront over HTTPS and restricts its HTTP ALB origin to CloudFront's managed origin prefix. With portal enabled, it is the ALB's sole target; access to private core, web, and admin surfaces requires signed portal identity. Without portal, only core is an ALB target. A real harness requires an HTTPS `publicUrl`.

`publicUrl` is the one public coordinate. The CLI derives the core, Slack, web, admin, and portal URL environment from it. Config `env` is for non-secret values only; secret-shaped keys are rejected.

## Security screen proxy

The proxy endpoint receives one or more HTTPS `POST`s per bounded classification with `content-type: application/json`, the routed token in `x-api-key`, redirects disabled, and this body:

```json
{
  "text": "untrusted content",
  "hook": "user_input",
  "metadata": {
    "surface": "webhook",
    "origin": "automation",
    "qm": {
      "request_id": "uuid",
      "input_index": 0,
      "chunk_index": 0,
      "chunk_count": 1
    },
    "provider-label": {
      "request_id": "uuid",
      "input_index": 0,
      "chunk_index": 0,
      "chunk_count": 1
    }
  }
}
```

`hook` is `user_input` or `tool_response`; metadata fields appear only when known. The chunk coordinates are also mirrored under the configured provider label so a direct provider endpoint can consume its own namespace without a built-in adapter. Inputs are capped at 16,000 characters and split into overlapping 1,600-character requests with at most two in flight per classification. All chunks share a request ID. A successful provider returns finite `score` and `threshold` numbers from zero through one plus an optional lowercase `primary_outcome` label:

```json
{
  "score": 0.91,
  "threshold": 0.7,
  "primary_outcome": "prompt_injection"
}
```

A chunk whose score is at or above its threshold resolves to Strict, and any Strict chunk makes the whole classification Strict. When chunks agree, the highest-scoring result supplies the diagnostics. The configured provider is an audit label and metadata namespace, not a built-in adapter name, so any service implementing this contract can be selected. Throttled requests retry with bounded backoff inside the classification deadline. Invalid responses, timeouts, redirects, and other provider errors are unavailable classifications: enforcement fails closed, while shadow mode leaves the built-in model authoritative and records the comparison. Shadow changes authority, not disclosure: it still sends the full screened content to the configured endpoint, so operators must trust that provider with external messages, files, and surface results.

## Secrets

First-party services publish a typed `SecretSpec` schema. The CLI combines the enabled services and feature predicates with plugin `secrets` and `sandbox.secretEnv` to form the computed secret set. That same schema determines which task receives each secret. Core validates its own required runtime secrets at production boot.

`init` renders the set as `.env.example`; that file has names and descriptions, never values, and is not an input to deployment. Operators place values in gitignored `.env`. Docker reads the file locally. `qm secrets push` uploads supplied operator-managed values to Fly secrets or AWS Secrets Manager without printing them. Terraform owns `DATABASE_URL` on AWS because it owns RDS. `doctor` treats missing and placeholder required values as failures and reports absent optional plugin secrets without blocking deployment.

## Tool descriptors

Only `id` is required. The remaining fields buy these runtime guarantees:

| Field                       | Guarantee                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`                     | Human-readable name in resident-login status.                                                                                                                                                                                                                                                                                  |
| `advertise`                 | Added to the agent computer's installed-CLI list.                                                                                                                                                                                                                                                                              |
| `hints`                     | Added to the model's deployment-tool guidance.                                                                                                                                                                                                                                                                                 |
| `auth.check`, `auth.reauth` | Merged into the resident-login connector registry.                                                                                                                                                                                                                                                                             |
| `auth.credentialPaths`      | One `$HOME`-relative set of `{ path, kind }` entries drives resident capture, ephemeral linking, and device-flow persistence. Each entry explicitly declares `file` or `directory`; absolute paths and traversal are rejected, and `.ssh` warns.                                                                               |
| `egress`                    | Validated as host names and checked for dangerous wildcards. Runtime enforcement is not claimed in v1.                                                                                                                                                                                                                         |
| `approvals`                 | Appended to the command-policy floor. A rule may deny or require approval for its own tool; it may never add an allow or loosen administrator policy.                                                                                                                                                                          |
| `install.binary`            | Must be present in the layer, declared under `install.files`, or installed by its Dockerfile; the image build checks PATH.                                                                                                                                                                                                     |
| `install.files`             | UTF-8 text files beside `tool.json` with an absolute destination under `/usr/local/bin/` or `/usr/local/lib/` and an octal mode (default `0755` under bin, `0644` under lib). They ride the layer bundle and every sandbox backend converges them on each provision by content hash, so a tool reaches imageless machines too. |

Raw approval patterns must start with the canonical `\b<install.binary-or-id>\b` boundary and cannot use a top-level alternative, so every match begins with their own tool; nested alternatives after that prefix remain available. A `command` rule is safely anchored to that same effective binary by the CLI. Duplicate tool ids fail. Skills require `name` and `description` frontmatter.

Deployment-specific safety belongs here too. For example, an ambiently authenticated CLI declares a deny `approvals` rule for its login command, a `hints` entry telling the model not to log in, and its `auth.credentialPaths`; generic core carries no vendor-specific command exception or credential path.

## Delivery and pins

When `sandbox/` exists, every `up` sends its descriptors and complete text skill trees to source-authenticated `PUT /v1/deployment-layer`. Without `sandbox/`, `up` skips layer sync and leaves the deployed layer unchanged. Core validates submitted bundles again, stores them in Postgres table `deployment_layer`, versions them by a canonical SHA-256 content hash, records an audit event, hydrates them before serving, and returns the restorable bundle with its metadata and resolved runtime state from source-authenticated `GET /v1/deployment-layer`. Removed layer-owned skills are archived. Filesystem `DEPLOYMENT_LAYER` remains a bootstrap input for local and recovery use.

The sandbox handoff is a layer content hash. Sprites boxes boot the platform's stock image; the layer's tool descriptors and skills arrive through the deployment-layer sync. AWS with `sandbox.backend: "aws"` (or no sandbox block) uses `infra build-image` to package the guest agent as a Lambda MicroVM image and records its immutable image version and execution role. Service task definitions use immutable pins, not mutable tags.

Postgres stores create their tables lazily with idempotent DDL through the shared pool. The Terraform module creates RDS and its `DATABASE_URL` secret. On AWS, `up` records a point-in-time restore point before its first mutation — refusing an unavailable database, one whose automated-backup retention is below `aws.dbRetentionMinDays` (default 1), or one whose `LatestRestorableTime` lags more than `QM_AWS_DB_MAX_RESTORE_LAG_MS` (default 10 minutes) — timestamped in the deployment manifest it precedes, and re-checked after the roll (a note while the backup stream is still inside the allowed lag, a loud warning once the restore point has gone uncovered longer than that, since a point is restorable only once the stream covers it and only within the retention window); `aws.predeployDbSnapshot: false` opts a deployment out. Restore remains operator-run: `rollback` prints the restore point (or the legacy snapshot on older manifests) alongside the code it rolls back.

## Targets and prerequisites

| Requirement                                                                                |                          Docker |                             Fly |                                             AWS |
| ------------------------------------------------------------------------------------------ | ------------------------------: | ------------------------------: | ----------------------------------------------: |
| Node 24 and `qm` CLI                                                                       |                             yes |                             yes |                                             yes |
| Docker daemon                                                                              |                             yes |                      build path |                       image transfer/build path |
| Agent-computer image and credentials                                                       |      Fly app for real execution |        Fly app and scoped token | Lambda MicroVM image/version and execution role |
| Slack bot app created from generated manifest, bot token, app token                        |              when Slack enabled |              when Slack enabled |                              when Slack enabled |
| Admin email, verified sender, and a Resend key or SMTP credentials                         | with the built-in `auth` broker | with the built-in `auth` broker |                 with the built-in `auth` broker |
| Slack SSO app, client id/secret, team gate, and exact `<publicUrl>/auth/callback` redirect |            only with Slack OIDC |            only with Slack OIDC |                            only with Slack OIDC |
| Postgres                                                                                   | local container or supplied DSN |       Fly Postgres/supplied DSN |                                   Terraform RDS |
| AWS credentials, ECS/ECR/RDS/ALB/Cloud Map, exact GitHub OIDC trust                        |                              no |                              no |                                             yes |

`doctor` checks target resources read-only. When user-owned CI is requested, the AWS account must already have the account-level GitHub provider at `arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com`; check it with `aws iam get-open-id-connect-provider --open-id-connect-provider-arn <arn>` and, if absent, have an account administrator run `aws iam create-open-id-connect-provider --url https://token.actions.githubusercontent.com --client-id-list sts.amazonaws.com`. The AWS doctor verifies ECS, ECR, RDS, CloudFront-to-ALB routing, the deploy role and its exact operator-owned GitHub repository plus configured branch or environment trust, required secret values, and the Lambda MicroVM image pin. Environment-based trust must be paired with GitHub deployment-branch restrictions because its OIDC subject does not contain a branch. Fork pull requests cannot assume the deploy role. No workflow in the qm source repository deploys a production stack.

## Commands, conformance, and versioning

The normal gate order is `check`, `doctor`, `plan`, `up --yes`, then `check --live`. On AWS with MicroVM sandboxes, `infra build-image` precedes `plan`. First-party services come from the package's matching image manifest; `--build-from` explicitly builds modified services from a source fork or contributor checkout; use the checkout's CLI when changing deployment logic too. `check` is static and has JSON output keyed to clause ids. `doctor` makes read-only external checks. `plan` renders without mutation. On AWS, rollback restores the prior recorded deployment manifest as one unit under the deployment lease; `--to` selects another complete manifest by manifest id or recorded release label. Because rollback restores code and configuration but never data, it prints the pre-deploy database point-in-time restore timestamp recorded on the deployment it rolls back (or the legacy snapshot for older manifests). Fly and Docker do not claim rollback.

AWS `aws.dbInstanceClass` selects the RDS class rendered as `db_instance_class` and defaults to `db.t4g.small`. Operators set `db_backup_retention_days` in `infra/terraform.tfvars` to override its 35-day default. `aws.dbRetentionMinDays` is separate: it is the minimum retention that `qm up` accepts for its restore-point safety check and does not configure RDS. Before applying, the account must permit the chosen class and retention in the selected region and account plan; AWS availability and plan restrictions vary, and the rest of the deployment is not guaranteed to fit any free tier.

Upgrading the CLI alone does not update vendored Terraform. Existing deployments must preserve their customized Terraform and tfvars, copy only the validated `db_instance_class` variable (including its `db.t4g.small` default) from the current `infra/variables.tf` scaffold, and change only the RDS assignment to `instance_class = var.db_instance_class` before setting `aws.dbInstanceClass`; then run `qm infra render` and review the Terraform plan before applying.

AWS `up` is mutually excluded by a DynamoDB lease, verifies RDS continuous backups and records the exact pre-mutation restore point, registers digest-pinned task definitions, enables the ECS circuit breaker, updates services, and waits stable. AWS `check --live` compares environment, secret routing, task definitions, and the configured release label in both directions. Fly `check --live` verifies every configured workload has a live image-bearing machine and the public health endpoint responds. `qm conformance` remains the later cross-check between the static contract and core's resolved deployment-layer descriptors.

The semver-stable `@yc-software/qm/contract` export contains only config loading, layer validation/parsing, env derivation, approval compilation, and the contract version; AWS task rendering joins it with the AWS backend. A new incompatible directory shape increments the contract major. A CLI may add optional fields within a major.

Built-in targets live in one registry that owns discovery, initialization files and ignores, accepted deploy flags, backend creation, and provider output coordinates. To add one, implement that provider contract and backend lifecycle (`up`, status, logs, down, rollback, doctor, secret delivery, and live checking), add a namespaced config block and templates, render through the shared environment and secret pipelines, document prerequisites honestly, and add conformance fixtures. Loading arbitrary provider packages at runtime is outside contract v1.

## Clause status

| Clause                            | Status         | Verifier                                                                         |
| --------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| `config.v1`                       | ENFORCED       | `loadConfigAt`, `qm check`                                                       |
| `config.no-secret-values`         | ENFORCED       | `qm check`                                                                       |
| `secrets.computed-set`            | ENFORCED       | typed schema, `qm check`                                                         |
| `sandbox.descriptors`             | ENFORCED       | `validateSandboxLayer`, core PUT validation                                      |
| `sandbox.approvals-tighten`       | ENFORCED       | descriptor parsers, command-policy composition                                   |
| `runtime.layer-resolved`          | ENFORCED       | deployment-layer store/API and core PUT validation, `qm conformance` cross-check |
| `aws.rendered-task`               | ENFORCED       | `renderTaskDefinition`, AWS `plan`/`up`, digest and task-diff tests              |
| `aws.live-drift`                  | ENFORCED       | `qm check --live`, bidirectional task/environment/secret/release checks          |
| `sandbox.egress`                  | VALIDATED-ONLY | wildcard/host warnings in `qm check`; no runtime enforcement claimed             |
| `sandbox.aws-substrate`           | ENFORCED       | Lambda MicroVM image/version validation and live drift                           |
| `target.provider-registry`        | ENFORCED       | provider registry and packed-artifact tests                                      |
| `extension.deployment-data-proxy` | RESERVED       | optional env-gated org adapter; not part of contract v1                          |

ENFORCED means code rejects or tests the clause today. VALIDATED-ONLY means the directory is checked but runtime enforcement is explicitly absent. RESERVED names a compatibility slot without claiming implementation.

## Published-app credential calls

When core has a signing secret and API base URL, it supplies each deployed app whose
publisher is an internal principal with `AGENT_API_URL` and `AGENT_CREDENTIAL_TOKEN`,
the same pair an agent turn receives. The app's server sends a POST request to
`$AGENT_API_URL/v1/credentials/broker` with the token in `x-agent-capability` and the
same `credential`, `url`, `method`, `headers`, and string `body` fields the agent HTTP
credential broker accepts. Keep the token on the server; it authorizes calls as the
immutable publisher, not the person viewing the app.

Every enabled broker-delivery credential is available to published apps by default; an
administrator switches a credential off for apps without affecting agent turns. The
token is long-lived and names the app, so the broker refuses a credential whose switch
was flipped after the app shipped and the audit row records which app called. Disabling
the credential revokes access on the next call. The token is minted at deploy time from
the credentials switched on at that moment, so a credential added later reaches an app
on its next deploy.

The destination host, HTTP methods, and paths remain constrained by the credential
record. If its injection configuration enables actor attestation, the broker sets
`x-qm-actor` from the stored publisher. Caller-supplied actor headers are rejected.
The destination receives the configured credential, never the deployment token.

### Public AWS plugin routes

Plugins stay private by default. An AWS plugin workload can declare
`publicPaths: ["/hooks/*"]` under `aws.services.hooks` to expose its own
namespace. Each of the one to five unique patterns must start with the plugin
name and end in `/*`; broader catch-all paths and paths outside that namespace
are rejected. The plugin must authenticate its requests.

The AWS scaffold renders these paths before core host rules and portal catch-all
rules. Deployment preflight verifies the exact paths, target-group attachments
and listener precedence, including native blue/green weighted routing. Update
vendored Terraform with the `public_paths` service attribute and
`public_path_services` routing before enabling this setting.

### Shared AWS foundations

Existing AWS deployments retain their company-owned resources by default. For a shared DynamoDB deployment table, set `aws.deploymentState` to `{ "table": "fleet-deploy-locks", "namespace": "acme" }`. Every lease, current pointer, label pointer and immutable manifest uses that namespace. Use a unique namespace for each company and scope its item IAM permissions with `dynamodb:LeadingKeys` to `acme/*`; grant `DescribeTable` separately. Changing an existing deployment's state location requires explicitly migrating its history while deployment operations are stopped.

To use a shared ALB, set `aws.alb` and `aws.sharedAlb: true`. The supported shared topology has one blue/green portal ingress per company, with an exact host-header condition plus `/*` path, a fixed-404 listener default, separate primary/alternate target groups and a company-owned production rule. Additional public plugin/core routes are not supported in this topology. Other companies' rules must use explicit non-wildcard hostnames and must not reference this company's target groups. Set each service's `targetGroup`, `taskRoleArn`, and `executionRoleArn` explicitly when sharing an ECS cluster. Retain company-specific service permissions and allow ECS to modify only that company's listener rule.

An exact `--candidate` deployment consumes its digest-pinned images without changing ECR tags. Its publisher owns image retention; retain every active and rollback digest. Builds performed by the deployment CLI still stage and promote their images as before.

Set `securityScreen.allPostures: true` with an enabled model or proxy backend to require external-content screening independently of the security posture. This preserves each posture’s tool approvals and private-network policy. Without this option, only Auto screens external content. With it, Dangerous and Strict screen too; scope posture changes cannot disable the deployment requirement. Classifier blocks remain quarantined pending release approval. Existing outage, timeout, and unscreenable-content behavior remains fail-open with an untrusted-content marker and audit record. Shadow rollout still observes proxy verdicts without enforcing them.

New tool-output release approvals deliver the exact saved text without running the tool again. They are once-only and retain the source scope in durable history. A release is refused if the current audience is no longer entitled to that source scope. Legacy persisted screening grants remain effective and are audited; remove those grants explicitly if a deployment requires every result to be classified. New release approvals cannot create session or always grants.

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 34.2s)

_Thinking:_

Now I understand both sides well enough. Let me also check QM docs about skills/tools — how to add a tool or skill that drives Superset. The deployment directory `sandbox/tools/<id>/tool.json` and `sandbox/skills/<id>/SKILL.md`. Also QM has custom tools via plugins? And QM agent runs in a sandbox — Superset host server binds to 127.0.0.1 only. So a QM sandbox agent can't reach a Superset host server on the user's Mac unless tunneled, OR Superset must run where the QM sandbox is (e.g., install Superset CLI inside QM sandbox image via tool binary — but Superset requires macOS app? Actually Superset has standalone CLI installer for headless Linux? Docs say "on a headless machine, use the standalone installer from Getting Started"). Let me check install page to see if Linux supported — important for whether Superset can live inside QM's sandbox.

Also check Superset MCP server page — MCP over HTTP/SSE could be reachable.

Let me fetch install page and mcp-server page quickly. Also maybe qm docs/memory-providers not needed.

Actually the question is vague: "how to make it work with qm?" Given their architecture: Superset = engineering agents, QM = multiplayer harness for PM/QA subagents. So they want Superset and QM to interoperate. Two directions:

A) QM drives Superset (QM agents spawn Superset workspaces/PRs): add a QM sandbox tool/skill that talks to Superset CLI or MCP/HTTP API.
B) Superset agents surface into QM (Slack): use QM's inbound webhooks / Superset Slack integration.

Also there's a Superset Slack Integration doc already.

Let me fetch install (platform support) and mcp-server to give accurate instructions.

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://docs.superset.sh/install"
}
```

**Output:**
```
Install | Superset Docs

[Superset](https://superset.sh)

[Changelog](https://superset.sh/changelog)[Website](https://superset.sh)[](https://github.com/superset-sh/superset)-   English日本語简体中文Français한국어繁體中文EspañolDeutschPortuguês (Brasil)ItalianoРусскийTürkçePolskiNederlandsBahasa IndonesiaČeštinaTiếng Việt
[Download](https://superset.sh/download)

Get Started

[What is Superset?](/overview)[Install](/install)[Your First Parallel Session](/first-workspace)[The Superset Model](/superset-model)

Recipes

[Race Agents on One Task](/recipes/race-agents)[Run Three Workstreams at Once](/recipes/parallel-workstreams)[Clear PR Feedback in the Background](/recipes/pr-feedback)[Fan Out a Big Refactor](/recipes/fan-out-refactor)[Wake Up to a Finished Audit](/recipes/nightly-audit)[Command Your Fleet from the CLI](/recipes/command-your-fleet)[Drive Superset from Your Agent](/recipes/agent-driven-superset)[Agent Orchestration](/orchestration)

Core Features

[Workspaces](/workspaces)[Diff Viewer](/diff-viewer)[Editor & Files](/editor)[Terminal](/terminal-integration)[Port Management](/ports)[In-App Browser](/browser)[Computer Control](/computer)[Pages](/pages)[AI Agents](/agent-integration)[Agent Status & Notifications](/agent-status)[Tasks](/tasks)[Pull Requests](/pull-requests)[Remote Access](/remote-access)[Automations](/automations)[Usage](/usage)[Skills](/skills)[Superset MCP Server](/mcp-server)

CLI

[Getting Started](/cli/getting-started)[Superset CLI Reference](/cli/cli-reference)[Host Server](/cli/host-server)[Environment variables](/cli/env-vars)

TypeScript SDK

[Getting Started](/sdk/getting-started)[Superset SDK Reference](/sdk/reference)[Advanced Usage](/sdk/advanced)

Integrations

[IDE Integration](/use-with-ide)[Linear Integration](/use-with-linear)[Slack Integration](/use-with-slack)[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers)

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts)[Monorepos](/using-monorepos)[Terminal Scripts](/terminal-scripts)[Keyboard Shortcuts](/keyboard-shortcuts)[Custom Themes](/custom-themes)[Customization](/customization)

Help

[Troubleshooting](/troubleshooting)[FAQ](/faq)[Community & Support](/community)

Search docs...⌘K

Get Started

[What is Superset?](/overview "What is Superset?")[Install](/install "Install")[Your First Parallel Session](/first-workspace "Your First Parallel Session")[The Superset Model](/superset-model "The Superset Model")

Recipes

[Race Agents on One Task](/recipes/race-agents "Race Agents on One Task")[Run Three Workstreams at Once](/recipes/parallel-workstreams "Run Three Workstreams at Once")[Clear PR Feedback in the Background](/recipes/pr-feedback "Clear PR Feedback in the Background")[Fan Out a Big Refactor](/recipes/fan-out-refactor "Fan Out a Big Refactor")[Wake Up to a Finished Audit](/recipes/nightly-audit "Wake Up to a Finished Audit")[Command Your Fleet from the CLI](/recipes/command-your-fleet "Command Your Fleet from the CLI")[Drive Superset from Your Agent](/recipes/agent-driven-superset "Drive Superset from Your Agent")[Agent Orchestration](/orchestration "Agent Orchestration")

Core Features

[Workspaces](/workspaces "Workspaces")[Diff Viewer](/diff-viewer "Diff Viewer")[Editor & Files](/editor "Editor & Files")[Terminal](/terminal-integration "Terminal")[Port Management](/ports "Port Management")[In-App Browser](/browser "In-App Browser")[Computer Control](/computer "Computer Control")[Pages](/pages "Pages")[AI Agents](/agent-integration "AI Agents")[Agent Status & Notifications](/agent-status "Agent Status & Notifications")[Tasks](/tasks "Tasks")[Pull Requests](/pull-requests "Pull Requests")[Remote Access](/remote-access "Remote Access")[Automations](/automations "Automations")[Usage](/usage "Usage")[Skills](/skills "Skills")[Superset MCP Server](/mcp-server "Superset MCP Server")

CLI

[Getting Started](/cli/getting-started "Getting Started")[Superset CLI Reference](/cli/cli-reference "Superset CLI Reference")[Host Server](/cli/host-server "Host Server")[Environment variables](/cli/env-vars "Environment variables")

TypeScript SDK

[Getting Started](/sdk/getting-started "Getting Started")[Superset SDK Reference](/sdk/reference "Superset SDK Reference")[Advanced Usage](/sdk/advanced "Advanced Usage")

Integrations

[IDE Integration](/use-with-ide "IDE Integration")[Linear Integration](/use-with-linear "Linear Integration")[Slack Integration](/use-with-slack "Slack Integration")[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers "Use with OpenRouter, Bedrock, Vertex, or Vercel")

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts "Project Lifecycle Scripts")[Monorepos](/using-monorepos "Monorepos")[Terminal Scripts](/terminal-scripts "Terminal Scripts")[Keyboard Shortcuts](/keyboard-shortcuts "Keyboard Shortcuts")[Custom Themes](/custom-themes "Custom Themes")[Customization](/customization "Customization")

Help

[Troubleshooting](/troubleshooting "Troubleshooting")[FAQ](/faq "FAQ")[Community & Support](/community "Community & Support")

On this page

Get Started

# Install

Requirements, download, and first launch

Copy MarkdownOpen in

## [Requirements](#requirements)

-   **macOS**, Apple Silicon or Intel. A Linux x64 AppImage ships with each release but is experimental; Windows is not yet available.
-   **Git** installed
-   **GitHub CLI** for the PR workflows: optional, and Superset offers to install it during onboarding. Run `gh auth status` to check.
-   At least one coding agent you already use (Claude Code, Codex, Amp, ...). Superset launches agents; it doesn't replace your subscriptions.

## [Download](#download)

[Apple logoDownload for macOS](https://github.com/superset-sh/superset/releases/latest/download/Superset-arm64.dmg)

On an Intel Mac? [Download Superset-x64.dmg](https://github.com/superset-sh/superset/releases/latest/download/Superset-x64.dmg) instead.

## [First Launch](#first-launch)

Onboarding checks your prerequisites with live detection: install or sign in to anything missing and the checklist updates on its own.

1.  **GitHub CLI**: install it if needed, then sign in. You can run `gh auth login` right inside the app.
2.  **Agents**: Superset detects Claude Code and Codex automatically. Everything else is configurable later under **Settings → Agents**.
3.  **Add a project**: point Superset at a local folder or a Git URL.

Using Bedrock, Vertex, OpenRouter, or another provider? See [Providers](/providers).

Paid organizations also get a **Get the best out of Pro** sidebar checklist for Remote Access, mobile, and automations. Reopen it from **Help → Get the best out of Pro** if you dismissed it.

## [iPhone](#iphone)

[Download Superset for iPhone](https://apps.apple.com/app/id6788926383) to continue your agents from your phone. You need **iOS 26 or later** and **Superset Pro**. Enable **Remote Access** to reach agents on your computer. If cloud workspaces are enabled for your account, you can use them without a connected computer.

Follow [iPhone setup](/remote-access#connect-from-an-iphone) to connect your computer. Android is not available yet; join the [Android waitlist](https://superset.sh/mobile#android).

## [Staying Updated](#staying-updated)

Superset checks for updates automatically. New releases ship daily; the [changelog](https://superset.sh/changelog) rounds up each week's highlights.

## [Next](#next)

You're two minutes in; the next ten are the fun part: [Your First Parallel Session](/first-workspace).

[Edit on GitHub](https://github.com/superset-sh/superset/blob/main/apps/docs/content/docs/install.mdx)

[

Previous

What is Superset?

](/overview)[

Next

Your First Parallel Session

](/first-workspace)

### On this page

[

Requirements](#requirements)[

Download](#download)[

First Launch](#first-launch)[

iPhone](#iphone)[

Staying Updated](#staying-updated)[

Next](#next)
```

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://docs.superset.sh/mcp-server"
}
```

**Output:**
```
Superset MCP Server | Superset Docs

[Superset](https://superset.sh)

[Changelog](https://superset.sh/changelog)[Website](https://superset.sh)[](https://github.com/superset-sh/superset)-   English日本語简体中文Français한국어繁體中文EspañolDeutschPortuguês (Brasil)ItalianoРусскийTürkçePolskiNederlandsBahasa IndonesiaČeštinaTiếng Việt
[Download](https://superset.sh/download)

Get Started

[What is Superset?](/overview)[Install](/install)[Your First Parallel Session](/first-workspace)[The Superset Model](/superset-model)

Recipes

[Race Agents on One Task](/recipes/race-agents)[Run Three Workstreams at Once](/recipes/parallel-workstreams)[Clear PR Feedback in the Background](/recipes/pr-feedback)[Fan Out a Big Refactor](/recipes/fan-out-refactor)[Wake Up to a Finished Audit](/recipes/nightly-audit)[Command Your Fleet from the CLI](/recipes/command-your-fleet)[Drive Superset from Your Agent](/recipes/agent-driven-superset)[Agent Orchestration](/orchestration)

Core Features

[Workspaces](/workspaces)[Diff Viewer](/diff-viewer)[Editor & Files](/editor)[Terminal](/terminal-integration)[Port Management](/ports)[In-App Browser](/browser)[Computer Control](/computer)[Pages](/pages)[AI Agents](/agent-integration)[Agent Status & Notifications](/agent-status)[Tasks](/tasks)[Pull Requests](/pull-requests)[Remote Access](/remote-access)[Automations](/automations)[Usage](/usage)[Skills](/skills)[Superset MCP Server](/mcp-server)

CLI

[Getting Started](/cli/getting-started)[Superset CLI Reference](/cli/cli-reference)[Host Server](/cli/host-server)[Environment variables](/cli/env-vars)

TypeScript SDK

[Getting Started](/sdk/getting-started)[Superset SDK Reference](/sdk/reference)[Advanced Usage](/sdk/advanced)

Integrations

[IDE Integration](/use-with-ide)[Linear Integration](/use-with-linear)[Slack Integration](/use-with-slack)[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers)

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts)[Monorepos](/using-monorepos)[Terminal Scripts](/terminal-scripts)[Keyboard Shortcuts](/keyboard-shortcuts)[Custom Themes](/custom-themes)[Customization](/customization)

Help

[Troubleshooting](/troubleshooting)[FAQ](/faq)[Community & Support](/community)

Search docs...⌘K

Get Started

[What is Superset?](/overview "What is Superset?")[Install](/install "Install")[Your First Parallel Session](/first-workspace "Your First Parallel Session")[The Superset Model](/superset-model "The Superset Model")

Recipes

[Race Agents on One Task](/recipes/race-agents "Race Agents on One Task")[Run Three Workstreams at Once](/recipes/parallel-workstreams "Run Three Workstreams at Once")[Clear PR Feedback in the Background](/recipes/pr-feedback "Clear PR Feedback in the Background")[Fan Out a Big Refactor](/recipes/fan-out-refactor "Fan Out a Big Refactor")[Wake Up to a Finished Audit](/recipes/nightly-audit "Wake Up to a Finished Audit")[Command Your Fleet from the CLI](/recipes/command-your-fleet "Command Your Fleet from the CLI")[Drive Superset from Your Agent](/recipes/agent-driven-superset "Drive Superset from Your Agent")[Agent Orchestration](/orchestration "Agent Orchestration")

Core Features

[Workspaces](/workspaces "Workspaces")[Diff Viewer](/diff-viewer "Diff Viewer")[Editor & Files](/editor "Editor & Files")[Terminal](/terminal-integration "Terminal")[Port Management](/ports "Port Management")[In-App Browser](/browser "In-App Browser")[Computer Control](/computer "Computer Control")[Pages](/pages "Pages")[AI Agents](/agent-integration "AI Agents")[Agent Status & Notifications](/agent-status "Agent Status & Notifications")[Tasks](/tasks "Tasks")[Pull Requests](/pull-requests "Pull Requests")[Remote Access](/remote-access "Remote Access")[Automations](/automations "Automations")[Usage](/usage "Usage")[Skills](/skills "Skills")[Superset MCP Server](/mcp-server "Superset MCP Server")

CLI

[Getting Started](/cli/getting-started "Getting Started")[Superset CLI Reference](/cli/cli-reference "Superset CLI Reference")[Host Server](/cli/host-server "Host Server")[Environment variables](/cli/env-vars "Environment variables")

TypeScript SDK

[Getting Started](/sdk/getting-started "Getting Started")[Superset SDK Reference](/sdk/reference "Superset SDK Reference")[Advanced Usage](/sdk/advanced "Advanced Usage")

Integrations

[IDE Integration](/use-with-ide "IDE Integration")[Linear Integration](/use-with-linear "Linear Integration")[Slack Integration](/use-with-slack "Slack Integration")[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers "Use with OpenRouter, Bedrock, Vertex, or Vercel")

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts "Project Lifecycle Scripts")[Monorepos](/using-monorepos "Monorepos")[Terminal Scripts](/terminal-scripts "Terminal Scripts")[Keyboard Shortcuts](/keyboard-shortcuts "Keyboard Shortcuts")[Custom Themes](/custom-themes "Custom Themes")[Customization](/customization "Customization")

Help

[Troubleshooting](/troubleshooting "Troubleshooting")[FAQ](/faq "FAQ")[Community & Support](/community "Community & Support")

On this page

Core Features

# Superset MCP Server

Connect AI agents directly to Superset via MCP

Copy MarkdownOpen in

The Superset MCP server lives at `https://api.superset.sh/mcp`. The versioned URL (`/api/v2/agent/mcp`) keeps working for existing configurations; the legacy v1 server (`/api/agent/mcp`) has been removed and returns `410 Gone`.

## [Overview](#overview)

Superset provides an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that lets AI agents interact with your tasks, workspaces, and devices programmatically.

## [Capabilities](#capabilities)

Category

Operations

**Tasks**

list, get (by id or slug), create, update, delete, list statuses

**Workspaces**

list (per host), create on a host, update, delete

**Agents**

list agents on a host, launch an agent session in a workspace

**Terminals**

create in a workspace, list, send input, read screen, close

**Pages**

list, get, list versions, pull content, publish; list/reply/resolve page comments

**Automations**

list, get metadata, get/set prompt body, create, update metadata, pause, resume, run on demand, list runs, delete

**Projects**

list projects on a host

**Hosts**

list hosts (registered machines) you have access to

**Organization**

list members

## [Setup](#setup)

### [CLI Options](#cli-options)

Claude CodeCodexGemini CLIOpen CodeAmp CLIMistral VibeKimi CodeGrok

terminal

```
claude mcp add superset --transport http https://api.superset.sh/mcp
```

### [Manual Configuration](#manual-configuration)

Alternatively, you can manually configure the MCP server for each client:

Claude CodeClaude DesktopCursorCodexGemini CLIOpen CodeAmp CLIMistral VibeKimi CodeGrok

Add a `.mcp.json` to your project root. Claude Code auto-discovers this file and handles OAuth authentication.

.mcp.json

```
{
  "mcpServers": {
    "superset": {
      "type": "http",
      "url": "https://api.superset.sh/mcp"
    }
  }
}
```

## [Authentication](#authentication)

The MCP server uses OAuth 2.1. When you first connect, you'll be prompted to authorize the connection in your browser. The token is scoped to your active organization.

### [API Key Authentication](#api-key-authentication)

For headless environments, CI/CD pipelines, or scripts where browser-based OAuth isn't practical, you can authenticate with an API key instead.

**Generating an API key:**

1.  Open the Superset desktop app
2.  Go to **Settings > API Keys**
3.  Click **Create API Key**
4.  Copy the key (it starts with `sk_live_`). You won't be able to see it again.

**Using the API key:**

Pass the API key as a Bearer token in the `Authorization` header:

```
Authorization: Bearer sk_live_your_api_key_here
```

MCP clients that support custom headers can use this directly. For Claude Code, set the header in your `.mcp.json`:

```
{
  "mcpServers": {
    "superset": {
      "type": "http",
      "url": "https://api.superset.sh/mcp",
      "headers": {
        "Authorization": "Bearer sk_live_your_api_key_here"
      }
    }
  }
}
```

API keys grant full access to your organization. Keep them secret and never commit them to version control. Use environment variables or secrets managers for CI/CD.

**When to use which method:**

Method

Best for

OAuth 2.1

Interactive use: Claude Desktop, Claude Code, Cursor

API Key

Headless/CI: scripts, automation, pipelines

## [Available Tools](#available-tools)

### [Tasks](#tasks)

Tool

Description

`tasks_list`

List tasks with optional filters (status, priority, assignee, free-text search)

`tasks_get`

Get one task by UUID or slug

`tasks_create`

Create a task in the active organization

`tasks_update`

Update fields on an existing task

`tasks_delete`

Soft-delete a task by UUID

`tasks_statuses_list`

List the organization's task statuses (for `tasks_create`/`tasks_update` statusId)

### [Workspaces](#workspaces)

Tool

Description

`workspaces_list`

List workspaces on a host (get the hostId from `hosts_list`)

`workspaces_create`

Create a workspace on a host, optionally launching agents with per-launch model and effort overrides

`workspaces_update`

Update fields on a workspace on its host

`workspaces_delete`

Delete a workspace by UUID on its host

### [Agents](#agents)

Tool

Description

`agents_list`

List agents configured on a host

`agents_create`

Create (launch) an agent session with optional per-launch model and effort overrides

### [Terminals](#terminals)

Tool

Description

`terminals_create`

Create a terminal session in a workspace, optionally running a command

`terminals_list`

List terminal sessions in a workspace

`terminals_send`

Write text into a running terminal (presses Enter by default)

`terminals_read`

Read the terminal screen as plain text (current screen plus recent scrollback)

`terminals_close`

Close a terminal session and kill its process

### [Pages](#pages)

[Superset Pages](/pages) lets agents present designs and reports to your team and act on feedback left directly on the page. The MCP publish tool accepts a self-contained HTML document and returns a shareable URL. Every publish creates a new version; nothing is overwritten.

Tool

Description

`pages_list`

Search and paginate pages, optionally scoped to one workspace

`pages_get`

Get one page's metadata by id or slug (title, visibility, URL, served version)

`pages_versions`

List a page's version history, newest first

`pages_pull`

Get a download URL for a page's HTML, plus that version's metadata

`pages_publish`

Publish an HTML document (passed inline, not as a path) and get its shareable URL

`pages_comments_list`

List comment threads on a page, with replies and resolved state

`pages_comments_reply`

Post a reply into a comment thread

`pages_comments_resolve`

Mark a comment thread resolved, or reopen it

`pages_list` returns `{ items, nextCursor }`, ordered newest-created first. Pass `search` to match title, slug, or description, `limit` for 1–200 rows (default 50), and the returned `nextCursor` as `cursor` to continue. Keep fetching until `nextCursor` is null. `scope` accepts `all` (default), `team` for shared pages, or `mine` for your private pages.

`pages_publish` accepts `visibility: "just_me"`, `"org"` (the default for new pages), or `"everyone"` for anonymous read-only access. Pass `workspaceId` and `entryPath` together to link the page to a workspace. Both are optional; outside a workspace, save the returned `id` and pass it as `pageId` when publishing updates. Otherwise each publish creates a separate page.

### [Automations](#automations)

Tool

Description

`automations_list`

List automations the calling user owns

`automations_get`

Get one automation's metadata (prompt body omitted)

`automations_get_prompt`

Fetch the full markdown prompt for one automation

`automations_create`

Schedule a recurring agent run with an RFC 5545 RRULE

`automations_update`

Update metadata (name, schedule, agent, host); use `automations_set_prompt` to change the prompt

`automations_set_prompt`

Replace the full markdown prompt body

`automations_pause`

Pause an automation (schedule stops firing)

`automations_resume`

Resume a paused automation

`automations_run`

Dispatch an automation immediately, outside its schedule

`automations_logs`

List recent runs for an automation

`automations_delete`

Delete an automation

### [Projects](#projects)

Tool

Description

`projects_list`

List projects (checked-out repos) on a host (get the hostId from `hosts_list`)

### [Hosts](#hosts)

Tool

Description

`hosts_list`

List the hosts (registered machines) you have access to

### [Organization](#organization)

Tool

Description

`organization_members_list`

List members of the active organization

## [Chat Integration](#chat-integration)

In the built-in chat panel, use the `/mcp` slash command to see your workspace's configured MCP servers: their names, transport type (local/remote), and current state (enabled/disabled/invalid). This reads from your workspace MCP config (`.mastracode/mcp.json`, `.amp/settings.json`, or `.mcp.json`).

## [Example Usage](#example-usage)

Once connected, you can ask your AI agent to:

-   "Create a task for fixing the login bug"
-   "List all my assigned tasks"
-   "Create a workspace for the auth feature on my MacBook"
-   "Schedule a daily automation that triages new Linear issues at 9 a.m."
-   "Pause the nightly cleanup automation"
-   "Show me the last 10 runs of my Linear triage automation"
-   "Answer the two threads handed to me on the launch-plan page"

[Edit on GitHub](https://github.com/superset-sh/superset/blob/main/apps/docs/content/docs/mcp-server.mdx)

[

Previous

Skills

](/skills)[

Next

Getting Started

](/cli/getting-started)

### On this page

[

Overview](#overview)[

Capabilities](#capabilities)[

Setup](#setup)[

CLI Options](#cli-options)[

Manual Configuration](#manual-configuration)[

Authentication](#authentication)[

API Key Authentication](#api-key-authentication)[

Available Tools](#available-tools)[

Tasks](#tasks)[

Workspaces](#workspaces)[

Agents](#agents)[

Terminals](#terminals)[

Pages](#pages)[

Automations](#automations)[

Projects](#projects)[

Hosts](#hosts)[

Organization](#organization)[

Chat Integration](#chat-integration)[

Example Usage](#example-usage)
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 58.8s)

_Thinking:_

I now have enough to answer: how to make Superset work with QM.

Key facts:
- Superset: macOS app + CLI host server on 127.0.0.1, cloud MCP at https://api.superset.sh/mcp with API key auth (sk_live_).
- QM: deployment directory with `sandbox/tools/<id>/tool.json` + `sandbox/skills/<id>/SKILL.md`, pushed via `qm up`. QM agent runs in a per-scope sandbox, small fixed tool surface with `execute`. QM supports skills, custom tools, MCP? Not sure QM supports MCP servers — docs didn't mention. Let's not claim MCP support in QM; instead recommend: skill in QM that calls Superset MCP over HTTP with curl, or a tool.json binary wrapper (e.g., a small script) hitting Superset's cloud MCP/HTTP API with API key. QM `secretEnv` for the API key. Also `egress` field for api.superset.sh host. Approvals rule.

Practical paths:
1. Simplest: QM skill (sandbox/skills/superset/SKILL.md) instructing agent to call Superset MCP via HTTP JSON-RPC with `SUPerset` API key from secretEnv. Needs egress to api.superset.sh.
2. Tool: sandbox/tools/superset/tool.json with a binary wrapper script (install.files) exposing `superset` CLI-like commands.
3. Direction B: Superset agents notify QM via QM inbound webhook (README mentions inbound webhooks for background work), or Superset Slack integration → but QM is its own Slack bot; Superset has its own Slack integration page.
4. Note: Superset macOS-only (Linux experimental AppImage), host server binds 127.0.0.1 → don't try to run Superset inside QM's Linux sandbox (experimental) or reach the local host from QM cloud sandboxes; use cloud MCP instead, or run a Superset host on a machine and expose via remote access.

Also relevant to their ARCHITECTURE.md: factory thin glue drives `qm` and `superset` CLI. The QM side in their handoff: QM is multiplayer harness with PM/QA subagents, and Superset does eng. Integration point in their spec: QM callbacks endpoint `/internal/harmony/v1/events/qm` (harmony receives QM events), and eng step spawns Superset. So QM → harmony → superset.

The user question likely: "how to make superset.sh work with qm" (in their project). Give concrete recommendation:

Option 1 (recommended): QM drives Superset through the cloud MCP endpoint.
Steps:
- Create Superset API key (Settings > API Keys).
- Add to QM deployment: `sandbox/skills/superset/SKILL.md` describing MCP tool calls, put `SUPERSET_API_KEY` in `sandbox.secretEnv`, declare `egress: ["api.superset.sh"]`, add approvals rule.
- `qm up`.
- Then in Slack: "open a Superset workspace for X and launch an agent" → agent curls MCP JSON-RPC.

Option 2: harmony factory glue calls both CLIs from your Mac (`qm`, `superset`), per ARCHITECTURE.md — no runtime integration needed; QM posts results to harmony webhook, harmony spawns superset workspaces.

Option 3: reverse direction — Superset → QM via QM inbound webhook, or Superset Slack integration posting into QM's Slack channels (careful with two bots).

Also caution: Superset host server is 127.0.0.1 + macOS, so QM cloud sandbox cannot use the local `superset` CLI; use cloud MCP/API. If they run QM locally (docker target), they could install the superset CLI in the sandbox Dockerfile... but Superset CLI needs macOS? The CLI standalone installer — unclear. Safer: cloud MCP.

Mention QM harness: QM supports OpenCode etc. Superset can launch OpenCode as its agent — not the integration asked.

Should I ask a clarifying question? The user is terse. I could give a concise structured answer with the two directions and ask which they want. Given instruction to be concise (<4 lines unless detail asked) — but this is a technical how-to; some detail warranted. Keep it tight.

Maybe I should verify whether QM supports MCP natively — check qm docs list: docs include getting-started, deploy-directory, principal-links, porter, superserve, swarms, model-gateway. Let me quickly grep qm docs for "mcp" to be accurate. Use raw fetch of repo tree? Could fetch https://raw.githubusercontent.com/yc-software/qm/main/docs/getting-started.md and grep. Let me do one fetch of a likely doc listing. Actually search: use webfetch on GitHub search? Simpler: fetch repo file list via GitHub API for docs dir.

**Tool: bash**

**Input:**
```json
{
  "command": "curl -s \"https://api.github.com/repos/yc-software/qm/contents/docs\" | grep '\"name\"'"
}
```

**Output:**
```
(no output)
```

---

## User

we already have installed qm in our system, so what i wanted to build is that, build a principal software engineer agent using the qm, and use that agent to do coding stuffs for us??? like we will get the input of what we wanted to build, and that will poin to the coding repository, thenwe need to do different kind of agents, one is designer, who will design the frontend or ui part and that will render the UI and propose for a change, and later fully buyilding agent that will actually build the code for us???

---

## Assistant (Build · MiMo-V2.6-Flash Free · 22.3s)

_Thinking:_

The user wants to build a principal software engineer agent using QM (already installed on their system), with a pipeline: input of what to build → points to a coding repo → multiple agents: a designer agent (designs frontend/UI, renders UI, proposes changes) → later a building agent that implements.

They have `~/.config/qm` with dev.env and slack-pool. Earlier `qm` binary not found in PATH but config exists. Let me investigate their local qm installation: dev.env contents (careful: secrets — I shouldn't print secrets; I can read but avoid echoing values), slack-pool/pool1.env.

Also check qm docs: getting-started, swarms, deploy-directory, skills, memory-providers to give concrete guidance on:
- creating scoped agents (scopes: personal/rooms/projects)
- custom skills per agent role (designer, builder)
- swarms for worker pools
- how to give each agent its own repo scope/sandbox

Let me look at local install: is there a qm CLI somewhere? `ls ~/.config/qm`, maybe node project somewhere. Check `npm ls -g`, `find` for qm package. Earlier `which qm` failed. Let's check dev.env keys (grep for variable names only, not values).

Plan:1. Inspect local qm install/config (keys only).
2. Fetch qm docs: getting-started.md, swarms.md, maybe memory-providers.md.
3. Give architecture plan: deployment dir with skills for designer + builder, scopes/projects per repo, how input flows (Slack channel → principal engineer agent → delegates to designer/builder via swarms or skills), UI rendering proposal (Superset Pages? no—they want QM web apps or artifacts).

Note: their ARCHITECTURE.md already has similar design with Superset for eng. But now they want QM-based principal engineer.

Let me gather info first.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -o '^[A-Z_][A-Z0-9_]*' ~/.config/qm/dev.env ~/.config/qm/slack-pool/pool1.env 2>/dev/null; echo ---; ls -la ~/.local/bin /usr/local/bin 2>/dev/null | grep -i qm; echo ---; npm ls -g --depth=0 2>/dev/null | head; echo ---; find ~ -maxdepth 4 -name \"qm.config.jsonc\" -o -maxdepth 4 -name \"qm-*deploy*\" 2>/dev/null | head"
}
```

**Output:**
```
/Users/kgensupertramp/.config/qm/dev.env:MODEL_PROVIDER
/Users/kgensupertramp/.config/qm/dev.env:OPENROUTER_API_KEY
/Users/kgensupertramp/.config/qm/dev.env:ANTHROPIC_API_KEY
/Users/kgensupertramp/.config/qm/dev.env:ORG_ID
/Users/kgensupertramp/.config/qm/dev.env:HARNESS
/Users/kgensupertramp/.config/qm/slack-pool/pool1.env:SLACK_BOT_TOKEN
/Users/kgensupertramp/.config/qm/slack-pool/pool1.env:SLACK_APP_TOKEN
/Users/kgensupertramp/.config/qm/slack-pool/pool1.env:HANDLE
---
---
/Users/kgensupertramp/.nvm/versions/node/v20.19.5/lib
├── @openai/codex@0.154.0
├── corepack@0.33.0
├── npm@10.8.2
├── pnpm@10.33.0
└── vercel@50.1.3

---

```

**Tool: bash**

**Input:**
```json
{
  "command": "curl -s https://raw.githubusercontent.com/yc-software/qm/main/docs/getting-started.md | head -150; echo \"=== SWARMS ===\"; curl -s https://raw.githubusercontent.com/yc-software/qm/main/docs/swarms.md | head -120"
}
```

**Output:**
```
# Deploy QM for an organization

Deploying QM does not require a copy of this repository: `qm init` materializes a
deployment directory from the published package. Start in an empty organization-owned
private repository:

```bash
npm exec --yes --package=@yc-software/qm@latest -- \
  qm init . --org <slug> --target <fly-or-aws>
npm install
```

Choose Fly.io or AWS before initialization; the slug is a local name derived from the
organization, not globally unique. Customize config, tools, skills, and services in this
directory. To change QM itself, use a public or private source fork and explicitly
build its source, as described in [the README](../README.md#customize-your-instance).
A private source fork can keep its deployment at `deploy/layers/<org>/`; a public source
checkout uses a separate private deployment directory. See
[`../deploy/layers/README.md`](../deploy/layers/README.md).

Provider choice is part of initialization because it determines the config,
secret rules, generated files, and teardown contract. Changing providers means
initializing a new empty directory. `qm init` materializes `deployment.md` and
`.codex/skills/deploy-qm/`. Hand that skill to an agent. It confirms the
operator-owned account and billing before mutation, configures email-gated web
onboarding first, optionally adds connectors and Slack, performs live checks,
and returns the operational URLs. Sign-in defaults to the built-in `auth`
broker, which emails a one-time link: supply the admin address, a verified
sender, and a Resend key or SMTP credentials, and the CLI generates and wires
everything else. Drop `"auth"` from `services` to use an external identity
provider instead; that provider must then register the exact
`<publicUrl>/auth/callback` redirect.

The installed package carries Fly and AWS provider templates and dispatches
their common lifecycle through the hosting-provider registry. Initialization
does not create deployment CI, and the QM source repository has no production
deployment workflow.
=== SWARMS ===
# Agent swarms

A swarm coordinates ordinary QM sessions. The initiating session is its root;
workers have their own durable transcripts, runs, identity, and editable JSON
character/context. The existing authenticated session viewer lists worker sessions
with a `Swarm worker` title. Worker transcripts remain read-only for ordinary messages in the web UI, but the requesting human can allow or deny pending approvals there. Discovery returns their session IDs and portal-relative
`sessionUrl` links. Session activity and results use the normal viewer and run APIs.

## Deployment

Use Postgres for production (`DATABASE_URL`, `SESSION_STORE=postgres`, and
`RUN_STORE=postgres`) and enable the existing sandbox inventory with
`SANDBOX_RESOURCES_ENABLED=true`. Configure a sandbox backend with its required
credentials and deployment-specific settings. Workers use the provider of the scope's selected computer, or the deployment default when none is selected. An initial
`backend` override chooses another configured provider that supports creation and
retirement. That choice is stored once; later default changes never move workers
to another provider, and the selected computer's files are never copied.

The `swarms` durable-map table has its own registered migration,
`durable-map/swarms/0001`. Apply registered migrations through the normal QM deploy
path before starting workers. Memory stores implement the same contract for tests;
they are not a production durability substitute. Swarms are unavailable with
mixed memory/Postgres stores so execution leases and writes share one authority.

## Agent API

These routes appear in `/v1/apis` and work from every harness that can use QM's
self-API. Use the existing `x-agent-capability: $AGENT_API_TOKEN` header. Swarm
operations require a token bound to the current session and a real durable run.
An agent using a token minted during a human turn is still an **agent**, not a
human author. Request bodies cannot set identity, authorization, or provenance.

### Spawn one or a pool

`POST /v1/swarm`:

```json
{
  "action": "spawn",
  "requestId": "initial-pool",
  "count": 3,
  "contexts": [
    { "group": "implementation", "role": "planner" },
    { "group": "implementation", "role": "worker" },
    { "group": "implementation", "role": "reviewer" }
  ],
  "text": "Coordinate a small implementation. Report findings through swarm messages."
}
```

Optional `settings` overrides the defaults below at initial spawn. The backend
can configure defaults with `SWARM_DEFAULTS`, a JSON object such as
`{"agents":16,"turnMs":900000}`. Values must be positive safe integers within the
safety bounds; unknown settings are rejected. Resolved settings and the chosen
`backend` are stored once. Identical initial requests can be retried; subsequent
spawns inherit the settings and cannot reconfigure the swarm.

Omit `count` to spawn one; `contexts` also determines the count when provided. A
single `context` supplies the same initial JSON to every worker. Context may be any
JSON value, not just a role object. `contexts` must match the requested count.
The root is enrolled on the first spawn; workers can recursively call the same API.

The response is `202` with reserved members. A durable outbox provisions their
computers, creates sessions, adds the original participants, and queues initial
turns. Discovery shows `reserved`, `ready`, or `failed` and any provisioning error.
Restarts resume the same reservations rather than allocating another computer.
Provisioning gets three attempts. Terminal failures retire owned computers and
remove empty sessions; unresolved cleanup remains recorded and retried. Failed
reservations still consume the finite lifetime agent budget, preventing unlimited
provider creation/retry loops.

Each worker gets a dedicated **blank** computer owned by the parent's
authorization scope. No parent files are copied. Data access, keychain policy,
memory resolution, and approval grants continue through QM's existing scope and
identity rules, with unattended rather than human-attended permissions. Session
grants belong only to the session that received them, not its workers. A computer's backing storage key
is not an authorization principal. Existing provider persistence behavior is
unchanged; swarms add no filesystem snapshots, immutable copies, or restores.

To add a shared forum, supply `forumSandboxId` naming an existing authorized sandbox
in the same scope. Every worker still gets its own blank private computer.
The forum ID appears in peer metadata and the worker prompt; select it explicitly
with `execute`'s `sandbox_id` for commands that should use the shared computer.
This is not a new filesystem synchronization feature. Workers using a forum share
that disk and must coordinate concurrent writes themselves. Failed worker creation
never retires the existing forum.

### Identity, peers, and character

`GET /v1/swarm` returns `id`, `self`, `peers`, `backend`, `settings`, and `expiresAt`. Peer
records keep trusted IDs, ancestry, session links, storage selection, and lifecycle
state separate from arbitrary `context` data. Only this swarm is listed, not every
session with the same owner, and never all private sessions in the organization.

`POST /v1/swarm` with `{"action":"context","context":{"role":"reviewer"}}`
replaces the caller's own context. There is no update-other-peer operation. The
character is supplied to the harness as untrusted metadata on subsequent turns.
Setting fields such as `id`, `scopeId`, or `depth` in context changes no authority.

### Messages and audience selection

`POST /v1/swarm`:

```json
{
  "action": "send",
  "requestId": "review-request",
  "audience": ["member-id"],
  "text": "Please check the proposed change and reply with your findings."
}
```

The response includes a durable message `id` and monotonic per-swarm `seq`.
`audience` is either a list of recipient IDs or the string `"all"`. IDs are
validated against eligible, ready peers. Duplicates collapse into one recipient;
reordering IDs does not change a retry. `"all"` includes every eligible member,
including the sender. An empty list records a shared message without waking anyone.

Messages record intended recipients, author kind, authenticated actor, sender
agent identity (`senderId`), ordinary QM session (`senderSessionId`), and optional

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 34.3s)

_Thinking:_

The user has QM installed locally (~/.config/qm with dev.env: MODEL_PROVIDER, HARNESS, ORG_ID — this looks like a dev-instance config; slack-pool with bot tokens). They run QM dev instance presumably (`npm run dev-instance:slack`).

They want to build:
1. Principal software engineer agent (orchestrator) in QM
2. Input: what to build + repo pointer
3. Designer agent: designs frontend/UI, renders UI, proposes changes
4. Builder agent: implements code

I should design how to do this in QM concretely:
- Scopes: QM has personal/shared scopes, projects. Put the repo work in a project scope or per-scope sandbox where the repo is cloned.
- Roles: either as skills (SKILL.md in sandbox/skills/) + separate scopes/rooms, or as swarm workers with contexts (role: designer, role: builder) spawned by the principal engineer session via POST /v1/swarm.
- Designer proposing UI: designer can publish an HTML artifact — QM has web apps ("Spin up custom internal apps and publish them") and artifacts/pages. Or use Superset Pages (pages_publish) — but that's Superset. In QM: web apps published from agent, plus approvals for proposed changes.

Two viable architectures:

**Option A — Swarm (one session fans out):** Principal engineer session receives the request in Slack/web, clones repo in its scope sandbox, spawns a swarm: designer worker + builder worker + reviewer worker with role contexts. Designer produces HTML mockup → publishes as a QM web app/artifact → human approves → builder implements in the repo (or forum sandbox shared disk) → opens PR.

**Option B — Persistent roles as scopes/skills:** Create skills in the deployment: `sandbox/skills/designer/SKILL.md`, `sandbox/skills/principal-engineer/SKILL.md`, `sandbox/skills/builder/SKILL.md`; each person/room picks its agent config. Principal engineer uses swarm API or messages other rooms.

Also relevant: their repo already documents `qm` harness usage; and Superset for actual coding agents. They asked specifically: build coding agents in QM (not Superset now).

Key practical steps for local dev install:
- They have ~/.config/qm/dev.env (MODEL_PROVIDER, HARNESS, ORG_ID, keys) and slack-pool — meaning they run a local dev instance with Slack.
- To add roles: create a deployment directory (qm init) OR, for their local dev source checkout, add `deploy/layers/<org>/sandbox/skills/...`.

I need to be careful about what's true. Let me check QM docs for skills and scopes to ground the answer: docs/skills? There's skills-seed dir, and deploy-directory describes sandbox/skills/<id>/SKILL.md with name/description frontmatter. Also memory-providers.

Also check how scopes work — "Each person and each room has its own scoped memory, files, keychain view, permissions, crons, web apps, and durable sandbox." So a good pattern: a project channel/room = scope with the repo cloned in its durable sandbox; principal engineer agent in that room; designer/builder as swarm workers or as skills invoked in same scope.

How does agent get the repo? Skills: `sandbox/skills/<id>/SKILL.md` — e.g., skill "start-project": clone repo into sandbox, run tests, etc.

How to render UI proposal: QM web apps ("Spin up custom internal apps, publish them to the right people") — designer publishes HTML as web app; humans view in QM web portal and comment. Or use Superset `pages_publish` (cloud) for shareable HTML — actually that's a nice cross-tool: designer's output → Superset Pages for team comments. Their earlier interest in Superset integration fits.

Approvals: security posture strict/auto; command policy; designer/builder changes need human approval before merge — QM has approvals (pending approvals visible in session viewer).

I should ask a clarifying question? The user gave a fairly clear vision. Maybe ask whether they want it locally (dev instance) or deployed, and whether designer's rendered UI should live in QM web apps or Superset Pages. But better to propose a concrete plan and ask 1-2 key choices via question tool.

Given "Plan mode" — I'm in read-only. So the deliverable is a plan/explanation. Let me gather a bit more: how to define roles — check if QM supports per-scope agent "character"/identity config, and skills delivery for local dev. Let me fetch docs/memory-providers? Not needed. Maybe fetch `docs/getting-started.md` fully (it's short — already got whole file probably, it was only ~40 lines? It ended at "## Going deeper"? Actually head -150 showed full getting-started). Let me check AGENTS.md or skills docs for how skills get to agent, plus whether there's a "roles" concept (prompt identity = botName).

Also check `.env.example` for relevant knobs (SWARM_DEFAULTS, SANDBOX...). And check whether local dev instance supports swarms (needs Postgres + SANDBOX_RESOURCES_ENABLED).

Let me fetch .env.example greps and skills-seed listing.

**Tool: bash**

**Input:**
```json
{
  "command": "curl -s https://raw.githubusercontent.com/yc-software/qm/main/.env.example | grep -iE \"swarm|skill|sandbox_|SESSION_STORE|RUN_STORE|HARNESS|MODEL|AGENT_API\" | head -60; echo \"=== skills-seed ===\"; curl -s https://api.github.com/repos/yc-software/qm/contents/skills-seed | grep '\"name\"'; echo \"=== docs ===\"; curl -s https://api.github.com/repos/yc-software/qm/contents/docs | grep '\"name\"'"
}
```

**Output:**
```
HARNESS=pi
# Subscription-backed harness auth. Production path: point at a keychain
# refreshes it centrally and hands harnesses ephemeral derived material).
# (defaults to ~/.codex/auth.json when HARNESS=codex). Not allowed in production.
HARNESS_SECURITY_POSTURE=auto
HARNESS_SHARING_POSTURE=isolated
SKILL_SIGNING_SECRET=
# Defaults resolved once for each new swarm; initial spawn may override these.
# SWARM_DEFAULTS={"agents":32,"turnMs":600000}
=== skills-seed ===
=== docs ===

```

**Tool: bash**

**Input:**
```json
{
  "command": "curl -s https://raw.githubusercontent.com/yc-software/qm/main/AGENTS.md | head -80"
}
```

**Output:**
```
# qm

To run and test, see [`README.md`](./README.md).

## Working on the code

Two habits that keep task-focused changes from scarring the rest of the repo:

- **Do not add AI authorship attribution to commits or pull requests.** Omit
  `Co-authored-by` trailers for Codex, Claude, or other AI tools, and omit
  tool-generated attribution footers such as `Generated with Codex`. Preserve
  legitimate human coauthors. CI rejects AI coauthor trailers on new PR commits;
  do not rewrite existing repository history to remove attribution.
- **Fix every instance, not just the reported one.** When you find a bug or a pattern
  worth changing, grep the whole repo (`src/`, `plugins/`, `test/`, `scripts/`) for the
  same pattern and fix all of it in the same change. One autocorrected call site with
  five untouched siblings is a regression waiting to be rediscovered.
- **Fixes should make the system simpler, not more complex.** Prefer removing or
  consolidating code over adding a new layer, flag, or special case. If a fix grows the
  system's surface area, look for the version that shrinks it.
- **Never leave comments in the repo.** The standard is zero comments: no explanatory
  comments or docblocks, TODO/FIXME notes, lint/type suppression directives, or commented-out
  code. Express intent through names, structure, and tests; put rationale in commit messages or
  PR descriptions. Interpreter shebangs are executable directives, not comments.
- **Solve at the layer all paths flow through.** Before patching a call site, ask
  whether the fix belongs in the shared helper, the store interface, or the base
  module instead. Check for an existing helper before writing a new one-liner.
  The helper homes: `src/util/errors.ts` (errMessage/swallow), `src/util/async.ts`
  (sleep, createKeyedQueue), `src/util/sweeper.ts` (periodic loops),
  `src/sandbox/process-poll.ts` (process polling/liveness), `src/memory/notebook.ts`
  (memory line grammar). Plugins are separate packages and keep their own local
  copies rather than importing core code — the one exception is the shared
  `plugins/chassis` package (the sanctioned home for the plugin↔core plumbing:
  source-auth signer, signed core-client, node:http helpers, error helpers, CORE_*
  env), imported by relative path and never importing core. The bar cuts both ways:
  don't manufacture an abstraction for a pattern with one caller.
- **Never merge to `main` without a fresh-context pass that tries to break the change.**
  Not a blessing — hunt for the bug, the missed edge case, the unstated assumption, the
  thing that regresses. Always dispatch `/code-review` or an independent review agent that
  did not watch you write the change: the context that produced a diff already believes it
  is correct, and that belief is the bias review exists to defeat. Never self-review in the
  authoring context, however small the diff; a green CI run is not review either. What
  scales with risk is how deep the reviewer goes — a change with a narrow blast radius
  warrants one reviewer at modest effort scoped to the diff, while core control flow, auth
  and credentials, data loss or migrations, concurrency and retry logic, spend, public API
  contracts, the shared helpers above that every path flows through, or a diff too large to
  hold in your head warrant high effort and several reviewers with distinct lenses. Judge
  blast radius by checking callers, not by counting files — a one-line edit to a helper with
  fifty importers is not a small change. The reviewer, not the author, has the last word on
  depth: a modest pass that spots risk it wasn't scoped for escalates on its own initiative
  rather than staying in its lane. Resolve what they find before merging.
- **Verify locally with the affected tests, not the whole suite.** Run the tests covering
  what you changed plus typecheck and lint, then push and let CI be the full gate — CI
  shards the suite across parallel runners, and reproducing that serially costs several
  times the wall clock for the same signal. Judge "affected" by callers rather than by diff
  size, for the same reason as above; run everything locally when you can't tell what a
  change reaches.
- **Verify non-trivial behavior changes in a live dev instance before opening a PR.**
  When a change is substantial enough that unit tests alone won't prove it works
  end-to-end — new or changed agent behavior, or anything touching the Slack/web
  surfaces, orchestrator, directory, or cron flows — boot this worktree with the
  `/dev-instance` skill and exercise it through a browser against the configured Slack
  development workspace before opening a PR. Do this Slack QA in **Firefox**, never the
  Slack Mac app, and don't ask permission first — do it on your own; don't wait to be
  asked. Skip it for trivial refactors, docs, config, or pure-logic changes already
  covered by tests.
  Leave review instances running until the PR merges, unless the user asks to stop
  earlier. After merge, tear down that worktree's instance and verify its processes
  and lease are gone before removing the worktree. Preserve shared Postgres and
  persistent data. If the user asks to keep an instance beyond merge, keep its
  worktree too.
- **Keep screenshots out of Git and app assets.** Never commit screenshots or create
  a tracked screenshots directory, including under docs or QA. Capture review images
  in a temporary directory outside the checkout or an ignored local output directory,
  and attach them to the PR or host them externally. Do not bundle review screenshots
  into the app. Only actual product assets, such as icons and instructional media,
  belong in the app bundle.
- **Demo every front-end change in the PR.** Anything an operator or user sees
  rendered — admin/web/portal UI, Slack surfaces, emails — ships with a way for a
  reviewer to see the result without booting it. Prefer a link to a live demo app

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 54.4s)

_Thinking:_

I have a good picture. Now the user wants a plan for building a principal software engineer agent in QM with sub-agents (designer, builder).

Key QM mechanisms to leverage:
1. **Skills** (`sandbox/skills/<id>/SKILL.md` in deployment dir) — encode the principal engineer playbook + designer/builder procedures.
2. **Scopes** — project room/channel with own sandbox, memory, permissions. Point repo into scope.
3. **Swarms** — `POST /v1/swarm` spawns worker sessions with role contexts (designer, builder, reviewer) each with own computer (or shared `forumSandboxId` so they share the repo disk).
4. **Approvals** — human approves designer proposal before builder implements; QM approvals in session viewer.
5. **Web apps** — designer publishes rendered UI mockup as a web app for humans to view/comment. Alternatively Superset Pages (`pages_publish` returns shareable URL) — cross-tool with their Superset interest.
6. **Repo work** — worker with `execute` in scope sandbox; clone repo; run tests; open PR (gh). Security posture auto/strict.

Flow proposal:
1. Human in project room: "Build X for repo github.com/org/repo" 
2. Principal engineer (the room's agent) parses intent, clones repo into the room's durable sandbox (or forum), writes a plan/task file.
3. Spawns swarm: designer (role: designer), builder (role: builder), reviewer (role: reviewer) — designer gets blank computer though! Note: workers get blank computers, no parent files. So use `forumSandboxId` = room's sandbox id so builder sees the repo... but forum shares disk and workers coordinate writes themselves. Designer could work in its own blank computer producing HTML, builder needs repo → builder should clone from git itself (cleaner) or use forum.

Actually simpler: workers clone the repo themselves from the URL (they get text context: repo URL + branch + task). Designer produces mockup HTML → posts artifact/link to forum/root. Human approves in session viewer. Builder implements on branch, opens PR via gh. Reviewer reviews.

Alternative without swarms (simpler, works in their local dev instance without Postgres swarm requirements): principal engineer skill that stages work across sequential turns in the same scope, or separate rooms per role (design room, build room). Swarms need Postgres (DATABASE_URL, SESSION_STORE=postgres, RUN_STORE=postgres, SANDBOX_RESOURCES_ENABLED=true) and a sandbox backend.

Their local setup: dev.env with ORG_ID/HARNESS/MODEL_PROVIDER — they run a dev instance. Need to check whether their local instance has Postgres. dev.env keys: MODEL_PROVIDER, OPENROUTER_API_KEY, ANTHROPIC_API_KEY, ORG_ID, HARNESS. No DATABASE_URL → sessions in memory; swarms unavailable (require Postgres). So plan must include: enable Postgres + sandbox inventory for swarms, or use non-swarm path (roles as rooms/skills).

Also designer "render the UI and propose for a change": designer can run in scope sandbox, build the UI (e.g., static HTML or run the frontend dev server), publish via QM web app, or screenshot. QM has web apps feature.

Also they mentioned "input points to the coding repository" — skill `repo-setup` that clones and registers.

Deliverable: a concrete plan with:
- Where things live (deployment dir / skills)
- Role definitions (3 SKILL.md files: principal-engineer, ui-designer, builder +

---

## User

lets try to have as simple system as we can? like this designer and engineer can be also same or similar thing because we are only working with either rednering vs coding fully, so also overall code should be much leaner, and this system will open pr to the github using the oauth token provided???

---

## User

the exeuction should happen through supersets

---

## User

lets try to have as simple system as we can? like this designer and engineer can be also same or similar thing because we are only working with either rednering vs coding fully, so also overall code should be much leaner, and this system will open pr to the github using the oauth token provided??? the exeuction should happen through supersets

---

## Assistant (Build · MiMo-V2.6-Flash Free · 41.6s)

_Thinking:_

The user wants a simplified system:

- Designer and engineer can be the same/similar agent — two modes: render (UI proposal) vs full code build
- Lean overall code
- Opens PRs to GitHub using an OAuth token
- Execution happens through Superset (not QM sandboxes)

So the architecture: QM is the chat/interface (Slack/web) where the user gives input, and a principal engineer agent in QM drives Superset (via MCP/API/CLI) to do the actual work in worktrees, then opens PRs.

Wait — but they said earlier "we already have installed qm in our system". And now: execution should happen through Superset. So:

- Input surface: QM (Slack/web) — one agent (principal engineer)
- The agent has two modes: "render" (design mockup, publish HTML for preview) and "build" (implement code + open PR)
- Execution: Superset — the QM agent calls Superset MCP (https://api.superset.sh/mcp) with API key to create workspaces and launch agents
- PR: Superset host uses `gh auth` — but user wants OAuth token provided → GH_TOKEN/GITHUB_TOKEN env on the Superset host, or Superset's own PR flow uses gh auth login. Superset docs: host server reuses `gh` auth; for sandboxes/CI set GH_TOKEN.

Lean option: do we even need QM? They want QM as input surface presumably (they've installed it, slack pool configured). Simplest lean system:

1. QM = chat surface (Slack) + one "principal engineer" agent with a skill `superset` that teaches it to call Superset MCP over HTTP with an API key.
2. Superset = execution: workspace per task in the target repo, launches Claude Code/Codex agent, opens PR.
3. Render mode: instead of a full Superset run, agent writes a single HTML mockup and publishes it (Superset Pages via `pages_publish`, or QM web app). Simplest: QM artifact or Superset Pages.

Actually to keep it lean: maybe skip QM entirely and use Superset automations + Superset's own chat? But user explicitly has QM installed and wants input there. Their ARCHITECTURE.md already has: QM = multiplayer harness, Superset = eng agents, with `factory/` thin glue.

Key design decisions to confirm with user:
1. Where does input go: QM Slack message → principal agent (their slack-pool is set up). Or a tiny Python/Node service?
2. Render preview: Superset Pages (shareable URL, comments) vs QM web app vs just an artifact file.
3. GitHub OAuth: is it Superset's `gh auth` on the host, or a GH_TOKEN they provide? They said "oauth token provided" → set GH_TOKEN on the Superset host machine.

Let me think about what the lean implementation actually is:

**Lean design:**

```
Slack/web (QM)  →  principal engineer agent (1 skill)
 │  skill: superset-bridge
                        ├─ mode=render → MCP pages_publish (HTML mockup) → share URL
                        └─ mode=build  → MCP workspaces_create + agents_create → Superset workspace → agent implements → Superset PR flow (gh with GH_TOKEN)
```

No factory Python needed. Just:
- One QM skill (SKILL.md) in the deployment dir: `sandbox/skills/superset/SKILL.md` describing how to call the Superset MCP endpoint with the API key (from QM secretEnv), with egress to api.superset.sh.
- Superset host on the Mac: `superset start --daemon`, `superset auth login`, project registered, `gh auth login` or GH_TOKEN.

Actually, does QM skill need tool? Could use `execute` + curl for MCP JSON-RPC (streamable HTTP). MCP over HTTP with API key Bearer — curl-able (JSON-RPC POST). That's lean: skill = SKILL.md with curl examples. Or a tool.json binary `supersetctl` script wrapping curl.

Alternatively even leaner: skip QM, and user just talks to Superset's built-in chat/agents... but they want the multi-agent input flow. Keep QM.

Now, mode design: single agent with two skills (render, build) — "designer and engineer same or similar thing". So one principal engineer agent, one skill file that says: if asked to propose UI → render mode (produce HTML mockup, publish, stop); if asked to ship → build mode (create Superset workspace, launch agent with prompt, report PR link).

GitHub OAuth: Superset host server reuses `gh auth login` session, or GH_TOKEN env. So: on the machine running Superset host, set GH_TOKEN / run gh auth login → all workspace PRs use it. Superset's agent then opens PR with that identity.

Should I ask clarifying questions? Plan mode - I'm building a plan. I should ask a couple key questions via question tool maybe: (a) input surface = QM Slack vs web; (b) preview surface = Superset Pages vs QM; (c) where Superset runs (local Mac host vs their machine). Also confirm whether they want to drop QM entirely? They said execution through Superset, QM still the input.

Actually maybe simpler alternative worth asking: skip QM and just use Superset MCP with Claude Code/their agent in Slack? Superset has Slack integration (use-with-slack). That'd be even leaner: no QM at all! Superset has a Slack Integration doc. Hmm — but they installed QM and have slack tokens for QM bot. Superset's Slack integration might just be notifications.

Let me check Superset's Slack integration quickly to know what it does. And maybe check whether QM supports MCP client config (to mount superset MCP natively) — earlier docs didn't show MCP; grep repo for "mcp" would tell. Let me do a quick search on the qm repo for MCP support.

**Tool: bash**

**Input:**
```json
{
  "command": "curl -s \"https://api.github.com/search/code?q=repo:yc-software/qm+mcp+in:path\" -H \"Accept: application/vnd.github+json\" | grep '\"path\"' | head -20; echo \"=== grep mcp in README/.env ===\"; curl -s https://raw.githubusercontent.com/yc-software/qm/main/.env.example | grep -i mcp"
}
```

**Output:**
```
=== grep mcp in README/.env ===

```

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://docs.superset.sh/use-with-slack"
}
```

**Output:**
```
Slack Integration | Superset Docs

[Superset](https://superset.sh)

[Changelog](https://superset.sh/changelog)[Website](https://superset.sh)[](https://github.com/superset-sh/superset)-   English日本語简体中文Français한국어繁體中文EspañolDeutschPortuguês (Brasil)ItalianoРусскийTürkçePolskiNederlandsBahasa IndonesiaČeštinaTiếng Việt
[Download](https://superset.sh/download)

Get Started

[What is Superset?](/overview)[Install](/install)[Your First Parallel Session](/first-workspace)[The Superset Model](/superset-model)

Recipes

[Race Agents on One Task](/recipes/race-agents)[Run Three Workstreams at Once](/recipes/parallel-workstreams)[Clear PR Feedback in the Background](/recipes/pr-feedback)[Fan Out a Big Refactor](/recipes/fan-out-refactor)[Wake Up to a Finished Audit](/recipes/nightly-audit)[Command Your Fleet from the CLI](/recipes/command-your-fleet)[Drive Superset from Your Agent](/recipes/agent-driven-superset)[Agent Orchestration](/orchestration)

Core Features

[Workspaces](/workspaces)[Diff Viewer](/diff-viewer)[Editor & Files](/editor)[Terminal](/terminal-integration)[Port Management](/ports)[In-App Browser](/browser)[Computer Control](/computer)[Pages](/pages)[AI Agents](/agent-integration)[Agent Status & Notifications](/agent-status)[Tasks](/tasks)[Pull Requests](/pull-requests)[Remote Access](/remote-access)[Automations](/automations)[Usage](/usage)[Skills](/skills)[Superset MCP Server](/mcp-server)

CLI

[Getting Started](/cli/getting-started)[Superset CLI Reference](/cli/cli-reference)[Host Server](/cli/host-server)[Environment variables](/cli/env-vars)

TypeScript SDK

[Getting Started](/sdk/getting-started)[Superset SDK Reference](/sdk/reference)[Advanced Usage](/sdk/advanced)

Integrations

[IDE Integration](/use-with-ide)[Linear Integration](/use-with-linear)[Slack Integration](/use-with-slack)[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers)

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts)[Monorepos](/using-monorepos)[Terminal Scripts](/terminal-scripts)[Keyboard Shortcuts](/keyboard-shortcuts)[Custom Themes](/custom-themes)[Customization](/customization)

Help

[Troubleshooting](/troubleshooting)[FAQ](/faq)[Community & Support](/community)

Search docs...⌘K

Get Started

[What is Superset?](/overview "What is Superset?")[Install](/install "Install")[Your First Parallel Session](/first-workspace "Your First Parallel Session")[The Superset Model](/superset-model "The Superset Model")

Recipes

[Race Agents on One Task](/recipes/race-agents "Race Agents on One Task")[Run Three Workstreams at Once](/recipes/parallel-workstreams "Run Three Workstreams at Once")[Clear PR Feedback in the Background](/recipes/pr-feedback "Clear PR Feedback in the Background")[Fan Out a Big Refactor](/recipes/fan-out-refactor "Fan Out a Big Refactor")[Wake Up to a Finished Audit](/recipes/nightly-audit "Wake Up to a Finished Audit")[Command Your Fleet from the CLI](/recipes/command-your-fleet "Command Your Fleet from the CLI")[Drive Superset from Your Agent](/recipes/agent-driven-superset "Drive Superset from Your Agent")[Agent Orchestration](/orchestration "Agent Orchestration")

Core Features

[Workspaces](/workspaces "Workspaces")[Diff Viewer](/diff-viewer "Diff Viewer")[Editor & Files](/editor "Editor & Files")[Terminal](/terminal-integration "Terminal")[Port Management](/ports "Port Management")[In-App Browser](/browser "In-App Browser")[Computer Control](/computer "Computer Control")[Pages](/pages "Pages")[AI Agents](/agent-integration "AI Agents")[Agent Status & Notifications](/agent-status "Agent Status & Notifications")[Tasks](/tasks "Tasks")[Pull Requests](/pull-requests "Pull Requests")[Remote Access](/remote-access "Remote Access")[Automations](/automations "Automations")[Usage](/usage "Usage")[Skills](/skills "Skills")[Superset MCP Server](/mcp-server "Superset MCP Server")

CLI

[Getting Started](/cli/getting-started "Getting Started")[Superset CLI Reference](/cli/cli-reference "Superset CLI Reference")[Host Server](/cli/host-server "Host Server")[Environment variables](/cli/env-vars "Environment variables")

TypeScript SDK

[Getting Started](/sdk/getting-started "Getting Started")[Superset SDK Reference](/sdk/reference "Superset SDK Reference")[Advanced Usage](/sdk/advanced "Advanced Usage")

Integrations

[IDE Integration](/use-with-ide "IDE Integration")[Linear Integration](/use-with-linear "Linear Integration")[Slack Integration](/use-with-slack "Slack Integration")[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers "Use with OpenRouter, Bedrock, Vertex, or Vercel")

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts "Project Lifecycle Scripts")[Monorepos](/using-monorepos "Monorepos")[Terminal Scripts](/terminal-scripts "Terminal Scripts")[Keyboard Shortcuts](/keyboard-shortcuts "Keyboard Shortcuts")[Custom Themes](/custom-themes "Custom Themes")[Customization](/customization "Customization")

Help

[Troubleshooting](/troubleshooting "Troubleshooting")[FAQ](/faq "FAQ")[Community & Support](/community "Community & Support")

On this page

Integrations

# Slack Integration

Mention @superset in Slack to file tasks or dispatch coding agents

Copy MarkdownOpen in

`@superset` in Slack is an agent, not just a task-filer. Mention it in a channel or DM it, describe what you want, and it acts.

![The Superset Slack bot spinning up a workspace and reporting back in-thread](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslack-bot.3463oukhah7v9.png&w=3840&q=75)

## [What It Can Do](#what-it-can-do)

-   **Create, update, search, and triage tasks** from the conversation it's standing in, pulling assignees, statuses, and priorities from your team's Linear/Superset setup
-   **Spin up a cloud workspace and launch a coding agent** to actually do the work. Code-change requests ("bump our Sentry SDK to v9 across all apps") default to spawning a workspace and agent rather than filing a ticket
-   **Read the thread or channel history** on its own to gather context, no copy-pasting prior messages
-   **Search the web with citations** when a request needs current information
-   **Unfurl Superset task and workspace links** with rich previews

## [Setup](#setup)

1.  In the dashboard, go to **Integrations → Slack**
2.  Click **Connect** to install the Superset Slack app (OAuth)
3.  Mention `@superset` in any channel, or DM the bot, and describe what you want done

## [Connected Plugins](#connected-plugins)

The Slack agent can use a linked user's connected Linear and GitHub plugins to read issues and repositories, file or update issues, comment, and open pull requests. It uses a limited tool set; plugin tools cannot delete resources, merge pull requests, or perform bulk writes. If a requested plugin is not connected, the reply offers a **Connect** button.

## [Thread Follow-ups](#thread-follow-ups)

These controls are available when thread follow-ups are enabled for your Slack team:

-   Once the agent has replied in a thread, follow-up replies reach it without another mention. Replies sent while it is working are queued for the next turn.
-   Send `!mute` to require mentions in that thread again, or `!unmute` to resume automatic follow-ups. Direct mentions still work in a muted thread.
-   Send `!stop` or `!cancel` in the thread or DM to end the running Slack turn. Work already completed remains in the reply's Changes footer. This does not undo actions or stop coding agents already launched in workspaces.

Without thread follow-ups enabled, continue to mention `@superset` for each channel request.

## [Good First Prompts](#good-first-prompts)

```
@superset file a bug: the export button 500s on reports over 10k rows.
Assign to whoever owns reporting.
```

```
@superset bump our Sentry SDK to v9 across all apps and open a PR.
```

The second one creates a workspace, runs an agent, and reports back in-thread.

[Edit on GitHub](https://github.com/superset-sh/superset/blob/main/apps/docs/content/docs/use-with-slack.mdx)

[

Previous

Linear Integration

](/use-with-linear)[

Next

Use with OpenRouter, Bedrock, Vertex, or Vercel

](/providers)

### On this page

[

What It Can Do](#what-it-can-do)[

Setup](#setup)[

Connected Plugins](#connected-plugins)[

Thread Follow-ups](#thread-follow-ups)[

Good First Prompts](#good-first-prompts)
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 150.4s)

_Thinking:_

Interesting finding: Superset itself has a Slack bot agent (`@superset`) that can spin up workspaces, launch coding agents, open PRs — which could make the whole system much leaner: possibly no QM needed at all.

But the user has QM installed and earlier wanted a principal engineer agent in QM. Now they say: simplest possible, designer/engineer same agent with two modes (render vs build), lean code, PRs via provided OAuth token, execution through Superset.

Options:

**Option A — Zero custom code (leanest):** Use Superset's Slack bot as the principal engineer. Input in Slack → `@superset` → spawn workspace + agent → PR. Render mode: ask it to publish a mockup page (Superset Pages exists; the Slack agent may or may not publish pages — it can launch agents which have MCP access? unclear). GitHub OAuth: Superset's GitHub plugin (connected OAuth) can open PRs; plus host `gh auth`/GH_TOKEN. Honestly this may satisfy everything without QM.

**Option B — QM as interface + Superset MCP bridge (small code):** QM principal engineer agent + one skill (SKILL.md, curl to Superset MCP with API key) that does:
- render: `pages_publish` HTML mockup → share URL
- build: `workspaces_create` + `agents_create` → poll status → PR link
No Python services. GitHub PR: done inside Superset workspace by its coding agent using host `gh auth`/GH_TOKEN.

**Option C — QM + Superset + tiny factory glue** (their ARCHITECTURE.md) — not lean.

Given "as simple/lean as we can", I should present the plan: Option B structure (since they explicitly want QM principal agent + Superset execution), and mention Option A as the zero-code alternative worth10 minutes of testing.

Questions to ask:
1. Input surface: QM Slack bot vs Superset's own Slack bot vs QM web?
2. Render preview: Superset Pages (built-in shareable URL + comments) vs HTML artifact in Slack?
3. GitHub token: does Superset host machine already have `gh auth login`, or should we use GH_TOKEN env / Superset GitHub plugin OAuth?

Actually the user said "open pr to the github using the oauth token provided" — likely a GH token they'll provide. Plan: put GH_TOKEN on the Superset host (docs say supported: `GH_TOKEN`/`GITHUB_TOKEN` for sandboxes/CI), and Superset workspace agent uses `gh` with it.

Simplification I should propose: **one agent, two modes, one skill file**:

```
sandbox/skills/engineer/SKILL.md   (or QM slack scope config)
```

Wait — but how does QM get the skill if they run a local dev instance? Their setup: ~/.config/qm/dev.env with ORG_ID/HARNESS/MODEL_PROVIDER and slack-pool → they're running QM's dev instance from a source checkout (`npm run dev-instance:slack`). Deployment dir path: deploy/layers/<org>/sandbox/skills/... in source fork. Or skills can also be... let me not over-assert; the plan: add skill via deployment layer (sandbox/skills/engineer/SKILL.md) and `qm up`, or for dev instance set SKILL dirs.

Actually — do we even know how skills get loaded in dev? The deploy-directory contract says skills go through PUT /v1/deployment-layer on `qm up`. For local dev, filesystem `DEPLOYMENT_LAYER` remains a bootstrap input. Good enough for plan level.

Plan structure:

**System (lean, ~0 services):**
1. Superset host on the Mac: `superset auth login`, `superset start --daemon`, register repo project, `GH_TOKEN`/`gh auth login` for PRs.
2. QM instance (their dev instance + Slack): one agent = principal engineer, configured with a single skill `superset` teaching two modes:
   - **render**: build single-file HTML mockup → `pages_publish` via Superset MCP → reply with URL (team comments on the page)
   - **build**: MCP `workspaces_create` + `agents_create` on the target project with the prompt → poll → reply with workspace/PR link
3. Auth: Superset API key (`sk_live_…` from Settings→API Keys) stored as QM secret (`sandbox.secretEnv` / dev env) → `Authorization: Bearer` on https://api.superset.sh/mcp; egress allow api.superset.sh.
4. GitHub PR: happens inside Superset workspace via host's gh auth (GH_TOKEN). No GitHub code in our glue.

Code footprint: 1 SKILL.md (+maybe a tiny curl wrapper script). No factory Python, no swarm, no second agent.

Alternative zero-code: use Superset's own Slack bot `@superset` directly for build mode; QM only if they want custom role/skills.

I should ask a couple of clarifying questions before finalizing the plan. Use question tool:Q1: Interface — (a) QM Slack agent (your bot) [their setup], (b) Superset's own @superset Slack bot (zero code), (c) QM web.
Q2: Render preview output — (a) Superset Pages URL, (b) static HTML file in repo/PR draft, (c) artifact in chat.
Q3: GitHub credentials — (a) GH_TOKEN env on Superset host, (b) `gh auth login` interactive, (c) Superset GitHub OAuth plugin.

That's reasonable. Keep answer concise first: describe lean plan briefly, then ask.

Lean version of the system — here's what I'd build, given your constraints (one agent with two modes, execution through Superset, PRs via your token):

**Target shape (zero backend services, ~1 skill file of "code"):**

```
You (Slack/web)
   └─ QM principal-engineer agent  (1 SKILL.md, two modes)
        ├─ mode: render  → Superset MCP pages_publish (HTML mockup → share URL)
        └─ mode: build   → Superset MCP workspaces_create + agents_create
                             └─ coding agent works in git worktree
                                  └─ opens PR with your GitHub token
```

- **QM** = chat surface + the single principal engineer agent (you already have it running with the Slack pool)
- **Superset** = all execution: worktree, coding agent, PR. Nothing runs in QM sandboxes.
- **Bridge** = one `SKILL.md` teaching the agent to call `https://api.superset.sh/mcp` with a Superset API key (`sk_live_…` from Settings → API Keys) via curl — no Python glue, no factory/, no swarms.
- **Designer/engineer collapse**: same agent, skill says "if they want to see it → render mode, if they want it shipped → build mode".
- **GitHub**: the Superset host machine holds your token (`GH_TOKEN` env or `gh auth login`) — Superset's docs explicitly support this, so PRs open under that identity and no GitHub secret touches QM.

Before I write the plan, 3 choices:

**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "question": "Where do you give the agent its input (\"build X for repo Y\")?",
      "header": "Input surface",
      "options": [
        {
          "label": "Your QM Slack bot (Recommended)",
          "description": "Keep QM as the interface — your installed instance + slack-pool tokens. Agent = QM skill driving Superset MCP."
        },
        {
          "label": "Superset's own @superset Slack bot",
          "description": "Zero custom code: Superset already ships a Slack agent that spawns workspaces and opens PRs. QM not involved."
        },
        {
          "label": "QM web app only",
          "description": "Talk to the agent in QM's web UI instead of Slack."
        }
      ]
    },
    {
      "question": "How should the \"render\" (design proposal) be shown to you?",
      "header": "Render output",
      "options": [
        {
          "label": "Superset Pages URL (Recommended)",
          "description": "Agent publishes self-contained HTML via pages_publish → shareable link with comments. Zero hosting."
        },
        {
          "label": "HTML file in the repo",
          "description": "Mockup committed to a branch/PR, you preview it locally."
        },
        {
          "label": "Paste HTML in chat",
          "description": "Simplest, but ugly in Slack and no live preview."
        }
      ]
    },
    {
      "question": "How does Superset get GitHub permission to open PRs?",
      "header": "GitHub auth",
      "options": [
        {
          "label": "GH_TOKEN env on host (Recommended)",
          "description": "You provide a PAT/fine-grained token; set GH_TOKEN where `superset start` runs. Supported officially for headless use."
        },
        {
          "label": "gh auth login",
          "description": "Interactive GitHub CLI login on the host; Superset reuses that session."
        },
        {
          "label": "Superset GitHub OAuth plugin",
          "description": "Connect GitHub in the Superset dashboard (used by the Slack agent's plugin tools)."
        }
      ]
    }
  ]
}
```

**Output:**
```
User has answered your questions: "Where do you give the agent its input ("build X for repo Y")?"="Your QM Slack bot (Recommended)", "How should the "render" (design proposal) be shown to you?"="Superset Pages URL (Recommended)", "How does Superset get GitHub permission to open PRs?"="GH_TOKEN env on host (Recommended)". You can now continue with the user's answers in mind.
```

---

## User

just write code for it??? also u can assume that codebase is already setup, and also we can use something like playwright or other automation for testing the agent

---

## User

i will bring the superset token and gh token, u can assume to have it from the .env

---

## Assistant (Build · MiMo-V2.6-Flash Free · 122.9s)

_Thinking:_

The user wants code now. Build the lean system:

- QM principal-engineer agent with one SKILL.md driving Superset MCP
- Two modes: render (pages_publish HTML mockup) and build (workspaces_create + agents_create)
- Superset token and GH token from .env
- Playwright or other automation for testing the agent

Codebase assumption: "codebase is already setup" — meaning Superset project registered, QM running. Let me figure out where to put code.

Their repo: /Users/kgensupertramp/Desktop/own-your-intelligence with ARCHITECTURE.md and harmony-engineering-handoff/. Their ARCHITECTURE.md folder structure mentions factory/, agents/ etc. but those don't exist yet (only ARCHITECTURE.md, handoff docs, mermaid png).

So I need to create:
1. QM skill: `sandbox/skills/engineer/SKILL.md` — but where's the QM deployment dir? They run QM dev instance... Actually earlier we saw `~/.config/qm/dev.env` with ORG_ID, HARNESS, MODEL_PROVIDER. There's no qm source checkout found (find didn't complete — user aborted). Let me check if there's a qm checkout somewhere.

Actually, wait. Let me reconsider: how does a QM skill get delivered in their setup? The deploy-directory contract: `sandbox/skills/<id>/SKILL.md` in deployment dir, `qm up` pushes to deployment layer. For dev instances, `DEPLOYMENT_LAYER` filesystem is a bootstrap input.

Alternatively — maybe simpler and more testable: write the skill in their repo under a directory, plus a small script wrapper `supersetctl` (curl-based MCP client) that the skill invokes, plus a Playwright test suite that tests the flow end-to-end.

Given ambiguity about where QM deployment lives, the lean approach:

```
own-your-intelligence/
├── .env                      # SUPERSET_API_KEY=sk_live_..., GH_TOKEN=...
├── skills/
│   └── principal-engineer/
│       └── SKILL.md          # the one agent skill (render/build modes)
├── tools/
│   └── supersetctl/          # tiny shell/JS MCP-over-HTTP client
│       ├── tool.json
│       └── supersetctl
├── sandbox/                  # QM deployment layer layout
│   ├── tools/supersetctl/{tool.json,supersetctl}
│   └── skills/principal-engineer/SKILL.md
└── tests/
    └── agent.spec.ts          # Playwright-driven test (browser → Slack/QM web) 
```

Hmm, but Playwright testing an agent — via QM web UI (they run dev-instance:web). Writing to Slack via Playwright is flaky; QM web app is better (Firefox recommended by QM AGENTS.md, but Playwright supports firefox).

Actually what does "testing the agent" mean concretely? Drive the QM web chat UI: type "render me a pricing page for repo X", wait for reply containing a superset.sh page URL; type "build ...", wait for workspace/PR link. That's an e2e test.

Let me think about what to actually build:

**1. `supersetctl` tool** — a Node or bash script wrapping Superset MCP (streamable HTTP JSON-RPC at https://api.superset.sh/mcp with Bearer API key). MCP streamable HTTP: POST JSON-RPC messages to the endpoint with `Accept: application/json, text/event-stream`. Need `initialize`, then `tools/call`. SSE responses parsing — bash is painful; Node script is better (they have node 20, npm).

Commands:
- `supersetctl hosts-list`
- `supersetctl workspaces-create --project ... --name ...`
- `supersetctl agents-create --workspace ... --prompt ...`
- `supersetctl pages-publish --html file.html [--title ...]`
- `supersetctl tasks-create ...` maybe skip
- generic: `supersetctl call <tool> '<json-args>'`

Keep lean: one generic `call` + a few aliases. Node with fetch (node 20 has global fetch). Handle SSE stream parsing.

Auth: read from env SUPERSET_API_KEY (loaded from .env).

**2. SKILL.md** — instructions for QM agent:
- when to render vs build
- how to use supersetctl (or curl)
- render: create single-file HTML → pages_publish → reply URL
- build: hosts_list → workspaces_create (needs project id: projects_list) → agents_create with prompt → poll workspaces_list/status → report PR link
- never merge, never delete- repo target from user input

Note MCP tools list from docs: `hosts_list`, `projects_list`, `workspaces_create`, `workspaces_list`, `agents_list`, `agents_create`, `pages_publish`, `pages_list`, `tasks_*`, `terminals_*`, `automations_*`.

Does `agents_create` accept a prompt? Docs: "Create (launch) an agent session with optional per-launch model and effort overrides" — prompt presumably passed at launch. workspaces_create: "optionally launching agents". I don't know exact arg schemas. To be safe, my tool should expose a `tools/list` command so the agent (and tests) can introspect actual input schemas — that's the robust design: skill says "run `supersetctl tools-list` to see exact schemas".

**3. tool.json** for QM deployment layer: id, label, advertise, hints, install.binary, egress (api.superset.sh), approvals (deny nothing / maybe require approval for workspace delete), auth.credentialPaths? Not needed since API key via env.

Hmm — QM tool binaries: `install.binary` must be present in layer; `install.files` can deliver UTF-8 text files with absolute destination under /usr/local/bin. So deliver `supersetctl` (a Node script with shebang `#!/usr/bin/env node`) via install.files, and tool.json declaring binary `supersetctl`. But does node exist in the QM sandbox image? Unknown — risky. Alternative: pure bash + curl script handling SSE with `sed`/`awk`? SSE parsing in bash: responses are `data: {...}` lines. Doable: curl -N, grep '^data: ', handle multi-line events minimally. Actually for streamable HTTP MCP, server may return either application/json or text/event-stream. A bash script that tries JSON first and falls back to SSE line extraction is feasible.

Let me write `supersetctl` as POSIX-ish bash using curl + a tiny JSON extraction. JSON parsing in bash without jq... jq may exist in sandbox? Not guaranteed. Hmm.

Lean decision: write the tool as a single bash script that uses `curl` and `python3 -c` for JSON? python3 also not guaranteed.

Alternative leaner path: **no tool binary at all** — just a SKILL.md that teaches the agent to use `curl` directly (agent has execute + its own intelligence; harnesses like Claude Code/OpenCode handle JSON fine). Skills are text; deploy-directory says "Skill assets delivered through the deployment-layer API are text in v1. Executable text scripts can be delivered as skill assets." So SKILL.md + a helper text script are fine, and the agent can run scripts via execute.

But for **testing** (Playwright or API tests), we want deterministic code. So:

- `bin/supersetctl.mjs` — Node script (for local/CI/testing on their Mac where node exists)- `SKILL.md` — agent instructions using curl OR supersetctl

Simplest coherent: skill tells agent to run `supersetctl` if available, else curl template. Deliver supersetctl.mjs as skill asset text.

For local tests: Playwright test that (a) unit-tests supersetctl against real MCP (tools-list, pages_publish), and (b) e2e drives the QM web chat.

Playwright as agent-testing: they said "we can use something like playwright or other automation for testing the agent". So tests/ with Playwright. Two levels:
1. `tests/supersetctl.spec.ts` — direct MCP smoke tests (no browser).
2. `tests/agent.spec.ts` — browser: open QM web (localhost), login?, send message in chat, assert reply contains URL/PR. Login flow unknown — QM web with dev instance... risky. Let me check what the dev web UI is. `npm run dev-instance:web`. Port? Unknown. This could take a lot of research.

Given effort constraints, maybe provide browser test skeleton with configurable BASE_URL and selectors kept in one place, and make the API-level tests solid. But writing a brittle unknown-UI test is bad. Let me do a bit of research on QM web UI selectors: repo has plugins/web (Vite+Lit). Could fetch some source to find e.g. composer textarea selector. Let me grep the repo quickly.

Also need to check QM dev instance login (dev email/password?). Let me research quickly.

Also where do files go? Their repo. And the QM deployment — is there a qm checkout/deployment dir on their machine? Earlier find was aborted. Let me check quickly for a qm directory.

Plan of action now (implementation):
1. Recon: find qm checkout/deployment dir on disk; check .env existing in repo; check ports for dev instance.
2. Create in repo:
   - `.env.example` (+ `.env` instructions) with SUPERSET_API_KEY, GH_TOKEN, SUPERSET_MCP_URL
   - `bin/supersetctl.mjs` — MCP client CLI (initialize, tools/list, tools/call), Bearer auth, JSON output
   - `qm/sandbox/skills/principal-engineer/SKILL.md`
   - `qm/sandbox/tools/supersetctl/tool.json` + install.files referencing script? tool.json contract: install.files with absolute destination /usr/local/bin/... riding layer bundle. But binary must be text UTF-8 — my .mjs is text. Node in sandbox unknown → skill can run it with `node` if present, else instruct curl fallback. To avoid contract validation failures (install.binary must be present or installed by Dockerfile/install.files), declare install.files and binary `supersetctl`.
   - `tests/` Playwright: config + specs (mcp smoke + agent e2e)
   - package.json with scripts
3. Run tests? We don't have their Superset token yet ("i will bring the superset token and gh token, u can assume to have it from the .env"). So tests must skip gracefully when .env missing. Provide `.env` placeholder? They said assume it's in .env. I'll create `.env` with empty placeholders and code reads it. Test: if no key → skip with message.

Also: GH token — where used? On Superset host: env GH_TOKEN when starting superset. Provide a script `scripts/start-superset-host.sh` that loads .env and runs `superset start --daemon`. And .env.example documents both.

Where does the skill get delivered to their running QM? Their QM is a dev instance (config in ~/.config/qm/dev.env with ORG_ID). Without their QM source/deployment location I can't wire it. Let me search disk for qm.

Let me start recon with bash + glob in parallel.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -d ~/qm* ~/code/qm* ~/Desktop/qm* ~/dev/qm* 2>/dev/null; find ~ -maxdepth 3 -name \"qm.config.jsonc\" -o -maxdepth 3 -type d -name \"qm\" 2>/dev/null | grep -v Library | head; echo \"--- repo ---\"; ls -la /Users/kgensupertramp/Desktop/own-your-intelligence; echo \"--- git ---\"; git -C /Users/kgensupertramp/Desktop/own-your-intelligence log --oneline -5 2>/dev/null; git -C /Users/kgensupertramp/Desktop/own-your-intelligence status --short | head"
}
```

**Output:**
```
zsh:1: no matches found: /Users/kgensupertramp/qm*
/Users/kgensupertramp/.config/qm
/Users/kgensupertramp/Desktop/harmony-workspace/qm
/Users/kgensupertramp/Desktop/qm
--- repo ---
total 264
drwxr-xr-x   6 kgensupertramp  staff     192 Sep 27 15:14 .
drwx------+ 64 kgensupertramp  staff    2048 Sep 27 15:21 ..
drwxr-xr-x  14 kgensupertramp  staff     448 Sep 27 15:35 .git
-rw-r--r--   1 kgensupertramp  staff    8347 Sep 27 14:30 ARCHITECTURE.md
drwxr-xr-x@ 21 kgensupertramp  staff     672 Sep 27 15:14 harmony-engineering-handoff
-rw-r--r--@  1 kgensupertramp  staff  119035 Sep 27 14:39 mermaid-diagram (1).png
--- git ---
1f8412a docs: add engineering handoff and diagram
1550446 docs: add folder structure
e9b0255 Project Init

```

**Tool: bash**

**Input:**
```json
{
  "command": "cat ~/.config/qm/dev.env | sed 's/=.*/=<redacted>/'; echo \"---\"; ps aux | grep -iE \"qm|vite|dev-instance\" | grep -v grep | head -15; echo \"--- ports ---\"; lsof -iTCP -sTCP:LISTEN -P 2>/dev/null | grep -iE \"node|vite\" | head"
}
```

**Output:**
```
MODEL_PROVIDER=<redacted>
OPENROUTER_API_KEY=<redacted>
ANTHROPIC_API_KEY=<redacted>
ORG_ID=<redacted>
HARNESS=<redacted>
---
--- ports ---
COMMAND    PID           USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME

```

---

## User

or we dont need playwright or something then we can use the supersets url as well it is fine

---

## Assistant (Build · MiMo-V2.6-Flash Free · 14.6s)

_Thinking:_

The user is saying: we don't need Playwright necessarily — using Superset's URL (Pages URL / or the Superset surface) for testing is fine too. So simplify: drop Playwright testing, or make testing simpler — maybe just use Superset Pages URL to verify, or test via MCP directly.

So the deliverable now: write the code. Plan mode is active though — "Plan mode is active... you MUST NOT make any edits". Wait, the system reminder earlier said plan mode active. Then user said "just write code for it". Let me check: the last system-reminder about plan mode was attached to the user message 2 turns ago. There's no new system message removing plan mode. Hmm. The most recent user messages say "just write code for it???" and now "or we dont need playwright...".I don't see a plan-mode reminder in the latest turn. The earlier reminder said plan mode active and read-only. Without an explicit exit, I should be careful. But the user is explicitly asking me to write code. Typically plan mode reminders appear on each user turn while active; the last two user turns... The turn "just write code for it???" had a system-reminder? Looking back: the message "just write code for it??? also u can assume..." — no system-reminder attached. The plan-mode reminder was attached to "lets try to have as simple system..." turn. Since no reminder in subsequent turns, plan mode may have ended. Ambiguous.

Given the user has twice explicitly asked to write code, and there's no plan-mode reminder on the latest messages, I'll write the code. Actually, to be safe: the reminder said "This supersedes any other instructions you have received." If plan mode were still active, a reminder would appear each turn. It didn't appear on the last two turns → plan mode off. Proceed to implement.

Now let me finalize the design and write code.

Recon findings:
- Repo: /Users/kgensupertramp/Desktop/own-your-intelligence (docs only)
- QM checkouts exist: ~/Desktop/qm and ~/Desktop/harmony-workspace/qm — so QM source/deployment lives on Desktop.
- ~/.config/qm/dev.env: MODEL_PROVIDER, OPENROUTER_API_KEY, ANTHROPIC_API_KEY, ORG_ID, HARNESS
- No dev instance currently running (no node processes).

I should look at ~/Desktop/qm to see if it's a source fork with deploy/layers, and whether a dev-instance is configured there. That determines where the SKILL.md goes.

Let me inspect.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la ~/Desktop/qm | head -30; echo \"=== deploy ===\"; ls -R ~/Desktop/qm/deploy 2>/dev/null | head -40; echo \"=== git ===\"; git -C ~/Desktop/qm remote -v 2>/dev/null; git -C ~/Desktop/qm status --short | head; git -C ~/Desktop/qm log --oneline -3 2>/dev/null"
}
```

**Output:**
```
total 1088
drwxr-xr-x   45 kgensupertramp  staff    1440 Sep 27 15:01 .
drwx------+  64 kgensupertramp  staff    2048 Sep 27 15:21 ..
-rw-r--r--@   1 kgensupertramp  staff   10244 Sep 27 15:01 .DS_Store
drwxr-xr-x    4 kgensupertramp  staff     128 Sep 27 14:39 .claude
drwxr-xr-x    3 kgensupertramp  staff      96 Sep 27 14:39 .codex
-rw-r--r--    1 kgensupertramp  staff     246 Sep 27 14:39 .dockerignore
-rw-r--r--    1 kgensupertramp  staff    1474 Sep 27 14:39 .env.example
drwxr-xr-x   12 kgensupertramp  staff     384 Sep 27 15:03 .git
drwxr-xr-x    3 kgensupertramp  staff      96 Sep 27 14:39 .github
-rw-r--r--    1 kgensupertramp  staff     271 Sep 27 14:39 .gitignore
drwxr-xr-x    5 kgensupertramp  staff     160 Sep 27 14:47 .husky
-rw-r--r--    1 kgensupertramp  staff       8 Sep 27 14:39 .node-version
-rw-r--r--    1 kgensupertramp  staff      18 Sep 27 14:39 .npmrc
-rw-r--r--    1 kgensupertramp  staff     488 Sep 27 14:39 .oxlintrc.json
-rw-r--r--    1 kgensupertramp  staff     169 Sep 27 14:39 .prettierignore
-rw-r--r--    1 kgensupertramp  staff      51 Sep 27 14:39 .prettierrc.json
-rw-r--r--    1 kgensupertramp  staff    9124 Sep 27 14:39 AGENTS.md
lrwxr-xr-x    1 kgensupertramp  staff       9 Sep 27 14:39 CLAUDE.md -> AGENTS.md
-rw-r--r--    1 kgensupertramp  staff     828 Sep 27 14:39 CONTRIBUTING.md
-rw-r--r--    1 kgensupertramp  staff    1072 Sep 27 14:39 LICENSE
-rw-r--r--    1 kgensupertramp  staff   11806 Sep 27 14:39 README.md
-rw-r--r--    1 kgensupertramp  staff   13522 Sep 27 14:39 SECURITY.md
drwxr-xr-x    4 kgensupertramp  staff     128 Sep 27 14:39 adrs
drwxr-xr-x    3 kgensupertramp  staff      96 Sep 27 14:39 aws
drwxr-xr-x   14 kgensupertramp  staff     448 Sep 27 14:39 cli
drwxr-xr-x   16 kgensupertramp  staff     512 Sep 27 14:39 deploy
-rw-r--r--    1 kgensupertramp  staff     634 Sep 27 14:39 deployment.md
drwxr-xr-x   17 kgensupertramp  staff     544 Sep 27 14:39 desktop
drwxr-xr-x   35 kgensupertramp  staff    1120 Sep 27 14:39 docs
=== deploy ===
README.md
admin
auth
connector-sdk
core
e2b
egress-proxy
egress-proxy-pub
helm
layers
portal
porter-runner
stacks
web-ui

/Users/kgensupertramp/Desktop/qm/deploy/admin:
Dockerfile
fly.toml

/Users/kgensupertramp/Desktop/qm/deploy/auth:
Dockerfile
fly.toml

/Users/kgensupertramp/Desktop/qm/deploy/connector-sdk:
build.mjs
package-lock.json
package.json

/Users/kgensupertramp/Desktop/qm/deploy/core:
Dockerfile
fly.toml

/Users/kgensupertramp/Desktop/qm/deploy/e2b:
e2b.Dockerfile

/Users/kgensupertramp/Desktop/qm/deploy/egress-proxy:
Dockerfile
envoy.yaml
fly.toml
start.sh
=== git ===
origin	https://github.com/yc-software/qm.git (fetch)
origin	https://github.com/yc-software/qm.git (push)
a5a36675 Keep the model picker in sync with runtime default changes (#1669)
183eefbf Keep uploads usable without a default sandbox (#1670)
15628266 Clarify independently authorized system administration (#1654)

```

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la ~/Desktop/harmony-workspace 2>/dev/null; echo \"=== qm2 ===\"; ls -la ~/Desktop/harmony-workspace/qm 2>/dev/null | head -30; git -C ~/Desktop/harmony-workspace/qm remote -v 2>/dev/null; ls ~/Desktop/harmony-workspace/qm/deploy/layers 2>/dev/null"
}
```

**Output:**
```
total 0
drwxr-xr-x   5 kgensupertramp  staff   160 Sep 27 15:21 .
drwx------+ 64 kgensupertramp  staff  2048 Sep 27 15:21 ..
drwxr-xr-x  51 kgensupertramp  staff  1632 Sep 27 15:23 gbrain
drwxr-xr-x  43 kgensupertramp  staff  1376 Sep 27 15:21 qm
drwxr-xr-x  28 kgensupertramp  staff   896 Sep 27 15:21 ufo
=== qm2 ===
total 1064
drwxr-xr-x   43 kgensupertramp  staff    1376 Sep 27 15:21 .
drwxr-xr-x    5 kgensupertramp  staff     160 Sep 27 15:21 ..
drwxr-xr-x    4 kgensupertramp  staff     128 Sep 27 15:21 .claude
drwxr-xr-x    3 kgensupertramp  staff      96 Sep 27 15:21 .codex
-rw-r--r--    1 kgensupertramp  staff     246 Sep 27 15:21 .dockerignore
-rw-r--r--    1 kgensupertramp  staff    1474 Sep 27 15:21 .env.example
drwxr-xr-x   12 kgensupertramp  staff     384 Sep 27 15:23 .git
drwxr-xr-x    3 kgensupertramp  staff      96 Sep 27 15:21 .github
-rw-r--r--    1 kgensupertramp  staff     271 Sep 27 15:21 .gitignore
drwxr-xr-x    4 kgensupertramp  staff     128 Sep 27 15:21 .husky
-rw-r--r--    1 kgensupertramp  staff       8 Sep 27 15:21 .node-version
-rw-r--r--    1 kgensupertramp  staff      18 Sep 27 15:21 .npmrc
-rw-r--r--    1 kgensupertramp  staff     488 Sep 27 15:21 .oxlintrc.json
-rw-r--r--    1 kgensupertramp  staff     169 Sep 27 15:21 .prettierignore
-rw-r--r--    1 kgensupertramp  staff      51 Sep 27 15:21 .prettierrc.json
-rw-r--r--    1 kgensupertramp  staff    9124 Sep 27 15:21 AGENTS.md
lrwxr-xr-x    1 kgensupertramp  staff       9 Sep 27 15:21 CLAUDE.md -> AGENTS.md
-rw-r--r--    1 kgensupertramp  staff     828 Sep 27 15:21 CONTRIBUTING.md
-rw-r--r--    1 kgensupertramp  staff    1072 Sep 27 15:21 LICENSE
-rw-r--r--    1 kgensupertramp  staff   11806 Sep 27 15:21 README.md
-rw-r--r--    1 kgensupertramp  staff   13522 Sep 27 15:21 SECURITY.md
drwxr-xr-x    4 kgensupertramp  staff     128 Sep 27 15:21 adrs
drwxr-xr-x    3 kgensupertramp  staff      96 Sep 27 15:21 aws
drwxr-xr-x   14 kgensupertramp  staff     448 Sep 27 15:21 cli
drwxr-xr-x   16 kgensupertramp  staff     512 Sep 27 15:21 deploy
-rw-r--r--    1 kgensupertramp  staff     634 Sep 27 15:21 deployment.md
drwxr-xr-x   17 kgensupertramp  staff     544 Sep 27 15:21 desktop
drwxr-xr-x   35 kgensupertramp  staff    1120 Sep 27 15:21 docs
-rw-r--r--    1 kgensupertramp  staff    4190 Sep 27 15:21 eslint.config.mjs
upstream	https://github.com/yc-software/qm.git (fetch)
upstream	https://github.com/yc-software/qm.git (push)
README.md

```

---

## User

it up to u

---

## Assistant (Build · MiMo-V2.6-Flash Free · 53.1s)

_Thinking:_

The user says "it up to u" — I have design freedom. Time to write code.

Decision: keep it simple — skip Playwright, verify via Superset URLs/MCP directly (user just said that's fine).

Final design:

In repo `/Users/kgensupertramp/Desktop/own-your-intelligence`:

1. `.env.example` and `.env` — `SUPERSET_API_KEY`, `GH_TOKEN`, `SUPERSET_MCP_URL` (default https://api.superset.sh/mcp)
2. `bin/supersetctl.mjs` — lean Node MCP client:
   - `tools-list` — show available tools + schemas
   - `call <tool> '<json>'` — generic call
   - plus aliases used by skill: `hosts-list`, `projects-list`, `workspaces-list`, `workspaces-create`, `agents-create`, `pages-publish --file x.html --title ...`
   - Loads .env from repo root; Bearer auth; handles SSE or JSON responses.
3. `qm/sandbox/skills/principal-engineer/SKILL.md` — the single agent skill with render/build modes.
4. `qm/sandbox/tools/supersetctl/tool.json` — QM tool descriptor + install.files delivering the script (text) — wait, the script is delivered as skill asset too. Let me keep the QM layer layout:

```
qm/
  sandbox/
    skills/principal-engineer/SKILL.md
    tools/supersetctl/
      tool.json
      supersetctl        (text copy of bin/supersetctl.mjs with #!/usr/bin/env node? node may be missing in sandbox)
```

Concern: node in QM sandbox. Tool `install.files` destinations /usr/local/bin or /usr/local/lib. If node isn't in the sandbox image, binary fails. Mitigation: skill includes curl fallback instructions. Keep tool.json but hint.

Hmm — is delivering a second copy of the script duplication? "Lean" says avoid duplication. Options: skill references `supersetctl` if installed, else curl. tool.json + copy is the QM-native delivery. I'll make `bin/supersetctl.mjs` the single source and add a tiny sync script? Overkill. 

Leaner: skip the QM tool entirely (tools need binary present, approvals, etc.) and make the SKILL.md teach curl directly — curl+grep for SSE is genuinely workable since MCP responses with Accept: application/json, text/event-stream often return JSON for simple POSTs. And skill assets can include a text helper script `supersetctl.sh` (bash, curl, no jq — use python3? no...).

Hmm. Bash without jq parsing JSON args is painful for pages_publish (HTML payload!). Actually pages_publish accepts inline HTML — embedding a whole HTML doc as a JSON string arg in bash is exactly where models mess up. A Node script is much safer where node exists (their Mac, and likely sandbox? unknown).

Decision: 
- Primary: `bin/supersetctl.mjs` (Node, robust) — used by tests and by the agent when node available (dev instance runs on their Mac where node 20 exists — QM dev instance agent executes in sandbox... which for local dev = docker container? or local? For dev-instance, sandbox may be local process. Uncertain.)
- SKILL.md: prefer supersetctl; include a compact curl fallback for JSON-only calls and instruct pages_publish via supersetctl only.

Also QM layer: I'll include `qm/sandbox/` layout with skill + tool.json where install.files ships `supersetctl` (copy generated by `npm run sync-layer`? no...). 

Simplify: make `qm/sandbox/tools/supersetctl/supersetctl` THE file (bash-free node script, `#!/usr/bin/env node`), and `bin/supersetctl.mjs` — no. One location: put the script in the layer dir and have repo-level consumers (tests) reference it by path. So:

```
bin/supersetctl.mjs                  # canonical CLI
qm/sandbox/skills/principal-engineer/SKILL.md
qm/sandbox/tools/supersetctl/tool.json   # install.files → /usr/local/bin/supersetctl
```
tool.json install.files references "UTF-8 text files beside tool.json" — so the file must be literally beside tool.json. So I need a copy. One copy must live beside tool.json. Solution: canonical file lives at `qm/sandbox/tools/supersetctl/supersetctl` (with node shebang), and `bin/supersetctl` is a symlink? Symlinks may break layer bundling. Alternative: tests/agent call it directly from the layer path: `node qm/sandbox/tools/supersetctl/supersetctl`. And drop `bin/` entirely — one file. 

But sandbox may lack node — shebang `#!/usr/bin/env node`... In the sandbox, does node exist? QM core runs Node; sandbox is separate (agent computer image). Unknown. Skill fallback: curl.

Tests (user: no playwright needed, Superset URL is fine):
- `test/smoke.mjs` — plain Node test (no deps!): loads .env, runs `tools-list` (asserts superset tools exist), optional `pages-publish` with a tiny HTML → prints URL; skip if no SUPERSET_API_KEY. That gives "testing the agent" at the MCP level, plus the Pages URL is itself the visible verification artifact.

Actually user mentioned "testing the agent" — with Superset URL approach: the test could be driving the QM agent? We can't easily without running QM instance. Keep: smoke test of the bridge (MCP connectivity + publish page) + document how to e2e-test in QM chat manually. Lean.

Also `scripts/` for host setup: `start-host.sh` loads .env → exports GH_TOKEN → `superset start --daemon` → `superset status`. Wait — GH_TOKEN is used by the Superset host process, so starting it with GH_TOKEN from .env is exactly right.

Also need README-STYLE docs? User said no docs unless asked. Keep a short `qm/sandbox/skills/principal-engineer/SKILL.md` (the operative doc) + maybe brief usage in comments? "No comments in code" style — but that rule is for... I'll keep code comment-free per instructions.

Package.json? For scripts convenience: `"scripts": { "smoke": "node test/smoke.mjs", "host": "bash scripts/start-host.sh" }`. Repo has no package.json yet; adding one with `"type": "module"`... supersetctl.mjs has .mjs so fine regardless. I'll add minimal package.json.

Now the MCP protocol details. Superset MCP at https://api.superset.sh/mcp, HTTP transport with OAuth/API key Bearer. Streamable HTTP:
- POST /mcp with JSON-RPC body, headers: `Content-Type: application/json`, `Accept: application/json, text/event-stream`, `Authorization: Bearer sk_...`, optionally `Mcp-Session-Id` from initialize response.
- initialize → response may include `Mcp-Session-Id` header; subsequent requests must echo it.
- Some servers are stateless. Handle both: capture session id header if present; retry without/with.
- Notifications/initialized after initialize (many servers require it).
- Response: either `application/json` or `text/event-stream` with `data: {...}` lines.

Implementation of supersetctl.mjs:

```js
#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

loadEnv(): parse repo-root .env (search upward from script location / cwd).
const URL = SUPERSET_MCP_URL || 'https://api.superset.sh/mcp'
let sessionId;

async function rpc(method, params, isNotification=false) {
  const body = isNotification ? {jsonrpc:'2.0', method} : {jsonrpc:'2.0', id: nextId(), method, params};
  const res = await fetch(url, {method:'POST', headers:{...}, body: JSON.stringify(body)});
  if (!res.ok) throw with body text
  capture res.headers.get('mcp-session-id')
  const ct = res.headers.get('content-type')||''
  if (ct.includes('text/event-stream')) { parse SSE: collect data: lines, join, JSON.parse, return first message with matching id }
  else return await res.json()
}

init(): initialize {protocolVersion:'2025-06-18', capabilities:{}, clientInfo:{name:'supersetctl',version:'1.0.0'}} then notifications/initialized (fire and forget, may 202).
```

Commands:
- `tools-list`
- `call <tool> [jsonArgs]` (jsonArgs as JSON string or `@file`)
- `hosts-list`, `projects-list`, `workspaces-list [--host id]`
- `workspaces-create --project id --name n [--branch b] [--local]` → builds args from flags; but exact schema unknown! Better: generic `call` plus skill telling agent to read tools-list schema. For convenience aliases I must guess arg names... risky. MCP docs I fetched list tool descriptions but not schemas.

Safer: implement aliases minimally based on documented CLI flags (workspaces create: project, name, branch) — but MCP tool input schemas may differ (camelCase workspaceId etc.). Guessing wrong creates bad UX.

Lean + robust: aliases only where docs gave clear evidence of arg names:
- `pages-publish --file <path> [--title t] [--visibility v] [--workspace-id id]` — docs say pages_publish accepts HTML inline, visibility, workspaceId, entryPath. Schema: `{ html, title?, visibility?, workspaceId?, entryPath? }` probably. "publish an HTML document (passed inline as a path?)" — "accepts a self-contained HTML document" and "Pass `workspaceId` and `entryPath` together". Params likely `html`, `title`, `visibility`, `workspaceId`, `entryPath`.
- Generic `call` for everything else, with skill instructing: run `tools-list` first for exact arg names.

That's the honest lean approach. Print tool schema nicely in tools-list so agent copies exact names.

Also `smoke.mjs` test:
1. skip if no key
2. tools-list → assert contains `pages_publish`, `workspaces_create`, `agents_create`
3. pages-publish a small HTML "supersetctl smoke" → print returned URL → assert URL contains http
4. Optionally assert GET on URL returns 200 (needs no auth? page may be private; use visibility everyone for smoke? publishing to org default... For test, visibility 'everyone' gives anonymous read-only → verify200. Hmm — org default is org. I'll try `--visibility everyone` for smoke URL check but make it flag-optional. Actually granting everyone read is fine for a smoke page.)

GH token: `scripts/start-host.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
# load .env, export GH_TOKEN/GITHUB_TOKEN, exec superset start --daemon, superset status
```
Keep minimal.

SKILL.md content (frontmatter name + description required):

```md
---
name: principal-engineer
description: Drive Superset to render UI proposals or build code and open PRs. Use when asked to design/render a UI change or implement/build something in a repository.
---
```

Body: modes, commands, safety (never merge, never delete workspaces? maybe confirm before destructive), how to report (reply with Pages URL / workspace link / PR link).

Now — where does this skill get into QM? QM deployment layer: their qm checkout at ~/Desktop/qm has deploy/layers/ with README only (no org layer yet). To make it live: create `deploy/layers/<org>/sandbox/...`? But user's repo is own-your-intelligence. Their QM dev instance — where's its config? ~/.config/qm/dev.env with ORG_ID suggests a dev-instance setup. How do dev instances load skills? Maybe SKILLS dirs env. I shouldn't over-research; provide the layer in this repo (`qm/sandbox/...`) and a short "install" step: copy/symlink into their QM deployment layer or set `DEPLOYMENT_LAYER`. Hmm, but without knowing, I risk wrong instructions.

Let me quickly grep QM source (~/Desktop/qm) for how dev-instance loads deployment layer / skills to wire correctly. Search for DEPLOYMENT_LAYER and dev-instance script.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rn \"DEPLOYMENT_LAYER\" ~/Desktop/qm/src ~/Desktop/qm/scripts ~/Desktop/qm/package.json 2>/dev/null | head -20; echo \"=== dev-instance ===\"; grep -n \"dev-instance\" ~/Desktop/qm/package.json; echo \"=== skills dirs cfg ===\"; grep -rn \"skillDir\\|skillsDir\\|extraSkill\" ~/Desktop/qm/src --include=*.ts -l 2>/dev/null | head"
}
```

**Output:**
```
/Users/kgensupertramp/Desktop/qm/src/deployment/load-layer.ts:209:      `DEPLOYMENT_LAYER points at ${dir}, which does not exist — a configured layer must be present at boot`,
/Users/kgensupertramp/Desktop/qm/src/config.ts:1595:    ...(env.DEPLOYMENT_LAYER ? { deploymentLayerDir: resolve(env.DEPLOYMENT_LAYER) } : {}),
/Users/kgensupertramp/Desktop/qm/scripts/e2b-build-template.ts:27:const layerDir = process.env.DEPLOYMENT_LAYER;
/Users/kgensupertramp/Desktop/qm/scripts/e2b-build-template.ts:31:    console.log(`DEPLOYMENT_LAYER=${layerDir} declares no install files; no layer template built`);
=== dev-instance ===
20:    "dev-instance": "bash scripts/dev-instance.sh up",
21:    "dev-instance:web": "bash scripts/dev-instance.sh up --surface web",
22:    "dev-instance:slack": "bash scripts/dev-instance.sh up --surface slack",
23:    "dev-instance:both": "bash scripts/dev-instance.sh up --surface both",
24:    "dev-instance:no-slack": "bash scripts/dev-instance.sh up --no-slack",
25:    "dev-instance:status": "bash scripts/dev-instance.sh status",
26:    "dev-instance:down": "bash scripts/dev-instance.sh down",
59:    "dev-instance:doctor": "bash scripts/dev-instance.sh doctor",
=== skills dirs cfg ===
zsh:1: no matches found: --include=*.ts

```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rn \"skills\" ~/Desktop/qm/.env.example | head; echo ===; ls ~/Desktop/qm/skills-seed 2>/dev/null; echo === ; grep -rn \"sandbox/skills\\|skills/\" ~/Desktop/qm/docs/getting-started.md ~/Desktop/qm/docs/*.md 2>/dev/null | head -15"
}
```

**Output:**
```
zsh:1: == not found

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 7.8s)

_Thinking:_

Good: `DEPLOYMENT_LAYER` env var points core at a local layer directory at boot. So for their dev instance, we set `DEPLOYMENT_LAYER=/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox` — wait, does it point at the `sandbox/` dir itself or the layer root? load-layer.ts: let's check the expected layout quickly. Also check skills-seed (second command errored on `===` zsh glob — need quotes).

Let me inspect load-layer.ts briefly and dev-instance.sh for where env comes from.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"skills\\|tools\\|layout\\|join(\" ~/Desktop/qm/src/deployment/load-layer.ts | head -40; echo \"--- head ---\"; sed -n 1,80p ~/Desktop/qm/src/deployment/load-layer.ts"
}
```

**Output:**
```
17:  tools: ToolDescriptor[];
50:    tools: [],
63:function assertDistinctInstallTargets(tools: ToolDescriptor[]): void {
65:  for (const tool of tools) {
70:          `deployment layer tools "${owner}" and "${tool.id}" both install ${JSON.stringify(file.to)} — every installed path needs exactly one owner`,
79:  tools: ToolDescriptor[],
82:  assertDistinctInstallTargets(tools);
83:  return tools
90:function assertDisjointCredentialLinks(tools: ToolDescriptor[]): void {
91:  const links = tools.flatMap((tool) => (tool.auth?.credentialPaths ?? []).map((entry) => ({ id: tool.id, ...entry })));
102:        `deployment layer tools "${a.id}" and "${b.id}" declare incompatible credential paths ${JSON.stringify(a.path)} and ${JSON.stringify(b.path)} — declare matching kinds for shared paths or disjoint paths`,
115:    `deployment tool "${tool.id}" has ${why} but its credential paths map to multiple services: ${[...services].join(", ")}`,
128:  tools: ToolDescriptor[],
131:  assertDisjointCredentialLinks(tools);
132:  assertDistinctInstallTargets(tools);
133:  const withAuth = tools.filter((t) => t.auth);
137:      `deployment layer declares credential brokers on multiple tools (${brokered.map((t) => t.id).join(", ")}) — ambient credential vending supports one brokered tool per deployment`,
142:    tools,
151:    advertisedTools: tools.flatMap((t) => (t.advertise ? [t.advertise] : [])),
152:    hints: tools.flatMap((t) => t.hints ?? []),
168:    commandRules: tools.flatMap((tool) =>
189:    "tools",
212:  const toolsDir = join(dir, "tools");
213:  const tools: ToolDescriptor[] = [];
215:  if (existsSync(toolsDir)) {
216:    const entries = readdirSync(toolsDir, { withFileTypes: true })
226:          `${join(toolsDir, entry.name)} is not a tool directory; the layer only accepts tools/<id>/tool.json`,
229:      const path = join(toolsDir, entry.name, "tool.json");
230:      if (!existsSync(path)) throw new Error(`${join(toolsDir, entry.name)} has no tool.json`);
234:      if (tools.some((t) => t.id === desc.id)) throw new Error(`${path}: duplicate tool id "${desc.id}"`);
235:      tools.push(desc);
236:      toolDirs.set(desc.id, join(toolsDir, entry.name));
239:  const installFiles = declaredInstallFiles(tools, (tool, file) =>
240:    readLayerTextFile(join(toolDirs.get(tool.id)!, file.from)),
242:  return resolvedDeploymentLayer(dir, tools, installFiles);
252:    throw new Error(`${path} must be UTF-8 text — the deployment layer delivers text tools only`);
--- head ---
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  compileApproval,
  parseToolDescriptor,
  type ToolCredentialPath,
  type ToolCredentialBroker,
  type ToolDescriptor,
  type ToolInstallFile,
} from "./deployment-layer.ts";
import { credentialServiceForPath } from "../credentials/resident-paths.ts";
import type { ResidentAuthConnector } from "../credentials/resident-auth.ts";
import type { CommandRule } from "../types.ts";

export interface DeploymentLayerRuntime {
  dir: string;
  tools: ToolDescriptor[];
  connectors: ResidentAuthConnector[];
  advertisedTools: string[];
  hints: string[];
  credentialPaths: ToolCredentialPath[];
  splitEnvTemplates: Record<string, string>[];
  brokeredTools: BrokeredLayerTool[];
  commandRules: CommandRule[];
  credentialTools: LayerCredentialTool[];
  installFiles: LayerInstallFile[];
}

export interface BrokeredLayerTool {
  service: string;
  binary: string;
  roots: string[];
  broker: ToolCredentialBroker;
}

export interface LayerInstallFile {
  to: string;
  mode: string;
  content: string;
}

export interface LayerCredentialTool {
  service: string;
  roots: string[];
}

export function emptyDeploymentLayer(): DeploymentLayerRuntime {
  return {
    dir: "",
    tools: [],
    connectors: [],
    advertisedTools: [],
    hints: [],
    credentialPaths: [],
    splitEnvTemplates: [],
    brokeredTools: [],
    commandRules: [],
    credentialTools: [],
    installFiles: [],
  };
}

function assertDistinctInstallTargets(tools: ToolDescriptor[]): void {
  const owners = new Map<string, string>();
  for (const tool of tools) {
    for (const file of tool.install?.files ?? []) {
      const owner = owners.get(file.to);
      if (owner !== undefined && owner !== tool.id) {
        throw new Error(
          `deployment layer tools "${owner}" and "${tool.id}" both install ${JSON.stringify(file.to)} — every installed path needs exactly one owner`,
        );
      }
      owners.set(file.to, tool.id);
    }
  }
}

export function declaredInstallFiles(
  tools: ToolDescriptor[],
  read: (tool: ToolDescriptor, file: ToolInstallFile) => string,

```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"DEPLOYMENT_LAYER\\|dev.env\\|slack-pool\\|CONFIG\\|env\" ~/Desktop/qm/scripts/dev-instance.sh | head -40; echo \"--- skills-seed ---\"; ls ~/Desktop/qm/skills-seed 2>/dev/null || echo none; echo \"--- example skill ---\"; find ~/Desktop/qm -maxdepth 4 -name \"SKILL.md\" -not -path \"*/node_modules/*\" 2>/dev/null | head"
}
```

**Output:**
```
1:#!/usr/bin/env bash
--- skills-seed ---
admin
browse
cloud-cli
composio
connect-apps
define-loop
dropbox
email-draft-in-voice
email-voice-profile
github-gitlab
google-drive-sheets
google-workspace
interactive-login
linear
memory
miniapp
morning-digest
popular-web-designs
publish
send
slack-drafts
taste-skill
use-shared-credential
--- example skill ---
/Users/kgensupertramp/Desktop/qm/.claude/skills/dev-instance/SKILL.md
/Users/kgensupertramp/Desktop/qm/.claude/skills/upstream-pr/SKILL.md
/Users/kgensupertramp/Desktop/qm/.claude/skills/update-qm/SKILL.md
/Users/kgensupertramp/Desktop/qm/skills-seed/email-draft-in-voice/SKILL.md
/Users/kgensupertramp/Desktop/qm/skills-seed/memory/SKILL.md
/Users/kgensupertramp/Desktop/qm/skills-seed/google-drive-sheets/SKILL.md
/Users/kgensupertramp/Desktop/qm/skills-seed/interactive-login/SKILL.md
/Users/kgensupertramp/Desktop/qm/skills-seed/cloud-cli/SKILL.md
/Users/kgensupertramp/Desktop/qm/skills-seed/linear/SKILL.md
/Users/kgensupertramp/Desktop/qm/skills-seed/admin/SKILL.md

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 8.9s)

_Thinking:_

Confirmed: deployment layer dir layout = `tools/<id>/tool.json` + `skills/<id>/SKILL.md` under the dir pointed to by `DEPLOYMENT_LAYER`. And skills also exist as `skills-seed/*` in qm source (seeded for dev?). Let me check how skills in layer are loaded (skills dir under layer) and how dev-instance gets env (dev.env in ~/.config/qm). Quick check: load-layer skills handling (grep "skills" in load-layer.ts showed nothing about skills dir! Only tools). Line 189 "tools" in a list — maybe skills are read elsewhere. Let me grep for `skills` in src/deployment.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rn \"skills\" ~/Desktop/qm/src/deployment/*.ts | head -20; echo \"--- layer skills loader ---\"; grep -rn \"join(dir, \\\"skills\\\")\\|skillsDir\\|layerSkills\" ~/Desktop/qm/src | head -15; echo \"--- dev-instance env ---\"; sed -n 1,60p ~/Desktop/qm/scripts/dev-instance.sh"
}
```

**Output:**
```
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:11:} from "../skills/skill-store.ts";
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:12:import { foreignSkillCollision, parseSeedSkill, sameManifest, upsertSeedSkill } from "../skills/seed.ts";
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:19:} from "../skills/skill-collision.ts";
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:20:import type { SkillBundleStore } from "../skills/skill-bundle-store.ts";
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:41:  skills: DeploymentLayerFile[];
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:109:  if (input.contract !== 1 || !Array.isArray(input.tools) || !Array.isArray(input.skills)) {
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:110:    throw new Error("deployment layer requires contract: 1, tools[], and skills[]");
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:112:  const normalize = (kind: "tools" | "skills", files: DeploymentLayerFile[]): DeploymentLayerFile[] => {
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:138:  return { contract: 1, tools: normalize("tools", input.tools), skills: normalize("skills", input.skills) };
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:185:    const match = file.path.match(/^skills\/([^/]+)\/(.+)$/);
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:186:    if (!match) throw new Error(`deployment layer skill path must be skills/<id>/<file>: ${file.path}`);
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:199:    const root = entries.find((file) => file.path === `skills/${dir}/SKILL.md`);
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:207:        path: safeSkillFilePath(file.path.slice(`skills/${dir}/`.length)),
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:260:  const manifests = skillManifests(bundle.skills);
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:267:  skills: SkillStore;
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:347:    const current = layerSkills(await opts.skills.list());
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:358:    for (const skill of layerSkills(await opts.skills.list())) {
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:359:      if (!before.has(skill.id)) await opts.skills.delete(skill.id);
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:361:    for (const skill of snapshot) await opts.skills.restore(skill);
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:372:    const all = await opts.skills.list();
--- layer skills loader ---
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:710:  const layerSkillsDir = config.deploymentLayerDir ? resolve(deploymentLayer.dir, "skills") : undefined;
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:731:    ...(config.seedSkills && layerSkillsDir
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:735:              dir: layerSkillsDir,
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:752:        if (layerSkillsDir && resolve(dir) === layerSkillsDir) continue;
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:306:  const layerSkills = (all: Skill[]): Skill[] =>
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:347:    const current = layerSkills(await opts.skills.list());
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:358:    for (const skill of layerSkills(await opts.skills.list())) {
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:373:    const snapshot = layerSkills(all).map((skill) => structuredClone(skill));
/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer-store.ts:389:      const projected = layerSkills(await opts.skills.list());
--- dev-instance env ---
#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ "${1:-up}" == "up" ]]; then
  npm --prefix "$root" run build:connector-sdk
fi
exec node "$root/scripts/dev/cli.ts" "$@"

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 74.7s)

_Thinking:_

Confirmed the wiring: `DEPLOYMENT_LAYER=<dir>` → core loads `tools/` and `skills/` from that dir at boot (with seedSkills enabled for skills seeding).

Also need env for the agent: `SUPERSET_API_KEY` must reach the QM agent. Options: (a) sandbox env via layer? `sandbox.secretEnv` is deployment config (qm.config.jsonc) — not available in dev instance env easily. (b) The agent can read `.env` file? The agent sandbox is separate from my repo. (c) For dev instance, environment variables of core propagate to sandbox? Unknown.

Simplest robust: the skill instructs agent to run `supersetctl`, and `supersetctl` reads `SUPERSET_API_KEY` from env, falling back to `.env` files searched upward from cwd and `$HOME/.config/superset/superset.env`. Then we write the key file to `~/.config/superset/env` (0600). The agent's `execute` sandbox... does it see $HOME? Per-scope sandbox has its own FS. Hmm.

But honestly: for dev instance, is sandbox a docker container or local? Let me not spiral. Lean approach: supersetctl checks (1) env SUPERSET_API_KEY, (2) `~/.config/superset/env`, (3) `.env` in cwd/upward. Skill says: if `supersetctl auth-check` fails, ask the human to set the key (or read it from the file). Good enough for v1; user brings tokens into repo `.env` on the Mac, and dev sandbox likely shares filesystem (dev instances often execute locally). I'll note in SKILL.md fallback.

Enough recon. Now write the code. Files to create in `/Users/kgensupertramp/Desktop/own-your-intelligence`:

1. `.env.example` (+ `.env` with placeholders — but .env may contain real tokens later; add `.gitignore` with `.env`)
2. `.gitignore`
3. `package.json` — scripts: `smoke`, `supersetctl`
4. `bin/supersetctl.mjs` — wait, decided single location: layer dir `qm/sandbox/tools/supersetctl/supersetctl`. But running it as `node qm/sandbox/tools/supersetctl/supersetctl` from repo root is clunky; package.json bin entry can map: `"bin": {"supersetctl": "./qm/sandbox/tools/supersetctl/supersetctl"}`. And test/smoke uses it. OK — canonical file in layer (satisfies install.files beside tool.json), package.json exposes it.

tool.json fields (from contract): id, label, advertise?, hints?, egress, approvals?, install: {binary, files}. install.files: `{from, to, mode?}` — from is beside tool.json, to absolute `/usr/local/bin/supersetctl`, mode default 0755 under bin. install.binary: "supersetctl" must be present... "Must be present in the layer, declared under install.files, or installed by its Dockerfile" → declaring install.files to /usr/local/bin/supersetctl + install.binary "supersetctl" satisfies.

But: script has `#!/usr/bin/env node` shebang — if sandbox lacks node, it fails at exec. QM sandbox image likely has node? The agent computer... unknown. Hints can say: "supersetctl needs node; if `node` is missing, use curl with SUPERSET_MCP_URL". Keep.

egress: ["api.superset.sh"].

approvals: deny `supersetctl` dangerous ops? Our CLI has no destructive ops (no delete command exposed). Contract: raw approval patterns must start with `\b<binary>\b` — skip approvals entirely (optional). Simpler.

5. `qm/sandbox/skills/principal-engineer/SKILL.md`
6. `test/smoke.mjs`
7. `scripts/start-host.sh` (loads .env → GH_TOKEN → superset start --daemon && superset status)

Now write supersetctl carefully.

```js
#!/usr/bin/env node
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

function findEnvFile() {
  const candidates = [];
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) { candidates.push(join(dir, ".env")); const p = dirname(dir); if (p === dir) break; dir = p; }
  candidates.push(join(process.env.HOME ?? "", ".config/superset/env"));
  return candidates.find((p) => p && existsSync(p));
}

function loadEnv() {
  const file = findEnvFile();
  if (!file) return {};
  const out = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}

const ENV = { ...loadEnv(), ...process.env }; // careful: process.env values win? Actually explicit env should win over file? For SUPERSET_API_KEY, process env should win. But GH_TOKEN irrelevant here. OK.
```

Wait: `...process.env` after file → process.env wins. But if process.env has empty? fine.

MCP endpoint: `ENV.SUPERSET_MCP_URL || "https://api.superset.sh/mcp"`.

```js
let sessionId = null;
let seq = 0;

function mcpHeaders(extra = {}) {
  const h = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
    ...extra,
  };
  if (key) h.authorization = `Bearer ${key}`;
  if (sessionId) h["mcp-session-id"] = sessionId;
  return h;
}

async function post(payload, { notification = false } = {}) {
  const res = await fetch(ENDPOINT, { method: "POST", headers: mcpHeaders(), body: JSON.stringify(payload) });
  const sid = res.headers.get("mcp-session-id");
  if (sid) sessionId = sid;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MCP ${res.status}: ${text.slice(0, 500)}`);
  }
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("text/event-stream")) {
    const text = await res.text();
    for (const line of text.split("\n")) {
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try { const msg = JSON.parse(data); if (msg.id === undefined || msg.id === payload.id) return msg; } catch {}
    }
    return null;
  }
  if (res.status === 202 || res.headers.get("content-length") === "0") return null;
  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}
```

SSE messages might split across `data:` lines per JSON — standard SSE: multiple data lines join with \n. Handle by accumulating event blocks: split on blank lines, join data lines. I'll implement a small parser: iterate lines, buffer data lines until blank line, join with "\n", parse.

Also some servers return `event: message` + data. Fine.

rpc:
```js
async function rpc(method, params) {
  await ensureInit();
  const payload = { jsonrpc: "2.0", id: ++seq, method, params };
  const msg = await post(payload);
  if (!msg) throw new Error(`no response for ${method}`);
  if (msg.error) throw new Error(`${method}: ${msg.error.message ?? JSON.stringify(msg.error)}`);
  return msg.result;
}

let initialized = false;
async function ensureInit() {
  if (initialized) return;
  const msg = await post({ jsonrpc: "2.0", id: ++seq, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "supersetctl", version: "1.0.0" } } });
  if (msg?.error) throw new Error(...)
  initialized = true;
  await post({ jsonrpc: "2.0", method: "notifications/initialized" }).catch(() => {});
}
```

Careful: `seq` shared; initialize id... ok.

Statelessness: if server ignores session, fine.

Commands:

- `auth-check` → prints endpoint, key source (masked), runs tools/list quietly? Make `auth-check` = initialize + tools/list count. Hmm, tools/list may require auth. It's fine.
- `tools-list [--json]` → pretty print name + description + inputSchema properties.
- `call <tool> [json]` where json is inline JSON or `@path`. Prints `result` as JSON.
- `pages-publish --file <path> [--title t] [--visibility v] [--workspace-id id] [--entry-path p]` → tool `pages_publish`, args: { html, title, visibility, workspaceId, entryPath } — but what if schema names differ? Generic-call approach with best-guess names; agent can inspect tools-list. For smoke test I'll do `call pages_publish '{"html":"...","visibility":"everyone"}'`... same guessing. Alternative: build args dynamically from schema? Too clever.

Better idea: make `pages-publish` robust: fetch tools/list, find pages_publish schema, map our flag names to schema property names by known aliases:
```
html: html || content || document
title: title
visibility: visibility
workspaceId: workspace-identryPath: entry-path
```
And include only properties present in schema. That's ~15 lines and makes it resilient. Do same generic mechanism: `call` with `--flag value` pairs? Keep: `call <tool> --set k=v ...` plus raw JSON.

I'll implement: args = JSON if positional; then overlay `--set key=value` (value parsed as JSON if possible). And pages-publish uses alias-mapping against schema. Good balance.

Print: JSON.stringify(result, null, 2). For pages_publish result includes URL — extract and print URL alone? Print full JSON; smoke extracts.

Exit codes: nonzero on error. Usage on unknown cmd.

Also `hosts-list`, `projects-list`, `workspaces-list` → aliases: `call hosts_list {}` etc. And `workspaces-create --project X --name Y [--branch B]` → maps to workspaces_create schema with alias resolution (project/projectId, name, branch). And `agents-create --workspace X --prompt "..."` → agents_create (schema unknown: maybe `prompt` or `message`, `workspaceId`). Use alias map + schema filtering as above. Skill will tell agent to check `tools-list` if unsure.

Alias resolution helper:

```js
function buildArgs(schema, flags) {
  const props = schema?.properties ?? {};
  const used = new Set();
  const args = {};
  for (const [flag, raw] of Object.entries(flags)) {
    const key = resolveProp(props, flag); // exact, camelCase, snake_case
    if (!key) throw new Error(`unknown argument "${flag}"; available: ${Object.keys(props).join(", ")}`);
    args[key] = coerce(raw);
  }
  return args;
}
function resolveProp(props, name) {
  if (props[name]) return name;
  const camel = name.replace(/[-_]([a-z])/g, (_, c) => c.toUpperCase());
  if (props[camel]) return camel;
  const snake = camel.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());
  if (props[snake]) return snake;
  return null;
}
```
coerce: try JSON.parse, else string.

tools-list fetch: `rpc("tools/list", {})` → result.tools.

Commands parsing: simple manual arg loop.

Full CLI surface:

```
supersetctl tools-list
supersetctl call <tool> ['<json>']
supersetctl hosts-list | projects-list | workspaces-list [--flag v]
supersetctl workspaces-create --project <id> --name <n> [--branch <b>]
supersetctl agents-create --workspace <id> --prompt "<text>" [--agent <name>]
supersetctl pages-publish --file <path> [--title <t>] [--visibility <v>]
supersetctl pages-get ... skip
```

Keep it: tools-list, call, hosts-list, projects-list, workspaces-list, workspaces-create, agents-create, pages-publish, auth-check. Also maybe `status`/`wait` for workspace agent? Skill can poll `call workspaces_list`. Add `workspaces-get`? Not documented as tool (only list/create/update/delete). Poll via workspaces_list and agents_list. Fine.

Hmm — how does the agent learn PR link? The Superset workspace agent opens PR and reports in Superset; via MCP we can read... workspace status? Not documented. Skill: after launching, tell user the Superset workspace link, and PR appears in Superset (pull requests feature) / GitHub. Optionally use terminals_read to peek. Keep skill instructions: report workspace id/link immediately, then poll workspaces_list / use pages? Enough for v1: instruct agent to report the workspace URL and, if it has GitHub access (GH plugin/QM), to fetch the PR URL. Lean: report workspace link; human opens it.

Actually we can derive workspace URL? Unknown scheme (app deep link). MCP returns workspace id; superset.sh web URL maybe `https://superset.sh/w/<id>`? Don't guess. Report raw result.

GH_TOKEN: host script.

SKILL.md frontmatter: needs `name` and `description`. Content plan:

```md
---
name: principal-engineer
description: Render UI proposals or build code in a repository through Superset. Use when asked to design, mock up, render, implement, build, fix, or open a PR for a repository.
---

# Principal engineer (Superset bridge)

You coordinate work through Superset. Two modes, choose from the request:

## Setup check
`supersetctl auth-check` — if it fails, ask the human to put SUPERSET_API_KEY in .env (repo root) or ~/.config/superset/env. Never print the key.

## Mode 1: render (design proposal)
For UI/design requests where they want to SEE a change before building:
1. Write a single self-contained HTML file (inline CSS, no build step) into ./renders/<slug>.html
2. `supersetctl pages-publish --file renders/<slug>.html --title "<proposal>"`
3. Reply with the page URL from the result. Stop there — no code changes.

## Mode 2: build (ship it)
For "implement/build/fix ... in <repo>":
1. Discover: `supersetctl hosts-list`, `supersetctl projects-list`. If the repo has no project, tell the human which repo URL/where to add it. Do not create projects yourself.
2. `supersetctl workspaces-create --project <id> --name <slug> --branch <slug>`
3. `supersetctl agents-create --workspace <wid> --prompt "<complete spec...>"` — include acceptance criteria; if a render URL exists, include it.
4. Reply immediately with workspace id + raw result, then report back when the human asks (or poll `supersetctl call workspaces_list '{"...":"..."}'`).

## Guardrails
- Never merge PRs, never delete workspaces/pages, never run automations_* delete.
- Use `supersetctl tools-list` to confirm exact argument names before any `call`.
- Never echo secrets.

## Tips
- Exact schemas: `supersetctl tools-list`
- Generic escape hatch: `supersetctl call <tool> '<json>'`
```

Also unknown arg-name risk for workspaces-create flags: buildArgs throws with available props → agent recovers. Good.

test/smoke.mjs:
```js
// node test/smoke.mjs
import { spawnSync } from child_process...
```
Simpler: import functions? supersetctl is a script executing on load. Use spawnSync(node, [script, 'tools-list', '--json']) capture. Steps:
1. auth-check: if fails (missing key/network) → print SKIP and exit 0? Better exit 0 with skip (tokens come later). Actually failing loud is useful. Use exit code 0 + "SKIP: no SUPERSET_API_KEY" when key absent; if key present, assertions must pass.
2. tools-list --json → assert includes pages_publish, workspaces_create, agents_create, hosts_list, projects_list.
3. publish smoke page (visibility everyone) → extract url from result (find https? string) → fetch HEAD/GET assert 200.

Where do I get url from result? JSON.stringify result, regex `https?:\/\/[^\s"]+`. Then `fetch(url)` status 200..399.

Write result summary lines "ok: ...".

package.json:
```json
{
  "name": "own-your-intelligence",
  "private": true,
  "type": "module",
  "scripts": {
    "smoke": "node test/smoke.mjs",
    "supersetctl": "node qm/sandbox/tools/supersetctl/supersetctl"
  },
  "bin": { "supersetctl": "qm/sandbox/tools/supersetctl/supersetctl" }
}
```
Hmm `bin` with npm link not needed; scripts enough.

.start-host.sh:
```bash
#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# export GH_TOKEN and GITHUB_TOKEN from .env if present
if [[ -f "$root/.env" ]]; then set -a; source "$root/.env"; set +a; fi
export GITHUB_TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
export GH_TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
command -v superset ...
superset start --daemon
superset status
```
Sourcing .env with comments OK-ish (values with spaces quoted). Fine.

Also `superctl` needs `node` — .env.example documents.

.gitignore: `.env`, `renders/`, `node_modules/`.

Wait — renders/ HTML: keep? Agent writes mockups there; ignore them (proposed changes published to Pages). Add to .gitignore.

Let's also double-check tool.json parse rules: parseToolDescriptor in deployment-layer.ts — let me check required/allowed fields to avoid validation failure (egress format, install.files shape: `{from, to, mode}`? maybe `path`?). Check the schema quickly.

Now let me check the exact `tool.json` schema so the descriptor validates:

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"install\\|files\\|from\\|to\\|mode\\|egress\\|hints\\|advertise\\|approvals\\|label\\|id\\b\" ~/Desktop/qm/src/deployment/deployment-layer.ts | head -60; echo \"=== parse fn ===\"; sed -n 1,120p ~/Desktop/qm/src/deployment/deployment-layer.ts"
}
```

**Output:**
```
1:import { CREDENTIAL_PATH_RE, DISPLACED_DIR_REL, builtInCredentialPaths } from "../credentials/resident-paths.ts";
12:interface ToolAuthDescriptor {
30:  kind: "file" | "directory";
33:export interface ToolDescriptor {
34:  id: string;
35:  label?: string;
36:  advertise?: string;
37:  hints?: string[];
38:  egress?: string[];
39:  auth?: ToolAuthDescriptor;
40:  approvals?: ToolApproval[];
41:  install?: ToolInstall;
45:  from: string;
46:  to: string;
47:  mode: string;
52:  files?: ToolInstallFile[];
59:function installFileError(
63:  owner: { id: string; binary: string },
65:  const at = `${sourcePath}: "install.files[${index}]"`;
67:  const { from, to, mode } = file as Record<string, unknown>;
68:  if (typeof from !== "string" || !INSTALL_FROM_RE.test(from) || from === "tool.json")
69:    return `${at}.from must name a file beside tool.json (letters, digits, . _ -), not tool.json itself`;
70:  if (typeof to !== "string" || !INSTALL_TO_RE.test(to) || to.split("/").some((seg) => seg === ".." || seg === "."))
71:    return `${at}.to must be an absolute path under /usr/local/bin/ or /usr/local/lib/ with no dot segments`;
72:  if (to !== `/usr/local/bin/${owner.binary}` && !to.startsWith(`/usr/local/lib/${owner.id}/`))
73:    return `${at}.to must be /usr/local/bin/${owner.binary} or a path under /usr/local/lib/${owner.id}/ — a tool may only install its own binary and its own library directory`;
74:  if (mode !== undefined && (typeof mode !== "string" || !INSTALL_MODE_RE.test(mode)))
75:    return `${at}.mode must be a four-digit octal string like "0755"`;
79:function parseInstallFiles(raw: unknown, sourcePath: string, owner: { id: string; binary: string }): ToolInstallFile[] {
80:  if (!Array.isArray(raw)) throw new Error(`${sourcePath}: "install.files" must be an array`);
83:    const err = installFileError(file, sourcePath, index, owner);
85:    const { from, to, mode } = file as { from: string; to: string; mode?: string };
86:    if (out.some((other) => other.to === to))
87:      throw new Error(`${sourcePath}: "install.files" declares ${JSON.stringify(to)} twice`);
88:    out.push({ from, to, mode: mode ?? (to.startsWith("/usr/local/bin/") ? "0755" : "0644") });
97:export function credentialPathError(path: string, kind: "file" | "directory"): string | undefined {
114:    return `credential path ${JSON.stringify(path)} must start with a dotfile or dot-directory segment — non-hidden $HOME paths are durable agent data, not credentials`;
125:export function parseToolDescriptor(raw: string, sourcePath: string): ToolDescriptor {
130:    throw new Error(`${sourcePath} is not valid JSON: ${(err as Error).message}`, { cause: err });
136:  if (typeof d["id"] !== "string" || !d["id"].trim()) {
137:    throw new Error(`${sourcePath}: "id" is required and must be a non-empty string`);
139:  if (!TOOL_ID_RE.test(d["id"])) {
141:      `${sourcePath}: "id" must match ${TOOL_ID_RE.source} (lowercase alphanumerics and hyphens) — it is interpolated into shell probes`,
144:  const out: ToolDescriptor = { id: d["id"] };
146:  for (const key of ["label", "advertise"] as const) {
153:  if (d["hints"] !== undefined) {
154:    if (!Array.isArray(d["hints"]) || d["hints"].some((h) => typeof h !== "string")) {
155:      throw new Error(`${sourcePath}: "hints" must be an array of strings`);
157:    out.hints = d["hints"] as string[];
160:  if (d["egress"] !== undefined) {
161:    if (!Array.isArray(d["egress"]) || d["egress"].some((h) => typeof h !== "string")) {
162:      throw new Error(`${sourcePath}: "egress" must be an array of host strings`);
164:    out.egress = d["egress"] as string[];
168:  if (d["approvals"] !== undefined) out.approvals = parseApprovals(d["approvals"], sourcePath);
170:  if (d["install"] !== undefined) {
171:    const inst = d["install"];
173:      throw new Error(`${sourcePath}: "install" must be an object`);
177:      throw new Error(`${sourcePath}: "install.binary" must be a string`);
181:        `${sourcePath}: "install.binary" must match ${TOOL_ID_RE.source} (lowercase alphanumerics and hyphens) — it is interpolated into generated Dockerfile lines`,
184:    const files = (inst as Record<string, unknown>)["files"];
=== parse fn ===
import { CREDENTIAL_PATH_RE, DISPLACED_DIR_REL, builtInCredentialPaths } from "../credentials/resident-paths.ts";

export type ApprovalDecision = "require_approval" | "deny";

export interface ToolApproval {
  command?: string;
  pattern?: string;
  decision?: ApprovalDecision;
  reason?: string;
}

interface ToolAuthDescriptor {
  check: string;
  reauth: string;
  credentialPaths?: ToolCredentialPath[];
  splitEnv?: Record<string, string>;
  broker?: ToolCredentialBroker;
}

export interface ToolCredentialBroker {
  kind: "aws-role";
  roleArnEnv: string;
  regionEnv?: string;
  region?: string;
  sessionActions: string[];
}

export interface ToolCredentialPath {
  path: string;
  kind: "file" | "directory";
}

export interface ToolDescriptor {
  id: string;
  label?: string;
  advertise?: string;
  hints?: string[];
  egress?: string[];
  auth?: ToolAuthDescriptor;
  approvals?: ToolApproval[];
  install?: ToolInstall;
}

export interface ToolInstallFile {
  from: string;
  to: string;
  mode: string;
}

interface ToolInstall {
  binary?: string;
  files?: ToolInstallFile[];
}

const INSTALL_FROM_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const INSTALL_TO_RE = /^\/usr\/local\/(?:bin|lib)\/[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/;
const INSTALL_MODE_RE = /^0[0-7]{3}$/;

function installFileError(
  file: unknown,
  sourcePath: string,
  index: number,
  owner: { id: string; binary: string },
): string | undefined {
  const at = `${sourcePath}: "install.files[${index}]"`;
  if (typeof file !== "object" || file === null || Array.isArray(file)) return `${at} must be an object`;
  const { from, to, mode } = file as Record<string, unknown>;
  if (typeof from !== "string" || !INSTALL_FROM_RE.test(from) || from === "tool.json")
    return `${at}.from must name a file beside tool.json (letters, digits, . _ -), not tool.json itself`;
  if (typeof to !== "string" || !INSTALL_TO_RE.test(to) || to.split("/").some((seg) => seg === ".." || seg === "."))
    return `${at}.to must be an absolute path under /usr/local/bin/ or /usr/local/lib/ with no dot segments`;
  if (to !== `/usr/local/bin/${owner.binary}` && !to.startsWith(`/usr/local/lib/${owner.id}/`))
    return `${at}.to must be /usr/local/bin/${owner.binary} or a path under /usr/local/lib/${owner.id}/ — a tool may only install its own binary and its own library directory`;
  if (mode !== undefined && (typeof mode !== "string" || !INSTALL_MODE_RE.test(mode)))
    return `${at}.mode must be a four-digit octal string like "0755"`;
  return undefined;
}

function parseInstallFiles(raw: unknown, sourcePath: string, owner: { id: string; binary: string }): ToolInstallFile[] {
  if (!Array.isArray(raw)) throw new Error(`${sourcePath}: "install.files" must be an array`);
  const out: ToolInstallFile[] = [];
  for (const [index, file] of raw.entries()) {
    const err = installFileError(file, sourcePath, index, owner);
    if (err) throw new Error(err);
    const { from, to, mode } = file as { from: string; to: string; mode?: string };
    if (out.some((other) => other.to === to))
      throw new Error(`${sourcePath}: "install.files" declares ${JSON.stringify(to)} twice`);
    out.push({ from, to, mode: mode ?? (to.startsWith("/usr/local/bin/") ? "0755" : "0644") });
  }
  return out;
}

const BUILT_IN_CREDENTIAL_PATHS: readonly ToolCredentialPath[] = builtInCredentialPaths();

const nested = (a: string, b: string): boolean => a.startsWith(`${b}/`);

export function credentialPathError(path: string, kind: "file" | "directory"): string | undefined {
  const segments = path.split("/");
  if (
    !path ||
    path.startsWith("/") ||
    path.startsWith("~") ||
    path.includes("\\") ||
    /\s/.test(path) ||
    segments.includes("..") ||
    segments.includes(".") ||
    segments.includes("")
  ) {
    return `credential path ${JSON.stringify(path)} must be a $HOME-relative path with no traversal`;
  }
  if (segments[0] === DISPLACED_DIR_REL)
    return `credential path ${JSON.stringify(path)} is reserved — ${DISPLACED_DIR_REL} is where provision quarantines displaced $HOME state, and linking it would make it its own displacement target`;
  if (!segments[0]!.startsWith("."))
    return `credential path ${JSON.stringify(path)} must start with a dotfile or dot-directory segment — non-hidden $HOME paths are durable agent data, not credentials`;
  if (!CREDENTIAL_PATH_RE.test(path))
    return `credential path ${JSON.stringify(path)} may only use letters, digits, and ._/@+- — other characters cannot ride the capture sweep`;
  const builtIn = BUILT_IN_CREDENTIAL_PATHS.find(
    (base) => path === base.path || nested(path, base.path) || nested(base.path, path),
  );
  if (builtIn && (path !== builtIn.path || kind !== builtIn.kind))

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 54.3s)

_Thinking:_

Schema confirmed. Note: `install.files[].from` must be a plain filename beside tool.json (e.g. `supersetctl`), `to` must be `/usr/local/bin/<owner.binary>` exactly (if to starts with /usr/local/bin/ it must be `/usr/local/bin/${owner.binary}`).

Also check skills frontmatter requirements (name, description) — deployment-layer-store parseSeedSkill. Quick check not strictly needed; deploy-directory docs said "Skills require name and description frontmatter."

Also verify approvals pattern rules if I include approvals — I'll skip approvals.

One more: does layer `hints`/`advertise` matter? advertise = installed-CLI list string; use `advertise: "supersetctl"`. Wait, advertise semantics: "Added to the agent computer's installed-CLI list" — a string. Check type: `for (const key of ["label", "advertise"] as const)` — string validation. OK.

Now write everything. Also check skill store frontmatter parse to match expected fields (name/description/id?). Let me peek parseSeedSkill quickly... it's in skills/seed.ts. Just follow docs: name + description frontmatter required.

Also decide directory naming in repo:

```
own-your-intelligence/
├── .env.example
├── .gitignore
├── package.json
├── scripts/start-host.sh
├── test/smoke.mjs
└── qm/sandbox/ ← point DEPLOYMENT_LAYER here
    ├── skills/principal-engineer/SKILL.md
    └── tools/supersetctl/{tool.json,supersetctl}
```

Write the code now. Start with supersetctl (biggest file).

Key details for supersetctl:

- No external deps, Node ≥18 (global fetch).
- Env resolution order for SUPERSET_API_KEY: process.env → .env (cwd upward, up to 8 levels) → ~/.config/superset/env. Note: earlier I said file then process; decide: process.env wins only if non-empty. Actually load file first, then overlay process.env — but `...process.env` includes tons of vars, harmless.
- Masked key in auth-check: show first 8 chars + "…".

Command implementations... let me write it.

```js
#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const USAGE = `supersetctl — drive the Superset MCP API

Usage:
  supersetctl auth-check
  supersetctl tools-list [--json]
  supersetctl call <tool> ['<json-args>']
  supersetctl hosts-list
  supersetctl projects-list
  supersetctl workspaces-list [--set k=v ...]
  supersetctl workspaces-create --set k=v ...
  supersetctl agents-create --set k=v ...
  supersetctl pages-publish --file <path> [--set k=v ...]

Flags for helpers:
  --file <path>          read argument value from a file (pages-publish: html)
  --set <key>=<value>    add an argument (value parsed as JSON when valid)
  --json                 machine-readable output (tools-list)

Env: SUPERSET_API_KEY (or .env / ~/.config/superset/env), SUPERSET_MCP_URL
`;
```

Hmm — for convenience of skill, workspaces-create with generic `--set projectId=x --set name=y`? Then aliases don't add much... but they help: resolveProp handles camel/snake. I'll keep generic `--set` for create commands, plus pages-publish --file alias for html. And add friendly flags for workspaces-create: `--project`, `--name`, `--branch` mapped through same resolveProp (projectId/project/branch...). resolveProp tries exact key, camel, snake. For `--project` → props may have "projectId" — exact/camel won't match "project"→"projectId". Add alias table per command:

```js
const FLAG_ALIASES = {
  workspaces_create: { project: ["projectId", "project"], name: ["name"], branch: ["branch", "baseBranch"] },
  agents_create: { workspace: ["workspaceId"], prompt: ["prompt", "message", "text", "input"], agent: ["agent", "agentId", "agentName"], model: ["model"] },
  pages_publish: { file: ["html"], title: ["title"], visibility: ["visibility"], workspace: ["workspaceId"], "entry-path": ["entryPath"] },
};
```
resolve: alias list → find first prop present in schema; else error listing available.

agents_create schema: "Create (launch) an agent session with optional per-launch model and effort overrides" — prompt param name unknown; alias list covers likely candidates but if none present, error tells agent available props (it can pass the prompt wherever schema says — e.g. maybe launch accepts `prompt`). The error message includes available property names → agent adapts. Also `call` generic escape hatch. Good.

Actually risk: if schema has BOTH `prompt` and `message`, we pick first alias — could pick wrong-but-present. Fine for v1.

pages_publish: html might be schema prop "html". alias file→html. Also allow `--html-file`. I'll do: pages-publish requires --file; args { html: contents } filtered to schema props (only include keys in schema).

Filtering: include key only if in schema (if schema exists). If schema missing, include all.

Output: pretty JSON result. For pages_publish also print extracted URL on stderr? Keep stdout pure JSON for scripting; smoke parses JSON.

tools-list --json prints {name, description, properties} array or raw tools.

auth-check: ensureInit + tools/list; print "ok: <n> tools, key=sk_live_ab…". If no key → error exit 1 with guidance.

SSE parse: accumulate events:

```js
function parseSse(text, wantId) {
  const events = [];
  let dataLines = [];
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith("data:")) { dataLines.push(line.slice(5).replace(/^ /, "")); continue; }
    if (line === "" && dataLines.length) { events.push(dataLines.join("\n")); dataLines = []; }
  }
  if (dataLines.length) events.push(dataLines.join("\n"));
  const msgs = [];
  for (const raw of events) { try { msgs.push(JSON.parse(raw)); } catch {} }
  if (wantId !== undefined) { const hit = msgs.find(m => m && m.id === wantId); if (hit) return hit; }
  return msgs.find(m => m && (m.result !== undefined || m.error !== undefined)) ?? msgs[msgs.length -1] ?? null;
}
```

Also handle `res.headers.get("content-length")===0` / 202 for notifications.

Timeouts: AbortSignal.timeout(60000) on fetch.

Error surface: JSON-RPC error → throw with message + code; catch in main → stderr + exit 1.

Now SKILL.md. Required frontmatter name/description. Name must match dir id? skill id likely from frontmatter name or dir. Keep both `principal-engineer`.

Content — lean, precise:

```md
---
name: principal-engineer
description: Design or ship changes in a code repository through Superset. Use when asked to render/propose a UI or design, or to implement/build/fix something and open a pull request.
---

# Principal engineer (Superset)

You are the single engineering agent. Every action goes through the Superset API via `supersetctl`. Choose a mode from the request:

- **render** — they want to *see* a design before any code changes- **build** — they want working code and a pull request

## 0. Check access`supersetctl auth-check`

If it fails, ask the human to put `SUPERSET_API_KEY=` in the project `.env` or `~/.config/superset/env`. Never print or echo the key.

## render mode

1. Write one self-contained HTML file (inline CSS, no external assets, no JS frameworks) to `renders/<slug>.html`.
2. Publish it: `supersetctl pages-publish --file renders/<slug>.html --title "<short proposal>"`
3. Reply with the page URL from the JSON result and a one-line summary of what changed. Stop. Do not modify the repository.

## build mode

1. Find the target: `supersetctl hosts-list`, then `supersetctl projects-list`. If the repository has no project, reply with the exact repo URL the human should add and stop.
2. Create a workspace: `supersetctl workspaces-create --project <projectId> --name <slug> --branch <slug>`
3. Launch the coding agent: `supersetctl agents-create --workspace <workspaceId> --prompt "<spec>"`. The spec must contain: goal, files/areas, acceptance criteria, and the render URL if one exists. It must say: open a PR against the default branch; never merge.
4. Reply immediately with the workspace id and the raw result JSON. When the human asks for status later, poll `supersetctl call workspaces_list '{}'` (and `agents_list`) — do not loop forever.

## Rules

- Confirm `supersetctl tools-list` before using unfamiliar arguments; `call` takes raw JSON when you know the schema.
- Never merge PRs. Never run any `*_delete` tool. Never touch automations.
- Two modes are exclusive per request: render proposes, build ships.
- Never print secrets; never commit `.env`.

## Escaping

- Full schema: `supersetctl tools-list`
- Raw call: `supersetctl call <tool> '<json>'`
```

Note: `--branch` for workspaces_create — from CLI docs branch flag exists; resolveProp will map if schema has `branch`. If schema lacks it, error lists props — agent adapts.

Wait: is `renders/` writable where agent runs? dev sandbox cwd unknown. Skill: "write to renders/ under the current project directory" — fine.

Also add `wr` — no, keep.

smoke test details (test/smoke.mjs):

```js
import { spawnSync } from "node:node:child_process";
import { existsSync, readFileSync } from "node:fs";

const root = ...dirname(import.meta.url)/..
const ctl = join(root, "qm/sandbox/tools/supersetctl/supersetctl");

function run(args) { return spawnSync(process.execPath, [ctl, ...args], { cwd: root, encoding: "utf8", timeout: 60000 }); }

function hasKey() { check .env SUPERSET_API_KEY= or process.env }

if (!hasKey()) { console.log("SKIP: no SUPERSET_API_KEY (add it to .env)"); process.exit(0); }

const auth = run(["auth-check"]); assert status 0
const tl = run(["tools-list","--json"]); parse; required tools present
publish:
const html = `<!doctype html>...smoke page...`;
write to test/.smoke.html? or temp: use renders/ dir? write to `test/tmp-smoke.html` then delete after.
run(["pages-publish","--file", tmp, "--title","supersetctl smoke","--set","visibility=everyone"]) — hmm visibility via --set works (resolveProp exact). Or dedicated flag. Use --set.
extract url, fetch → status 2xx.
console.log("ok ...")
```

Cleanup tmp file.

Also smoke prints the final page URL: "verification URL: https://..." — that's the "use the superset url as testing" the user mentioned.

package.json — no deps. Add `"engines": {"node": ">=18"}`.

.env.example:
```
# Superset MCP API key — Superset app → Settings → API Keys (sk_live_…)
SUPERSET_API_KEY=
# Superset MCP endpoint (default https://api.superset.sh/mcp)
SUPERSET_MCP_URL=https://api.superset.sh/mcp
# GitHub token used by the Superset host to open PRs (fine-grained PAT)
GH_TOKEN=
```

.gitignore: `.env`, `node_modules/`, `renders/`, `test/tmp-*`.

start-host.sh: source .env, export GH_TOKEN → also GITHUB_TOKEN for gh compat, run superset start --daemon + status. Must check `superset` on PATH (macOS shim ~/.superset/bin/superset). Add fallback PATH append.

README? Not asked. SKILL.md covers usage; maybe a short `RUNBOOK`? User said lean/no docs unless asked. The skill + .env.example are self-documenting. Skip README.

Wait — one integration gap: how does their QM dev instance get DEPLOYMENT_LAYER set? Their dev config: ~/.config/qm/dev.env (MODEL_PROVIDER etc.) — that's probably consumed by a launcher. Where? Maybe scripts/dev/cli.ts reads ~/.config/qm/dev.env. Quick grep to confirm, so I can tell them exactly how to enable the layer (one line). Let me check scripts/dev/cli.ts for dev.env handling.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rn \"dev.env\\|config/qm\\|DEPLOYMENT_LAYER\" ~/Desktop/qm/scripts/dev/*.ts ~/Desktop/qm/scripts/dev-instance.sh 2>/dev/null | head -20; echo \"---\"; ls ~/Desktop/qm/scripts/dev 2>/dev/null; echo \"--- seedSkills ---\"; grep -rn \"seedSkills\" ~/Desktop/qm/src/config.ts | head -5"
}
```

**Output:**
```
---
cli.ts
commands
lib
supervisor
test-helpers
twin-instance.ts
twin-multiws-check.ts
twin-multiws-run.sh
twin-pump.ts
--- seedSkills ---
/Users/kgensupertramp/Desktop/qm/src/config.ts:148:  seedSkills: boolean;
/Users/kgensupertramp/Desktop/qm/src/config.ts:1592:    seedSkills: boolEnvStrict("SEED_SKILLS", env.SEED_SKILLS) ?? true,

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 6.8s)

_Thinking:_

No direct hit for dev.env in scripts/dev. Where does ~/.config/qm/dev.env come from? Maybe their own launcher, or the `qm` "dev" CLI. Search wider: grep -rn "config/qm" in qm repo.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rn \"\\.config/qm\\|dev\\.env\" ~/Desktop/qm/scripts ~/Desktop/qm/src ~/Desktop/qm/cli 2>/dev/null | grep -v node_modules | head -15; echo \"--- env loading in dev cli ---\"; grep -rn \"dotenv\\|loadEnv\\|\\.env\" ~/Desktop/qm/scripts/dev/lib/*.ts 2>/dev/null | head -15"
}
```

**Output:**
```
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/pool.ts:19:  return join(QM_CONFIG_DIR, "dev.env");
--- env loading in dev cli ---
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/deps.ts:33:      env: { ...process.env, WEB_UI_BASE: opts.webUiBasePath },
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:65:  const mainEnv = join(mainRoot, ".env");
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:67:  const wtEnvPath = join(worktree, ".env");
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:78:    log(`seeded ${added.length} env key(s) for auth from the main checkout's .env: ${added.join(" ")}`);
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:83:  const shell = process.env.SHELL && existsSync(process.env.SHELL) ? process.env.SHELL : "/bin/zsh";
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:105:  const wtEnv = readEnvFile(join(opts.worktree, ".env"));
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:120:    anthropicKeySource = "the worktree .env";
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:127:    openaiKeySource = "the worktree .env";
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:132:  const codexAuthCandidate = codexAuthFileForEnv({ ...env, ...opts.callerEnv }, true);
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/envctx.ts:178:  for (const [k, v] of Object.entries(process.env)) {
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/lease.ts:191:const RECLAIM_AFTER_SEC = Number(process.env.DEV_INSTANCE_RECLAIM_AFTER_SECONDS || 14_400);
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/lease.ts:194:  if (process.env.DEV_INSTANCE_RECLAIM_STALE === "0") return null;
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/orphans.ts:47:    const match = readFileSync(`${cwd}/.env`, "utf8").match(/^SLACK_APP_TOKEN=(.+)$/m);
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/pool.ts:7:const CONFIG_HOME = process.env.XDG_CONFIG_HOME || join(homedir(), ".config");
/Users/kgensupertramp/Desktop/qm/scripts/dev/lib/pool.ts:11:  if (process.env.QM_POOL_STORE) return process.env.QM_POOL_STORE;

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 26.6s)

_Thinking:_

So `~/.config/qm/dev.env` is the "dev pool" env store for their slack-pool (pool1.env) — used by scripts/dev for dev instances (MODEL_PROVIDER, keys, ORG_ID, HARNESS + slack pool tokens). The dev instance env comes from the QM checkout's `.env` plus worktree `.env` (envctx.ts).

Key question: does dev instance pass DEPLOYMENT_LAYER? envctx merges env; DEPLOYMENT_LAYER would just be an env var present in shell when launching `npm run dev-instance` — likely forwarded (config.ts reads env.DEPLOYMENT_LAYER). So instructions: add `DEPLOYMENT_LAYER=/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox` to the QM checkout `.env` (~/Desktop/qm/.env) or export before `npm run dev-instance`.

Also `seedSkills` default true → layer skills get seeded. 

Also SUPERSET_API_KEY for the agent: dev core env → does sandbox get env? `sandbox.env`/secretEnv are deployment-config things; in dev, sandbox execution... For skill use, agent runs `supersetctl` via execute in its sandbox computer. If sandbox is a container without the key, agent can't auth. Our supersetctl also checks ~/.config/superset/env and cwd .env — inside sandbox those likely don't exist.

Hmm. How do dev-instance sandboxes work? Might be "local" backend executing on host with host FS? Unknown without deeper reading. I'll handle it pragmatically: skill's fallback = "if auth-check fails, ask the human to paste the key" — ugly (key in chat). Better fallback: `SUPERSET_API_KEY` set via layer hints? 

Actually — wait. There's a cleaner QM-native route for secrets into sandbox: `sandbox.secretEnv` is config-file only (deployment), but for dev... too deep. Alternative: QM credential/connector system (tool auth.credentialPaths) — file-based: declare `auth.credentialPaths: [{path: ".config/superset/env", kind: "file"}]` → resident capture links host file into sandbox! From deploy-directory docs: credentialPaths drives "resident capture, ephemeral linking" — the file on the operator's machine gets linked into scopes. That's exactly the QM-blessed way to give the agent the key file.

Path must start with dot segment: `.config/superset/env` ✓. So:
- tool.json gains:
```json
"auth": {
  "check": "test -f ~/.config/superset/env",
  "reauth": "...?" 
}
```
Hmm auth.check/reauth semantics: "Merged into the resident-login connector registry" — commands run to check/reauth. For a static file, check = `test -s ~/.config/superset/env`? reauth = echo instructions? Making up commands that run in sandbox... The check likely runs on host. Risky to guess.

Simpler: skip auth block; skill fallback: if auth-check fails, instruct agent that the key file lives at `~/.config/superset/env` on the host — sandbox may not see it. 

Honest v1: Make supersetctl ALSO accept key from `~/.config/superset/env` and from env; and include in tool.json `hints` telling the model where the key comes from. If sandbox lacks it, auth-check fails, agent asks human → human re-runs with proper wiring. Document in SKILL.md: "the key must be present in the environment where supersetctl runs (sandbox env or file)". 

Actually, one more solid option: `tool.json` `auth.credentialPaths` WITHOUT auth.check? Schema: auth is `{check, reauth, credentialPaths?}` — credentialPaths nested in auth, requires check/reauth. Let me verify parseToolDescriptor's auth parsing... earlier snippet: `ToolAuthDescriptor { check: string; reauth: string; credentialPaths?... }`. So need commands. 

What do existing QM tool examples use for check/reauth? Look at qm repo for an example tool.json with auth (skills-seed or deploy templates). Let me grep for `"reauth"` in qm repo.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rln \"reauth\" ~/Desktop/qm --include=tool.json 2>/dev/null | head -5; echo \"--- any tool.json examples ---\"; find ~/Desktop/qm -name \"tool.json\" -not -path \"*/node_modules/*\" | head -10; echo \"--- credentialPaths usage docs ---\"; grep -rn \"credentialPaths\" ~/Desktop/qm/docs/*.md | head -8"
}
```

**Output:**
```
--- any tool.json examples ---
--- credentialPaths usage docs ---
/Users/kgensupertramp/Desktop/qm/docs/deploy-directory.md:87:| `auth.credentialPaths`      | One `$HOME`-relative set of `{ path, kind }` entries drives resident capture, ephemeral linking, and device-flow persistence. Each entry explicitly declares `file` or `directory`; absolute paths and traversal are rejected, and `.ssh` warns.                                                                               |
/Users/kgensupertramp/Desktop/qm/docs/deploy-directory.md:95:Deployment-specific safety belongs here too. For example, an ambiently authenticated CLI declares a deny `approvals` rule for its login command, a `hints` entry telling the model not to log in, and its `auth.credentialPaths`; generic core carries no vendor-specific command exception or credential path.

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 10.5s)

_Thinking:_

No examples in repo. Keep v1 simple: no auth block. supersetctl resolves key from env/file; skill documents fallback. If sandbox doesn't have the key, we'll wire it later (dev instance may share host FS — plausibly the dev sandbox is a local/ephemeral box with home mounted; can't know now).

Time to write files. Plan the todos and create.

Files:
1. `.gitignore`
2. `.env.example`
3. `package.json`
4. `qm/sandbox/tools/supersetctl/tool.json`
5. `qm/sandbox/tools/supersetctl/supersetctl` (the big one)
6. `qm/sandbox/skills/principal-engineer/SKILL.md`
7. `test/smoke.mjs`
8. `scripts/start-host.sh`

Then verify: run `node .../supersetctl tools-list` — will fail without key (skip), run `--help`, run smoke (expect SKIP), syntax check via node --check. Also validate tool.json against QM's parser if feasible: run a quick node script importing parseToolDescriptor from ~/Desktop/qm? It's TS with .ts imports (node 20 can't strip types unless --experimental-strip-types; node 20.19 doesn't have it... node 22+ does. Their qm .node-version says? earlier `.node-version` file exists — probably 24). Could use `node --experimental-strip-types`? If qm requires node 24, maybe nvm has other versions. Let's check `cat ~/Desktop/qm/.node-version` and available nvm versions later during verification. If node 24 available, run a tiny validation script importing the parser.

Write code now. Start todos.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Write supersetctl MCP client (qm/sandbox/tools/supersetctl/)",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Write tool.json descriptor for QM deployment layer",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Write principal-engineer SKILL.md (render + build modes)",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Add .env.example, .gitignore, package.json, start-host.sh",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Write test/smoke.mjs (MCP smoke + Pages URL verification)",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Verify: syntax checks, tool.json against QM parser, smoke skip path",
      "status": "pending",
      "priority": "medium"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Write supersetctl MCP client (qm/sandbox/tools/supersetctl/)",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Write tool.json descriptor for QM deployment layer",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Write principal-engineer SKILL.md (render + build modes)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Add .env.example, .gitignore, package.json, start-host.sh",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Write test/smoke.mjs (MCP smoke + Pages URL verification)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Verify: syntax checks, tool.json against QM parser, smoke skip path",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 26.3s)

_Thinking:_

Write supersetctl first.

**Tool: write**

**Input:**
```json
{
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/tools/supersetctl/supersetctl",
  "content": "#!/usr/bin/env node\nimport { existsSync, readFileSync } from \"node:fs\";\nimport { homedir } from \"node:os\";\nimport { dirname, join } from \"node:path\";\n\nconst USAGE = `supersetctl — drive the Superset MCP API\n\nUsage:\n  supersetctl auth-check\n  supersetctl tools-list [--json]\n  supersetctl call <tool> ['<json-args>']\n  supersetctl hosts-list\n  supersetctl projects-list\n  supersetctl workspaces-list [--set key=value ...]\n  supersetctl workspaces-create [--set key=value ...] [--project id] [--name n] [--branch b]\n  supersetctl agents-create --workspace <id> --prompt \"<spec>\" [--model m]\n  supersetctl pages-publish --file <path> [--title t] [--visibility v] [--set key=value ...]\n\nFlags:\n  --set key=value   add one tool argument (value parsed as JSON when valid)\n  --file path       read a string argument value from a file\n  --json            machine-readable output (tools-list)\n\nEnvironment:\n  SUPERSET_API_KEY   API key from Superset -> Settings -> API Keys (sk_live_...)\n                     also read from .env (searched upward from cwd) or ~/.config/superset/env\n  SUPERSET_MCP_URL   MCP endpoint (default https://api.superset.sh/mcp)\n`;\n\nconst FLAG_ALIASES = {\n  workspaces_create: {\n    project: [\"projectId\", \"project\"],\n    name: [\"name\"],\n    branch: [\"branch\", \"baseBranch\"],\n    local: [\"local\"],\n  },\n  agents_create: {\n    workspace: [\"workspaceId\", \"workspace\"],\n    prompt: [\"prompt\", \"message\", \"text\", \"input\", \"instructions\"],\n    agent: [\"agent\", \"agentId\", \"agentName\"],\n    model: [\"model\"],\n    effort: [\"effort\"],\n  },\n  pages_publish: {\n    file: [\"html\", \"content\", \"document\"],\n    title: [\"title\", \"name\"],\n    visibility: [\"visibility\"],\n    workspace: [\"workspaceId\"],\n    \"entry-path\": [\"entryPath\"],\n  },\n};\n\nfunction parseEnvFile(file) {\n  const out = {};\n  if (!file || !existsSync(file)) return out;\n  for (const line of readFileSync(file, \"utf8\").split(\"\\n\")) {\n    const m = line.match(/^\\s*([A-Za-z_][A-Za-z0-9_]*)\\s*=\\s*(.*)\\s*$/);\n    if (!m) continue;\n    let value = m[2];\n    if (\n      (value.startsWith('\"') && value.endsWith('\"') && value.length > 1) ||\n      (value.startsWith(\"'\") && value.endsWith(\"'\") && value.length > 1)\n    ) {\n      value = value.slice(1, -1);\n    }\n    out[m[1]] = value;\n  }\n  return out;\n}\n\nfunction findDotEnv() {\n  let dir = process.cwd();\n  for (let i = 0; i < 10; i++) {\n    const candidate = join(dir, \".env\");\n    if (existsSync(candidate)) return candidate;\n    const parent = dirname(dir);\n    if (parent === dir) break;\n    dir = parent;\n  }\n  const homeFile = join(homedir(), \".config\", \"superset\", \"env\");\n  return existsSync(homeFile) ? homeFile : null;\n}\n\nconst env = { ...parseEnvFile(findDotEnv()), ...process.env };\nconst ENDPOINT = env.SUPERSET_MCP_URL || \"https://api.superset.sh/mcp\";\nconst API_KEY = (env.SUPERSET_API_KEY || \"\").trim();\n\nlet sessionId = null;\nlet initialized = false;\nlet seq = 0;\n\nfunction mcpHeaders() {\n  const headers = {\n    \"content-type\": \"application/json\",\n    accept: \"application/json, text/event-stream\",\n  };\n  if (API_KEY) headers.authorization = `Bearer ${API_KEY}`;\n  if (sessionId) headers[\"mcp-session-id\"] = sessionId;\n  return headers;\n}\n\nfunction parseSse(text, wantId) {\n  const events = [];\n  let dataLines = [];\n  for (const line of text.split(/\\r?\\n/)) {\n    if (line.startsWith(\"data:\")) {\n      dataLines.push(line.slice(5).replace(/^ /, \"\"));\n      continue;\n    }\n    if (line === \"\" && dataLines.length) {\n      events.push(dataLines.join(\"\\n\"));\n      dataLines = [];\n    }\n  }\n  if (dataLines.length) events.push(dataLines.join(\"\\n\"));\n  const messages = [];\n  for (const raw of events) {\n    try {\n      messages.push(JSON.parse(raw));\n    } catch {\n      // keep only parseable frames\n    }\n  }\n  if (wantId !== undefined) {\n    const hit = messages.find((m) => m && m.id === wantId);\n    if (hit) return hit;\n  }\n  return messages.find((m) => m && (m.result !== undefined || m.error !== undefined)) ?? null;\n}\n\nasync function post(payload) {\n  const res = await fetch(ENDPOINT, {\n    method: \"POST\",\n    headers: mcpHeaders(),\n    body: JSON.stringify(payload),\n    signal: AbortSignal.timeout(120_000),\n  });\n  const sid = res.headers.get(\"mcp-session-id\");\n  if (sid) sessionId = sid;\n  const contentType = res.headers.get(\"content-type\") || \"\";\n  if (contentType.includes(\"text/event-stream\")) {\n    return parseSse(await res.text(), payload.id);\n  }\n  const text = await res.text();\n  if (!res.ok) throw new Error(`MCP ${res.status}: ${text.slice(0, 600)}`);\n  if (!text) return null;\n  try {\n    return JSON.parse(text);\n  } catch {\n    return parseSse(text, payload.id);\n  }\n}\n\nasync function ensureInit() {\n  if (initialized) return;\n  if (!API_KEY) {\n    throw new Error(\n      \"SUPERSET_API_KEY is not set — add it to .env (repo root) or ~/.config/superset/env (Superset app -> Settings -> API Keys)\",\n    );\n  }\n  const msg = await post({\n    jsonrpc: \"2.0\",\n    id: ++seq,\n    method: \"initialize\",\n    params: {\n      protocolVersion: \"2025-06-18\",\n      capabilities: {},\n      clientInfo: { name: \"supersetctl\", version: \"1.0.0\" },\n    },\n  });\n  if (!msg) throw new Error(`no response from ${ENDPOINT}`);\n  if (msg.error) throw new Error(`initialize failed: ${msg.error.message || JSON.stringify(msg.error)}`);\n  initialized = true;\n  await post({ jsonrpc: \"2.0\", method: \"notifications/initialized\" }).catch(() => {});\n}\n\nasync function rpc(method, params) {\n  await ensureInit();\n  const msg = await post({ jsonrpc: \"2.0\", id: ++seq, method, params });\n  if (!msg) throw new Error(`no response for ${method}`);\n  if (msg.error) {\n    const detail = msg.error.data ? `: ${JSON.stringify(msg.error.data)}` : \"\";\n    throw new Error(`${method} failed: ${msg.error.message || JSON.stringify(msg.error)}${detail}`);\n  }\n  return msg.result;\n}\n\nasync function listTools() {\n  const result = await rpc(\"tools/list\", {});\n  return result.tools || [];\n}\n\nfunction coerce(raw) {\n  try {\n    return JSON.parse(raw);\n  } catch {\n    return raw;\n  }\n}\n\nfunction resolveProp(props, tool, flag) {\n  const candidates = FLAG_ALIASES[tool]?.[flag] || [flag];\n  for (const name of candidates) {\n    if (props[name] !== undefined) return name;\n    const camel = name.replace(/[-_]([a-z0-9])/g, (_, c) => c.toUpperCase());\n    if (props[camel] !== undefined) return camel;\n    const snake = camel.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);\n    if (props[snake] !== undefined) return snake;\n  }\n  return null;\n}\n\nfunction buildArgs(tool, schema, flags) {\n  const props = (schema && schema.properties) || {};\n  const args = {};\n  for (const [flag, raw] of Object.entries(flags)) {\n    const key = resolveProp(props, tool, flag);\n    if (!key) {\n      const available = Object.keys(props).join(\", \") || \"unknown (schema not published)\";\n      throw new Error(`unknown argument \"${flag}\" for ${tool} — available: ${available}`);\n    }\n    if (schema && props[key] === undefined) continue;\n    args[key] = coerce(raw);\n  }\n  return args;\n}\n\nfunction parseFlags(argv) {\n  const positional = [];\n  const flags = {};\n  for (let i = 0; i < argv.length; i++) {\n    const arg = argv[i];\n    if (arg === \"--json\" || arg === \"--local\") {\n      flags[arg.slice(2)] = true;\n      continue;\n    }\n    if (arg.startsWith(\"--\")) {\n      const key = arg.slice(2);\n      const value = argv[i + 1];\n      if (value === undefined) throw new Error(`flag --${key} needs a value`);\n      flags[key] = value;\n      i++;\n      continue;\n    }\n    positional.push(arg);\n  }\n  return { positional, flags };\n}\n\nasync function callTool(tool, args) {\n  const result = await rpc(\"tools/call\", { name: tool, arguments: args });\n  if (result && Array.isArray(result.content)) {\n    const texts = result.content\n      .filter((c) => c && c.type === \"text\")\n      .map((c) => c.text)\n      .join(\"\\n\");\n    if (texts) {\n      try {\n        return JSON.parse(texts);\n      } catch {\n        return texts;\n      }\n    }\n  }\n  return result;\n}\n\nfunction print(value) {\n  process.stdout.write(`${typeof value === \"string\" ? value : JSON.stringify(value, null, 2)}\\n`);\n}\n\nasync function main() {\n  const argv = process.argv.slice(2);\n  const command = argv[0];\n  if (!command || command === \"--help\" || command === \"-h\" || command === \"help\") {\n    process.stdout.write(USAGE);\n    return;\n  }\n  const { positional, flags } = parseFlags(argv.slice(1));\n\n  if (command === \"auth-check\") {\n    const tools = await listTools();\n    const masked = API_KEY ? `${API_KEY.slice(0, 10)}… (${API_KEY.length} chars)` : \"missing\";\n    print({ ok: true, endpoint: ENDPOINT, key: masked, tools: tools.length });\n    return;\n  }\n\n  if (command === \"tools-list\") {\n    const tools = await listTools();\n    if (flags.json) {\n      print(tools);\n      return;\n    }\n    for (const tool of tools) {\n      const props = Object.keys((tool.inputSchema && tool.inputSchema.properties) || {});\n      print(`${tool.name}${props.length ? `  (${props.join(\", \")})` : \"\"}`);\n      if (tool.description) print(`    ${tool.description}`);\n    }\n    return;\n  }\n\n  if (command === \"call\") {\n    const tool = positional[0];\n    if (!tool) throw new Error(\"usage: supersetctl call <tool> '<json-args>'\");\n    let args = {};\n    if (positional[1]) args = coerce(positional[1]);\n    if (typeof args !== \"object\" || args === null || Array.isArray(args)) {\n      throw new Error(\"tool arguments must be a JSON object\");\n    }\n    print(await callTool(tool, args));\n    return;\n  }\n\n  const toolMap = {\n    \"hosts-list\": \"hosts_list\",\n    \"projects-list\": \"projects_list\",\n    \"workspaces-list\": \"workspaces_list\",\n    \"workspaces-create\": \"workspaces_create\",\n    \"agents-create\": \"agents_create\",\n    \"pages-publish\": \"pages_publish\",\n  };\n  const tool = toolMap[command];\n  if (!tool) throw new Error(`unknown command \"${command}\"\\n\\n${USAGE}`);\n\n  const tools = await listTools();\n  const schema = (tools.find((t) => t.name === tool) || {}).inputSchema;\n\n  if (command === \"pages-publish\") {\n    const file = flags.file;\n    if (!file) throw new Error(\"pages-publish needs --file <path-to-html>\");\n    flags.html = readFileSync(file, \"utf8\");\n    delete flags.file;\n  }\n  if (command === \"agents-create\" && !flags.workspace && !flags.workspaceId) {\n    throw new Error(\"agents-create needs --workspace <workspaceId>\");\n  }\n\n  const args = buildArgs(tool, schema, flags);\n  print(await callTool(tool, args));\n}\n\nmain().catch((err) => {\n  process.stderr.write(`supersetctl: ${err && err.message ? err.message : err}\\n`);\n  process.exit(1);\n});\n"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 10.8s)

_Thinking:_

Wait — buildArgs has a bug: `if (schema && props[key] === undefined) continue;` — resolveProp only returns keys found in props when schema exists (it checks `props[name] !== undefined`), so that line is dead when schema exists; when schema missing (no properties), resolveProp returns null for everything → error. Hmm: if schema undefined, props = {} → resolveProp fails on all flags. That breaks `hosts-list --set` usage against servers that don't publish schemas. Acceptable? For robustness: if schema has no properties (undefined/empty), accept flag names as-is. Let me fix: in resolveProp, if props is empty → return camel(flag). And remove the dead `continue`.

Also `--local` handled specially in parseFlags → flags.local = true, then coerce(true) → JSON.parse fails → returns true. Fine. But FLAG_ALIASES workspaces_create.local = ["local"] → schema may have "local" → coerce boolean true. OK.

Edge: parseFlags treats `--json` before `--file`? tools-list --json → flags.json. fine.

Another bug: in `call`, `coerce(positional[1])` — if the JSON is an object, good. Also flags for `call` ignored — fine.

`agents-create` check: flags.workspace — but schema might name it workspaceId; check `!flags.workspace && !flags.workspaceId` — ok.

Fix resolveProp now.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/tools/supersetctl/supersetctl",
  "oldString": "function resolveProp(props, tool, flag) {\n  const candidates = FLAG_ALIASES[tool]?.[flag] || [flag];\n  for (const name of candidates) {",
  "newString": "function resolveProp(props, tool, flag) {\n  const keys = Object.keys(props);\n  if (!keys.length) return flag.replace(/[-_]([a-z0-9])/g, (_, c) => c.toUpperCase());\n  const candidates = FLAG_ALIASES[tool]?.[flag] || [flag];\n  for (const name of candidates) {"
}
```

**Output:**
```
Edit applied successfully.
```

**Tool: edit**

**Input:**
```json
{
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/tools/supersetctl/supersetctl",
  "oldString": "    if (schema && props[key] === undefined) continue;\n    args[key] = coerce(raw);",
  "newString": "    args[key] = coerce(raw);"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 13.1s)

_Thinking:_

Wait — resolveProp's no-schema fallback returns camelCase of flag, but flags like `file` for pages-publish should map to `html` via aliases... when schema missing, FLAG_ALIASES lookup should still apply. Reorder: check aliases first, then exact/camel/snake, and if nothing found and props empty → return alias[0] or camel(flag). Let me restructure:

```js
function resolveProp(props, tool, flag) {
  const keys = Object.keys(props);
  const candidates = FLAG_ALIASES[tool]?.[flag] || [flag];
  for (const name of candidates) {
    if (!keys.length) return name; // no schema: trust alias/flag
    ...existence checks...
  }
  return null;
}
```
Hmm but for `--entry-path` with no schema, alias candidate "entryPath" → returns entryPath. Good. For arbitrary flag with no schema → candidate [flag] → return flag (not camel). Camel conversion for no-schema: use camel. Let's do: if no keys → return camel(flag) if no alias, else first alias camel'd... simpler: candidate name camel form.

Rewrite function cleanly.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/tools/supersetctl/supersetctl",
  "newString": "function resolveProp(props, tool, flag) {\n  const keys = Object.keys(props);\n  const camel = flag.replace(/[-_]([a-z0-9])/g, (_, c) => c.toUpperCase());\n  const candidates = FLAG_ALIASES[tool]?.[flag] || [flag];\n  if (!keys.length) return candidates[0] === flag ? camel : candidates[0];\n  for (const name of candidates) {\n    if (props[name] !== undefined) return name;\n    const asCamel = name.replace(/[-_]([a-z0-9])/g, (_, c) => c.toUpperCase());\n    if (props[asCamel] !== undefined) return asCamel;\n    const snake = asCamel.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);\n    if (props[snake] !== undefined) return snake;\n  }\n  return null;\n}",
  "oldString": "function resolveProp(props, tool, flag) {\n  const keys = Object.keys(props);\n  if (!keys.length) return flag.replace(/[-_]([a-z0-9])/g, (_, c) => c.toUpperCase());\n  const candidates = FLAG_ALIASES[tool]?.[flag] || [flag];\n  for (const name of candidates) {\n    if (props[name] !== undefined) return name;\n    const camel = name.replace(/[-_]([a-z0-9])/g, (_, c) => c.toUpperCase());\n    if (props[camel] !== undefined) return camel;\n    const snake = camel.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);\n    if (props[snake] !== undefined) return snake;\n  }\n  return null;\n}"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 8.7s)

_Thinking:_

Now tool.json, SKILL.md, and the rest. tool.json:

```json
{
  "id": "supersetctl",
  "label": "Superset API",
  "advertise": "supersetctl",
  "hints": [
    "supersetctl drives Superset: workspaces, coding agents, and published pages.",
    "Run `supersetctl auth-check` first; the API key comes from SUPERSET_API_KEY (env, .env, or ~/.config/superset/env) and must never be printed.",
    "Run `supersetctl tools-list` to see exact tool argument names before any call."
  ],
  "egress": ["api.superset.sh"],
  "install": {
    "binary": "supersetctl",
    "files": [
      { "from": "supersetctl", "to": "/usr/local/bin/supersetctl", "mode": "0755" }
    ]
  }
}
```

install.binary must match TOOL_ID_RE (lowercase alnum + hyphen) — "supersetctl" ok. Does install require binary field if files present? "install.binary must be present in the layer, declared under install.files, or installed by its Dockerfile" — binary = supersetctl, install.files to /usr/local/bin/supersetctl. Check the parse: does `install.binary` need to equal something? Let me just check the code after install.files parse — around line 184-210 of deployment-layer.ts.

**Tool: bash**

**Input:**
```json
{
  "command": "sed -n 170,240p ~/Desktop/qm/src/deployment/deployment-layer.ts; echo \"--- approvals parse ---\"; grep -n \"parseApprovals\" -A 40 ~/Desktop/qm/src/deployment/deployment-layer.ts | sed -n 1,45p"
}
```

**Output:**
```
  if (d["install"] !== undefined) {
    const inst = d["install"];
    if (typeof inst !== "object" || inst === null || Array.isArray(inst)) {
      throw new Error(`${sourcePath}: "install" must be an object`);
    }
    const binary = (inst as Record<string, unknown>)["binary"];
    if (binary !== undefined && typeof binary !== "string") {
      throw new Error(`${sourcePath}: "install.binary" must be a string`);
    }
    if (binary !== undefined && !TOOL_ID_RE.test(binary as string)) {
      throw new Error(
        `${sourcePath}: "install.binary" must match ${TOOL_ID_RE.source} (lowercase alphanumerics and hyphens) — it is interpolated into generated Dockerfile lines`,
      );
    }
    const files = (inst as Record<string, unknown>)["files"];
    out.install = {
      ...(binary !== undefined ? { binary: binary as string } : {}),
      ...(files !== undefined
        ? {
            files: parseInstallFiles(files, sourcePath, {
              id: out.id,
              binary: (binary as string | undefined) ?? out.id,
            }),
          }
        : {}),
    };
  }

  const credentialPaths = out.auth?.credentialPaths ?? [];
  for (const [index, credentialPath] of credentialPaths.entries()) {
    const { path } = credentialPath;
    const err = credentialPathError(path, credentialPath.kind);
    if (err) throw new Error(`${sourcePath}: ${err}`);
    const other = credentialPaths.find(
      (entry, otherIndex) =>
        otherIndex !== index && (path === entry.path || nested(path, entry.path) || nested(entry.path, path)),
    );
    if (other) {
      throw new Error(
        `${sourcePath}: credential paths ${JSON.stringify(path)} and ${JSON.stringify(other.path)} overlap — declare disjoint paths`,
      );
    }
  }
  const binary = out.install?.binary ?? out.id;
  if (out.auth?.broker && !POSIX_FUNCTION_NAME_RE.test(binary)) {
    throw new Error(
      `${sourcePath}: a brokered tool's binary ${JSON.stringify(binary)} must match ${POSIX_FUNCTION_NAME_RE.source} — vended credentials wrap it in a shell function, and not every sandbox shell accepts hyphenated function names`,
    );
  }
  for (const [i, approval] of (out.approvals ?? []).entries()) {
    const compiled = compileApproval(binary, approval);
    try {
      new RegExp(compiled.pattern, "i");
    } catch (e) {
      throw new Error(`${sourcePath}: approvals[${i}] is not a valid regex: ${(e as Error).message}`, { cause: e });
    }
    if (compiled.pattern.length > MAX_APPROVAL_PATTERN_LEN) {
      throw new Error(`${sourcePath}: approvals[${i}] pattern is too long (max ${MAX_APPROVAL_PATTERN_LEN} chars)`);
    }
    if (approvalPatternTooSlow(compiled.pattern)) {
      throw new Error(
        `${sourcePath}: approvals[${i}] pattern is too slow to evaluate — it may cause catastrophic backtracking`,
      );
    }
    if (approval.pattern !== undefined && !rawApprovalTargetsTool(binary, approval.pattern)) {
      throw new Error(
        `${sourcePath}: approvals[${i}].pattern must refer to its own tool binary by starting with \\b${binary}\\b and may not use a top-level alternative`,
      );
    }
  }

--- approvals parse ---
168:  if (d["approvals"] !== undefined) out.approvals = parseApprovals(d["approvals"], sourcePath);
169-
170-  if (d["install"] !== undefined) {
171-    const inst = d["install"];
172-    if (typeof inst !== "object" || inst === null || Array.isArray(inst)) {
173-      throw new Error(`${sourcePath}: "install" must be an object`);
174-    }
175-    const binary = (inst as Record<string, unknown>)["binary"];
176-    if (binary !== undefined && typeof binary !== "string") {
177-      throw new Error(`${sourcePath}: "install.binary" must be a string`);
178-    }
179-    if (binary !== undefined && !TOOL_ID_RE.test(binary as string)) {
180-      throw new Error(
181-        `${sourcePath}: "install.binary" must match ${TOOL_ID_RE.source} (lowercase alphanumerics and hyphens) — it is interpolated into generated Dockerfile lines`,
182-      );
183-    }
184-    const files = (inst as Record<string, unknown>)["files"];
185-    out.install = {
186-      ...(binary !== undefined ? { binary: binary as string } : {}),
187-      ...(files !== undefined
188-        ? {
189-            files: parseInstallFiles(files, sourcePath, {
190-              id: out.id,
191-              binary: (binary as string | undefined) ?? out.id,
192-            }),
193-          }
194-        : {}),
195-    };
196-  }
197-
198-  const credentialPaths = out.auth?.credentialPaths ?? [];
199-  for (const [index, credentialPath] of credentialPaths.entries()) {
200-    const { path } = credentialPath;
201-    const err = credentialPathError(path, credentialPath.kind);
202-    if (err) throw new Error(`${sourcePath}: ${err}`);
203-    const other = credentialPaths.find(
204-      (entry, otherIndex) =>
205-        otherIndex !== index && (path === entry.path || nested(path, entry.path) || nested(entry.path, path)),
206-    );
207-    if (other) {
208-      throw new Error(
--
335:function parseApprovals(raw: unknown, sourcePath: string): ToolApproval[] {
336-  if (!Array.isArray(raw)) throw new Error(`${sourcePath}: "approvals" must be an array`);
337-  return raw.map((entry, i) => {

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 13.8s)

_Thinking:_

Good — tool.json plan is valid. Note TOOL_ID_RE is lowercase alnum+hyphen — "supersetctl" fits.

Now write tool.json and SKILL.md.

**Tool: write**

**Input:**
```json
{
  "content": "{\n  \"id\": \"supersetctl\",\n  \"label\": \"Superset\",\n  \"advertise\": \"supersetctl\",\n  \"hints\": [\n    \"supersetctl drives Superset over its MCP API: list hosts/projects, create workspaces, launch coding agents, publish HTML pages.\",\n    \"Run `supersetctl auth-check` first. The key comes from SUPERSET_API_KEY (process env, .env, or ~/.config/superset/env) and must never be printed or written to a file.\",\n    \"Run `supersetctl tools-list` before unfamiliar calls to see the exact argument names.\",\n    \"If `node` is missing, the script cannot run; ask the human rather than improvising HTTP calls with the key.\"\n  ],\n  \"egress\": [\"api.superset.sh\"],\n  \"install\": {\n    \"binary\": \"supersetctl\",\n    \"files\": [\n      {\n        \"from\": \"supersetctl\",\n        \"to\": \"/usr/local/bin/supersetctl\",\n        \"mode\": \"0755\"\n      }\n    ]\n  }\n}\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/tools/supersetctl/tool.json"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "content": "---\nname: principal-engineer\ndescription: Design or ship changes in a code repository through Superset. Use when asked to render or propose a UI/design, or to implement, build, fix, and open a pull request.\n---\n\n# Principal engineer (Superset bridge)\n\nYou are the single engineering agent. All execution happens in Superset, driven through `supersetctl`. Pick a mode from the request:\n\n- **render** — the human wants to *see* a design before any code changes (mockups, UI proposals, page redesigns).\n- **build** — the human wants working code and a pull request in a repository.\n\nThe two modes are exclusive per request. Never do both unless asked.\n\n## 0. Access check\n\n```\nsupersetctl auth-check\n```\n\nIf it fails, reply with: add `SUPERSET_API_KEY=sk_live_…` to the project `.env` or `~/.config/superset/env` (Superset app → Settings → API Keys). Never print the key, never echo it, never write it anywhere.\n\n## render mode\n\n1. Write one self-contained HTML file to `renders/<slug>.html` — inline CSS, no external assets, no build step, no JavaScript frameworks. Match the product's existing look when you know it.\n2. Publish it:\n\n```\nsupersetctl pages-publish --file renders/<slug>.html --title \"<short proposal>\"\n```\n\n3. Reply with the page URL from the JSON result plus a one-line summary of the design decision. Stop there — do not modify the repository.\n\n## build mode\n\n1. Locate the target:\n\n```\nsupersetctl hosts-list\nsupersetctl projects-list\n```\n\nIf the repository has no project yet, reply with the exact repo URL the human should add to Superset and stop. Do not create projects yourself.\n\n2. Create an isolated workspace (worktree):\n\n```\nsupersetctl workspaces-create --project <projectId> --name <slug> --branch <slug>\n```\n\n3. Launch the coding agent:\n\n```\nsupersetctl agents-create --workspace <workspaceId> --prompt \"<spec>\"\n```\n\nThe spec must contain: the goal, the relevant files/areas, concrete acceptance criteria, the instruction to open a PR against the default branch and never merge it, and the render page URL when one exists.\n\n4. Reply immediately with the workspace id and the raw result JSON so the human can watch progress in Superset. When asked for status later, poll `supersetctl call workspaces_list '{}'` (and `agents_list`) once per request — do not loop in the background.\n\n## Rules\n\n- Confirm argument names with `supersetctl tools-list` before any unfamiliar call; the generic escape hatch is `supersetctl call <tool> '<json>'`.\n- Never merge pull requests. Never call any `*_delete` tool. Never create or modify automations.\n- Never commit, read, or print secrets. `.env` stays out of the repository.\n- If a Superset call fails twice with the same error, stop and report the error verbatim instead of retrying.\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/skills/principal-engineer/SKILL.md"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 16.5s)

_Thinking:_

Now: .env.example, .gitignore, package.json, scripts/start-host.sh, test/smoke.mjs.

**Tool: write**

**Input:**
```json
{
  "content": "# Superset MCP API key — Superset app → Settings → API Keys (starts with sk_live_)\nSUPERSET_API_KEY=\n\n# Superset MCP endpoint (optional, this is the default)\nSUPERSET_MCP_URL=https://api.superset.sh/mcp\n\n# GitHub token the Superset host uses to open PRs (fine-grained PAT, repo scope)\nGH_TOKEN=\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/.env.example"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "content": ".env\nnode_modules/\nrenders/\ntest/tmp-*\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/.gitignore"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "content": "{\n  \"name\": \"own-your-intelligence\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"engines\": {\n    \"node\": \">=18\"\n  },\n  \"scripts\": {\n    \"smoke\": \"node test/smoke.mjs\",\n    \"supersetctl\": \"node qm/sandbox/tools/supersetctl/supersetctl\",\n    \"host\": \"bash scripts/start-host.sh\"\n  }\n}\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/package.json"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "content": "#!/usr/bin/env bash\nset -euo pipefail\n\nroot=\"$(cd \"$(dirname \"${BASH_SOURCE[0]}\")/..\" && pwd)\"\n\nif [[ -f \"$root/.env\" ]]; then\n  set -a\n  # shellcheck disable=SC1091\n  source \"$root/.env\"\n  set +a\nfi\n\nif [[ -n \"${GH_TOKEN:-}\" ]]; then\n  export GH_TOKEN\n  export GITHUB_TOKEN=\"$GH_TOKEN\"\nfi\n\nexport PATH=\"${HOME}/.superset/bin:${PATH}\"\n\nif ! command -v superset >/dev/null 2>&1; then\n  echo \"superset CLI not found — install the Superset app or the standalone CLI\" >&2\n  exit 1\nfi\n\nsuperset start --daemon\nsuperset status\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/scripts/start-host.sh"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 14.8s)

_Thinking:_

Now test/smoke.mjs — plain Node, no deps:

1. skip if no key
2. auth-check
3. tools-list --json → assert required tools
4. pages-publish a tiny HTML (visibility everyone via --set) → extract URL → fetch → 2xx
5. print verification URL

Write it.

**Tool: write**

**Input:**
```json
{
  "content": "import { spawnSync } from \"node:child_process\";\nimport { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from \"node:fs\";\nimport { tmpdir } from \"node:os\";\nimport { dirname, join } from \"node:path\";\nimport { fileURLToPath } from \"node:url\";\n\nconst root = join(dirname(fileURLToPath(import.meta.url)), \"..\");\nconst ctl = join(root, \"qm\", \"sandbox\", \"tools\", \"supersetctl\", \"supersetctl\");\n\nconst REQUIRED_TOOLS = [\"pages_publish\", \"workspaces_create\", \"agents_create\", \"hosts_list\", \"projects_list\"];\n\nfunction run(args) {\n  return spawnSync(process.execPath, [ctl, ...args], { cwd: root, encoding: \"utf8\", timeout: 120_000 });\n}\n\nfunction ok(label, detail = \"\") {\n  process.stdout.write(`ok   ${label}${detail ? ` — ${detail}` : \"\"}\\n`);\n}\n\nfunction fail(label, detail) {\n  process.stderr.write(`FAIL ${label} — ${detail}\\n`);\n  process.exit(1);\n}\n\nfunction hasApiKey() {\n  if ((process.env.SUPERSET_API_KEY || \"\").trim()) return true;\n  const candidates = [join(root, \".env\")];\n  let dir = root;\n  for (let i = 0; i < 6; i++) {\n    candidates.push(join(dir, \".env\"));\n    dir = dirname(dir);\n  }\n  candidates.push(join(process.env.HOME || \"\", \".config\", \"superset\", \"env\"));\n  return candidates.some(\n    (file) => existsSync(file) && /^\\s*SUPERSET_API_KEY\\s*=\\s*\\S/sm.test(readFileSync(file, \"utf8\")),\n  );\n}\n\nif (!hasApiKey()) {\n  process.stdout.write(\"skip smoke — no SUPERSET_API_KEY (add it to .env, see .env.example)\\n\");\n  process.exit(0);\n}\n\nconst auth = run([\"auth-check\"]);\nif (auth.status !== 0) fail(\"auth-check\", auth.stderr.trim() || `exit ${auth.status}`);\nlet authJson;\ntry {\n  authJson = JSON.parse(auth.stdout);\n} catch {\n  fail(\"auth-check\", `unparseable output: ${auth.stdout.slice(0, 200)}`);\n}\nok(\"auth-check\", `${authJson.tools} tools at ${authJson.endpoint}`);\n\nconst list = run([\"tools-list\", \"--json\"]);\nif (list.status !== 0) fail(\"tools-list\", list.stderr.trim() || `exit ${list.status}`);\nlet tools;\ntry {\n  tools = JSON.parse(list.stdout);\n} catch {\n  fail(\"tools-list\", `unparseable output: ${list.stdout.slice(0, 200)}`);\n}\nconst names = tools.map((t) => t.name);\nconst missing = REQUIRED_TOOLS.filter((name) => !names.includes(name));\nif (missing.length) fail(\"tools-list\", `missing tools: ${missing.join(\", \")}`);\nok(\"tools-list\", `${names.length} tools, required set present`);\n\nconst workDir = mkdtempSync(join(tmpdir(), \"supersetctl-smoke-\"));\ntry {\n  const htmlFile = join(workDir, \"smoke.html\");\n  writeFileSync(\n    htmlFile,\n    `<!doctype html><html><head><meta charset=\"utf-8\"><title>supersetctl smoke</title></head><body style=\"font-family:system-ui;margin:4rem auto;max-width:32rem\"><h1>supersetctl smoke</h1><p>Published by test/smoke.mjs. If you can read this, the render path works.</p></body></html>`,\n  );\n\n  const publish = run([\n    \"pages-publish\",\n    \"--file\",\n    htmlFile,\n    \"--title\",\n    \"supersetctl smoke\",\n    \"--set\",\n    \"visibility=everyone\",\n  ]);\n  if (publish.status !== 0) fail(\"pages-publish\", publish.stderr.trim() || `exit ${publish.status}`);\n\n  const match = publish.stdout.match(/https?:\\/\\/[^\\s\"\\\\]+/);\n  if (!match) fail(\"pages-publish\", `no URL in result: ${publish.stdout.slice(0, 300)}`);\n  const url = match[0];\n\n  const res = await fetch(url, { redirect: \"follow\", signal: AbortSignal.timeout(30_000) });\n  if (res.status >= 400) fail(\"page-fetch\", `${res.status} for ${url}`);\n  const body = await res.text();\n  if (!body.includes(\"supersetctl smoke\")) fail(\"page-fetch\", \"published page is missing its content\");\n  ok(\"pages-publish\", url);\n\n  process.stdout.write(`\\nverification URL: ${url}\\n`);\n} finally {\n  rmSync(workDir, { recursive: true, force: true });\n}\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/test/smoke.mjs"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 126.0s)

_Thinking:_

Now verify:
1. `node --check` on supersetctl and smoke (node --check works for .mjs? `node --check` supports ESM only if file ends .mjs or type module... `node --check file` uses goal detection; for a file without extension named `supersetctl`, node --check may treat as CJS and choke on import. Use `node --input-type=module --check < file`? Simpler: run `node supersetctl --help` — that executes; imports node:fs etc. fine, and --help path prints usage without network.
2. Run smoke → expect skip message.
3. Validate tool.json with QM's parseToolDescriptor — need node with TS stripping. Check available node versions.
4. chmod +x the script.

Also create `.env`? User will bring tokens. Skip creating .env (gitignored anyway) — .env.example exists.

Run checks.

**Tool: bash**

**Input:**
```json
{
  "command": "chmod +x qm/sandbox/tools/supersetctl/supersetctl scripts/start-host.sh && node qm/sandbox/tools/supersetctl/supersetctl --help | head -8; echo \"--- smoke (expect skip) ---\"; node test/smoke.mjs; echo \"exit=$?\"",
  "workdir": "/Users/kgensupertramp/Desktop/own-your-intelligence"
}
```

**Output:**
```
supersetctl — drive the Superset MCP API

Usage:
  supersetctl auth-check
  supersetctl tools-list [--json]
  supersetctl call <tool> ['<json-args>']
  supersetctl hosts-list
  supersetctl projects-list
--- smoke (expect skip) ---
skip smoke — no SUPERSET_API_KEY (add it to .env, see .env.example)
exit=0

```

**Tool: bash**

**Input:**
```json
{
  "command": "cat ~/Desktop/qm/.node-version; ls ~/.nvm/versions/node/ 2>/dev/null; command -v nvm; node --version"
}
```

**Output:**
```
24.18.0
v18.18.0
v20.19.5
v24.18.0
v20.19.5

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 16.5s)

_Thinking:_

Node v24.18.0 available in nvm. Validate tool.json against QM's parseToolDescriptor using node 24 (which supports type stripping for .ts? Node 24 has --experimental-strip-types enabled by default? Node 23+ strips types by default for .ts files run directly. Node 24: type stripping is stable-ish (no flag needed for erasable syntax). deployment-layer.ts imports other .ts files with relative paths including `.ts` extensions — should work under node 24 if syntax is erasable (no enums/namespaces hopefully).

Write a temp validation script:

```js
import { parseToolDescriptor } from "/Users/.../qm/src/deployment/deployment-layer.ts";
import { readFileSync } from "node:fs";
const raw = readFileSync(".../tool.json", "utf8");
const d = parseToolDescriptor(raw, "tool.json");
console.log("valid", JSON.stringify(d));
```

Run with ~/.nvm/versions/node/v24.18.0/bin/node.

Also validate skill loading expectations: skills need frontmatter name+description — parseSeedSkill. Could validate too: import from src/skills/seed.ts (might import more deps). Try skill parse as well if easy; else skip (frontmatter matches documented requirement).

Also check SKILL.md files path: layer expects skills/<id>/SKILL.md where id dir = principal-engineer, frontmatter name principal-engineer. deployment-layer-store line 199: root = file path `skills/${dir}/SKILL.md`. parseSeedSkill might require frontmatter `name` matching? Just validate.

Run validation.

**Tool: bash**

**Input:**
```json
{
  "command": "cat > /tmp/validate-layer.mjs <<'EOF'\nimport { parseToolDescriptor } from \"/Users/kgensupertramp/Desktop/qm/src/deployment/deployment-layer.ts\";\nimport { readFileSync } from \"node:fs\";\nconst path = \"/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/tools/supersetctl/tool.json\";\nconst desc = parseToolDescriptor(readFileSync(path, \"utf8\"), path);\nconsole.log(\"tool.json OK:\", JSON.stringify(desc, null, 2));\nEOF\n~/.nvm/versions/node/v24.18.0/bin/node /tmp/validate-layer.mjs"
}
```

**Output:**
```
tool.json OK: {
  "id": "supersetctl",
  "label": "Superset",
  "advertise": "supersetctl",
  "hints": [
    "supersetctl drives Superset over its MCP API: list hosts/projects, create workspaces, launch coding agents, publish HTML pages.",
    "Run `supersetctl auth-check` first. The key comes from SUPERSET_API_KEY (process env, .env, or ~/.config/superset/env) and must never be printed or written to a file.",
    "Run `supersetctl tools-list` before unfamiliar calls to see the exact argument names.",
    "If `node` is missing, the script cannot run; ask the human rather than improvising HTTP calls with the key."
  ],
  "egress": [
    "api.superset.sh"
  ],
  "install": {
    "binary": "supersetctl",
    "files": [
      {
        "from": "supersetctl",
        "to": "/usr/local/bin/supersetctl",
        "mode": "0755"
      }
    ]
  }
}

```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"frontmatter\\|description\\|name\" ~/Desktop/qm/src/skills/seed.ts | head -20; echo \"---\"; sed -n 1,60p ~/Desktop/qm/src/skills/seed.ts"
}
```

**Output:**
```
5:import { parseSeedSkillFrontmatter } from "./frontmatter.ts";
28:    a.description === b.description &&
38:    for (const name of readdirSync(abs).sort()) {
39:      const child = join(abs, name);
78:  name: string,
82:    (s) => s.scopeId === scopeId && s.manifest.name === name && s.createdBy !== createdBy && s.status !== "archived",
92:  return upsertQueue(`${input.scopeId}\0${input.manifest.name}`, () => upsertSeedSkillUnsafe(skills, input));
102:    (s) => s.scopeId === scopeId && s.manifest.name === manifest.name && s.createdBy === createdBy,
104:  if (!existing && foreignSkillCollision(all, scopeId, manifest.name, createdBy)) return "foreign";
135:    result[outcome === "foreign" ? "skipped" : outcome].push(manifest.name);
---
import { existsSync, lstatSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import type { ScopeId } from "../types.ts";
import { createKeyedQueue } from "../util/async.ts";
import { parseSeedSkillFrontmatter } from "./frontmatter.ts";
import { safeSkillFilePath, type Skill, type SkillFile, type SkillManifest, type SkillStore } from "./skill-store.ts";

export interface SeedInstallResult {
  installed: string[];
  updated: string[];
  skipped: string[];
}

export function isProbablyBinary(bytes: Buffer): boolean {
  if (bytes.includes(0)) return true;
  return !Buffer.from(bytes.toString("utf8"), "utf8").equals(bytes);
}

function canonicalFilesKey(files: SkillFile[] | undefined): string {
  return [...(files ?? [])]
    .map((f) => `${f.path}\0${f.content}\0${f.executable === true ? "1" : "0"}`)
    .sort()
    .join("");
}

export function sameManifest(a: SkillManifest, b: SkillManifest): boolean {
  return (
    a.description === b.description &&
    a.body === b.body &&
    [...a.requiredCapabilities].sort().join("\0") === [...b.requiredCapabilities].sort().join("\0") &&
    canonicalFilesKey(a.files) === canonicalFilesKey(b.files)
  );
}

function readSkillFiles(skillDir: string): SkillFile[] {
  const out: SkillFile[] = [];
  const walk = (abs: string): void => {
    for (const name of readdirSync(abs).sort()) {
      const child = join(abs, name);
      const st = lstatSync(child);
      if (st.isSymbolicLink()) {
        console.warn(`skills-seed: skipping symlink asset ${relative(skillDir, child)} (not materialized)`);
        continue;
      }
      if (st.isDirectory()) {
        walk(child);
        continue;
      }
      if (!st.isFile()) continue;
      const rel = relative(skillDir, child).split(sep).join("/");
      if (rel === "SKILL.md") continue;
      const safe = safeSkillFilePath(rel);
      const bytes = readFileSync(child);
      if (isProbablyBinary(bytes)) {
        console.warn(`skills-seed: skipping binary asset ${safe} (v1 stores text only)`);
        continue;
      }
      out.push({ path: safe, content: bytes.toString("utf8"), executable: (st.mode & 0o111) !== 0 });
    }
  };

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 12.6s)

_Thinking:_

tool.json validates against the real parser. Now validate SKILL.md frontmatter with parseSeedSkillFrontmatter.

**Tool: bash**

**Input:**
```json
{
  "command": "cat > /tmp/validate-skill.mjs <<'EOF'\nimport { parseSeedSkillFrontmatter } from \"/Users/kgensupertramp/Desktop/qm/src/skills/frontmatter.ts\";\nimport { readFileSync } from \"node:fs\";\nconst path = \"/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox/skills/principal-engineer/SKILL.md\";\nconst manifest = parseSeedSkillFrontmatter(readFileSync(path, \"utf8\"));\nconsole.log(\"SKILL.md OK:\", JSON.stringify({ name: manifest.name, description: manifest.description?.slice(0, 80), requiredCapabilities: manifest.requiredCapabilities }, null, 2));\nEOF\n~/.nvm/versions/node/v24.18.0/bin/node /tmp/validate-skill.mjs"
}
```

**Output:**
```
SKILL.md OK: {
  "name": "principal-engineer",
  "description": "Design or ship changes in a code repository through Superset. Use when asked to ",
  "requiredCapabilities": []
}

```

**Tool: bash**

**Input:**
```json
{
  "command": "grep -rn \"layerSkillsDir\\|seedSkills\" ~/Desktop/qm/src/wiring.ts | sed -n 1,12p; sed -n 705,760p ~/Desktop/qm/src/wiring.ts"
}
```

**Output:**
```
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:710:  const layerSkillsDir = config.deploymentLayerDir ? resolve(deploymentLayer.dir, "skills") : undefined;
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:731:    ...(config.seedSkills && layerSkillsDir
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:735:              dir: layerSkillsDir,
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:748:  if (config.seedSkills) {
/Users/kgensupertramp/Desktop/qm/src/wiring.ts:752:        if (layerSkillsDir && resolve(dir) === layerSkillsDir) continue;
    config.connectorSecretKey ?? randomBytes(32),
  );
  const deploymentLayer = config.deploymentLayerDir
    ? loadDeploymentLayer(config.deploymentLayerDir)
    : emptyDeploymentLayer();
  const layerSkillsDir = config.deploymentLayerDir ? resolve(deploymentLayer.dir, "skills") : undefined;
  const credentialTools = deploymentLayer.credentialTools;
  const brokeredTools = deploymentLayer.brokeredTools;
  const orgScope = scopeId("org", config.orgId);
  const auditLog = config.databaseUrl ? createPostgresAuditLog(config.databaseUrl) : createAuditLog();
  const deploymentLayerStore = createDeploymentLayerStore({
    backing: artifactMap<StoredDeploymentLayer>("deployment_layer"),
    runtime: deploymentLayer,
    skills,
    skillBundles,
    scopeId: orgScope,
    durable: pgArtifactMap !== null,
    advisoryLock,
    auditPersisted: (record) =>
      auditLog.recordOnce!(`deployment-layer:${orgScope}:${record.version}`, {
        at: record.updatedAt,
        principalId: record.updatedBy,
        action: "deployment_layer.updated",
        resource: record.contentHash,
        scopeLabel: orgScope,
      }),
    ...(config.seedSkills && layerSkillsDir
      ? {
          seedFallback: () =>
            installSeedSkills(skills, {
              dir: layerSkillsDir,
              scopeId: orgScope,
              createdBy: LAYER_CREATED_BY,
              reviewer: LAYER_REVIEWER,
            }),
        }
      : {}),
  });
  const deploymentLayerReady = deploymentLayerStore.hydrate();
  const deploymentLayerRefresh = createUntrackedSweeper(() => deploymentLayerStore.hydrate(), 30_000, {
    label: "deployment layer refresh",
  });
  let skillsReady: Promise<void>;
  if (config.seedSkills) {
    const installCatalogs = async (): Promise<void> => {
      await installSeedSkills(skills, { dir: config.skillsSeedDir, scopeId: orgScope });
      for (const dir of config.pluginSkillDirs) {
        if (layerSkillsDir && resolve(dir) === layerSkillsDir) continue;
        await installSeedSkills(skills, {
          dir,
          scopeId: orgScope,
          createdBy: "system:plugin-skills",
          reviewer: "system:plugin-skills-reviewer",
        });
      }
    };

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 10.8s)

_Thinking:_

Both artifacts validate against QM's real parsers, and the layer wiring confirms: `DEPLOYMENT_LAYER=<dir>` → tools loaded at boot, skills seeded from `<dir>/skills` (seedSkills default true).

Remaining: give the user the wiring step (how to enable the layer for their dev instance) and the run/verify commands. Should I actually wire it (edit ~/Desktop/qm/.env)? That's their QM checkout outside this repo — modifying it is a side effect beyond the repo. The user said "codebase is already setup" and asked me to write the code. Adding `DEPLOYMENT_LAYER=...` to ~/Desktop/qm/.env would make it live. Is .env there? envctx reads mainRoot/.env. Let me check if ~/Desktop/qm/.env exists and whether appending DEPLOYMENT_LAYER is appropriate. It also affects dev instance boot — but instance isn't running now. This seems like a genuinely helpful, small, reversible step. But it's outside the workspace repo... user's machine though, they asked to build the system. I'd rather report the one line to add and let them decide? The instructions say be proactive but not surprising. Given they said "it up to u" and "just write code", wiring their dev instance is arguably part of making it work. But modifying another checkout's env could conflict with their workflow.

Middle ground: check if ~/Desktop/qm/.env exists; if yes, append DEPLOYMENT_LAYER line (clearly marked) — it's env config, reversible, and needed for the system to work. Let me check contents first.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la ~/Desktop/qm/.env 2>/dev/null && sed 's/=.*/=<redacted>/' ~/Desktop/qm/.env | head -30 || echo \"no .env\""
}
```

**Output:**
```
no .env

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 13.8s)

_Thinking:_

No .env in ~/Desktop/qm. So where do dev instance env vars come from? envctx.ts: `const mainEnv = join(mainRoot, ".env")` and seeds from worktree. And pool.ts reads ~/.config/qm/dev.env for the slack pool. Their dev.env holds MODEL_PROVIDER/keys/ORG_ID/HARNESS.

Does dev-instance forward arbitrary env (like DEPLOYMENT_LAYER) from the caller shell? Likely env is inherited through process.env → core. config.ts reads `env.DEPLOYMENT_LAYER`. If I `export DEPLOYMENT_LAYER=...` before `npm run dev-instance`, it should reach core — unless dev-instance sanitizes env. 

Also: does the sandbox the agent executes in get node? Unknown — but hints cover it.

Another thought: instead of DEPLOYMENT_LAYER, I could wire via `config.seedSkills`/`skillsSeedDir`? config.skillsSeedDir — a directory of seed skills. Simpler for skills only, but tools need deployment layer. DEPLOYMENT_LAYER covers both.

Where does dev instance run core — does it pass through process.env? dev/cli.ts → supervisor → deps spawn with env. I saw `env: { ...process.env, WEB_UI_BASE: ...}` in deps.ts — good sign env is spread.

Good enough. Final answer: summarize what was built, how to wire (one env var), how to run/verify. Keep concise but include the run commands.

Let me do a final listing + a quick lint-ish pass: run supersetctl auth-check without key to confirm clean error; run `node --check`-ish on smoke (already ran). Also bash -n scripts/start-host.sh.

**Tool: bash**

**Input:**
```json
{
  "command": "bash -n scripts/start-host.sh && echo \"start-host syntax OK\"; node qm/sandbox/tools/supersetctl/supersetctl auth-check; echo \"exit=$?\"; echo \"--- tree ---\"; find . -type f -not -path \"./.git/*\" | sort",
  "workdir": "/Users/kgensupertramp/Desktop/own-your-intelligence"
}
```

**Output:**
```
start-host syntax OK
supersetctl: SUPERSET_API_KEY is not set — add it to .env (repo root) or ~/.config/superset/env (Superset app -> Settings -> API Keys)
exit=1
--- tree ---
./.env.example
./.gitignore
./AGENTS.md
./ARCHITECTURE.md
./agents/company/SYSTEM.md
./factory/.env.example
./factory/.gitignore
./factory/README.md
./factory/cluster.py
./factory/data/.gitkeep
./factory/data/raw/.gitkeep
./factory/explore.py
./factory/fixtures/acmepulse_reviews.json
./factory/fixtures/sample_real_reviews.json
./factory/gbrain_sync.py
./factory/notion_sync.py
./factory/pyproject.toml
./factory/schema.py
./factory/scripts/memorable_ingest_tickets.json
./factory/tickets.py
./factory/uv.lock
./harmony-engineering-handoff/01-product-requirements.md
./harmony-engineering-handoff/02-decisions-and-invariants.md
./harmony-engineering-handoff/03-system-architecture.md
./harmony-engineering-handoff/04-upstream-forks-and-integration.md
./harmony-engineering-handoff/05-domain-model-and-storage.md
./harmony-engineering-handoff/06-api-and-event-contracts.md
./harmony-engineering-handoff/07-workflows-and-state-machines.md
./harmony-engineering-handoff/08-agent-roles-and-execution.md
./harmony-engineering-handoff/09-gbrain-knowledge-and-provenance.md
./harmony-engineering-handoff/10-feedback-and-market-intelligence.md
./harmony-engineering-handoff/11-repository-preview-and-delivery.md
./harmony-engineering-handoff/12-identity-security-and-isolation.md
./harmony-engineering-handoff/13-infrastructure-and-operations.md
./harmony-engineering-handoff/14-testing-and-acceptance.md
./harmony-engineering-handoff/15-implementation-backlog-and-runbook.md
./harmony-engineering-handoff/16-sources-assumptions-and-coverage.md
./harmony-engineering-handoff/ALL-SPECIFICATIONS.md
./harmony-engineering-handoff/README.md
./harmony-engineering-handoff/VALIDATION.md
./memory/company/brand.md
./memory/company/product.md
./memory/company/reviews/.gitkeep
./memory/company/reviews/acmepulse.md
./memory/company/reviews/katz-s-delicatessen.md
./memory/company/reviews/tartine-bakery.md
./memory/company/reviews/themes.md
./memory/company/reviews/tickets.md
./memory/company/reviews/tickets_acmepulse.md
./memory/company/reviews/tickets_tartine-bakery.md
./mermaid-diagram (1).png
./package.json
./qm/sandbox/skills/principal-engineer/SKILL.md
./qm/sandbox/tools/supersetctl/supersetctl
./qm/sandbox/tools/supersetctl/tool.json
./scripts/start-host.sh
./test/smoke.mjs

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 18.9s)

_Thinking:_

Interesting — the tree now shows `factory/`, `agents/`, `memory/`, `AGENTS.md` that weren't there in my first `ls` earlier (repo listing at the start showed only .git, ARCHITECTURE.md, harmony-engineering-handoff, mermaid png). So the user (or another agent) added files in parallel — "codebase is already setup" as they said. Fine — my files coexist; package.json at root — did package.json exist before? I wrote it; but did I overwrite an existing one? I wrote with `write` tool which overwrites. Earlier `ls` (turn 1) showed no package.json at root. But factory/ appeared later. Did root package.json pre-exist just before my write? If it did, my write clobbered it. Let me check git status for package.json to see if it's a new untracked file vs modified.

Also note factory/.env.example exists — maybe tokens go there too? User said "assume to have it from the .env". My supersetctl reads .env upward from cwd — factory/.env wouldn't be found (it's downward). Check git status.

**Tool: bash**

**Input:**
```json
{
  "command": "git status --short | head -30; echo \"--- package.json tracked? ---\"; git log --oneline -3; git diff --stat HEAD -- package.json 2>/dev/null; git show HEAD:package.json 2>/dev/null | head -5 || echo \"package.json not in HEAD\"",
  "workdir": "/Users/kgensupertramp/Desktop/own-your-intelligence"
}
```

**Output:**
```
?? .env.example
?? .gitignore
?? package.json
?? qm/
?? scripts/
?? test/
--- package.json tracked? ---
8885298 feat: Google reviews to tickets via GBrain (#2)
1f8412a docs: add engineering handoff and diagram
1550446 docs: add folder structure

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 9.7s)

_Thinking:_

Interesting: git status shows only my new files as untracked — factory/, agents/, memory/, AGENTS.md don't appear... meaning they ARE tracked (committed in 8885298 "feat: Google reviews to tickets via GBrain (#2)" — a new commit since my first look; someone committed parallel work). package.json not in HEAD → my write created it fresh, no clobber. Good.

Also there's a PR (#2) — repo has a remote now. Whatever — not my concern.

factory/.env.example — check if it documents SUPERSET_API_KEY/GH_TOKEN so I stay consistent (user said "assume to have it from the .env"). My supersetctl searches upward from cwd; if tokens live in factory/.env only, agent cwd elsewhere won't find it. Let me peek at factory/.env.example and factory/README to align.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -n \"SUPERSET\\|GH_TOKEN\\|GITHUB\" factory/.env.example .env.example 2>/dev/null; echo \"--- factory README head ---\"; head -30 factory/README.md 2>/dev/null; echo \"--- any superset refs in repo ---\"; grep -rn \"superset\" --include=\"*.py\" --include=\"*.md\" --include=\"*.example\" factory agents 2>/dev/null | head",
  "workdir": "/Users/kgensupertramp/Desktop/own-your-intelligence"
}
```

**Output:**
```
.env.example:2:SUPERSET_API_KEY=
.env.example:5:SUPERSET_MCP_URL=https://api.superset.sh/mcp
.env.example:8:GH_TOKEN=
--- factory README head ---
# Feedback → Feature Factory — reviews → themes → tickets

Thin Python glue to pull Google Maps reviews via **SerpAPI**, load the
AcmePulse demo fixture, cluster corpora into ranked themes, and mint
problem/feature tickets for company memory. Syncs to **GBrain**; procedures
can be stored in **Memorable**. UFO is out of scope for now.

## Setup

```bash
cd factory
cp .env.example .env   # SERPAPI_API_KEY + GOOGLE_MAPS_PLACE_ID; OPENAI_API_KEY for cluster/tickets
uv sync                # or: pip install -e .
```

Deps are listed in `pyproject.toml` (`httpx`, `python-dotenv`, `pydantic`).

## CLI — ingest (Phase 1)

```bash
# Live fetch (SerpAPI google_maps_reviews, newest first, paginated)
uv run explore --place-id "$GOOGLE_MAPS_PLACE_ID" --max 1000

# Or without installing the console script:
python explore.py --place-id "$GOOGLE_MAPS_PLACE_ID" --max 1000

# Resolve place_id from a Maps query
uv run explore --query "Acme Coffee Seattle" --max 200

# Offline: print AcmePulse fake corpus
--- any superset refs in repo ---

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 17.0s)

_Thinking:_

factory/.env is separate (SerpAPI etc.), root .env is for Superset/GH — no conflict. Good.

Everything validates. Update todos and write the final summary with wiring instructions:

1. What was built (files).
2. How to make it live:
   - `cp .env.example .env` → fill SUPERSET_API_KEY + GH_TOKEN
   - Wire QM: set `DEPLOYMENT_LAYER=/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox` in the env where you launch the dev instance (e.g. add to ~/.config/qm/dev.env or export before `npm run dev-instance:slack`) — then the `principal-engineer` skill seeds and `supersetctl` installs into the agent computer.
   - Superset host: `npm run host` (start-host.sh loads .env → exports GH_TOKEN → superset start --daemon)
3. Verify: `npm run smoke` → prints verification URL (the Superset Pages URL).
4. Talk to the QM Slack bot: "render me..." / "build ... in repo X".

One caveat to mention honestly: the API key must be visible where `supersetctl` runs inside the QM sandbox; if the sandbox doesn't inherit it, auth-check will say so — then we wire the key file in (next step). Keep brief.

Keep response concise (they like terse). Include file:line references where useful.

Built and validated. Everything the QM parser checks passes (ran your real `parseToolDescriptor` + `parseSeedSkillFrontmatter` against the files).

**What's in the repo now:**

| File | Role |
|---|---|
| `qm/sandbox/tools/supersetctl/supersetctl` | Zero-dependency Node MCP client: `auth-check`, `tools-list`, `call`, `hosts-list`, `projects-list`, `workspaces-list/create`, `agents-create`, `pages-publish`. Resolves arg names against the live tool schema, so it won't guess wrong field names |
| `qm/sandbox/tools/supersetctl/tool.json` | QM layer descriptor: installs the binary, egress `api.superset.sh`, hints for the model |
| `qm/sandbox/skills/principal-engineer/SKILL.md` | The one agent, two modes: **render** → HTML → `pages_publish` → URL; **build** → workspace → coding agent → PR. Guardrails: never merge, never delete |
| `test/smoke.mjs` | `npm run smoke` — auth → required-tools check → publishes a page → fetches it back → prints `verification URL:` (skips cleanly until you add the key) |
| `scripts/start-host.sh` | `npm run host` — loads `.env`, exports `GH_TOKEN`/`GITHUB_TOKEN`, starts the Superset host daemon that your PRs run through |
| `.env.example`, `.gitignore`, `package.json` | `SUPERSET_API_KEY`, `SUPERSET_MCP_URL`, `GH_TOKEN` |

**To wire it up:**
1. `cp .env.example .env` and drop in your Superset key + GH token
2. Point QM at the layer — set `DEPLOYMENT_LAYER=/Users/kgensupertramp/Desktop/own-your-intelligence/qm/sandbox` in the env you launch the dev instance from (that's the var `src/config.ts:1595` reads; skills auto-seed from `<dir>/skills`)
3. `npm run host` then `npm run smoke` — smoke prints the Pages URL to eyeball
4. Tell the Slack bot: *"render a dark-mode pricing page"* or *"build export-fix in repo X and open a PR"*

One known unknown: if the QM sandbox doesn't inherit `SUPERSET_API_KEY`, `auth-check` fails loudly and tells you — then we wire the key file into the sandbox (QM's `auth.credentialPaths`).

---

## User

how to get superset api key???

---

## Assistant (Build · MiMo-V2.6-Flash Free · 7.0s)

_Thinking:_

The user asks how to get a Superset API key. From the docs I fetched earlier (mcp-server page):

1. Open the Superset desktop app
2. Go to Settings > API Keys
3. Click "Create API Key"
4. Copy the key (starts with sk_live_) — shown once

That's it. Concise answer.

From the Superset desktop app:

1. Open Superset (macOS app)
2. **Settings → API Keys**
3. **Create API Key**
4. Copy the `sk_live_…` key immediately — it's shown only once

Then paste it into your repo `.env` as `SUPERSET_API_KEY=sk_live_…` (same place `npm run smoke` and the QM agent read it from).

Requires you to be signed in (`superset auth login`) and gives full access to your org — keep it out of git (already gitignored).

---

## User

so then tell me what it does for us???

---

## Assistant (Build · MiMo-V2.6-Flash Free · 17.1s)

_Thinking:_

The user asks: "so then tell me what it does for us???" — they want a plain explanation of what this system (what we built) actually does for them, end to end. Concise, concrete walkthrough.

Explain: with the API key + GH token in .env, the whole loop:

1. You talk to your QM Slack bot (already installed).
2. Bot has the principal-engineer skill → uses supersetctl → calls Superset cloud API.
3. Render mode: you say "show me X design" → it writes HTML → publishes a Superset Page → gives you a URL to look at and comment. No code touched.
4. Build mode: you say "build X in repo Y" → it finds your Superset host (your Mac), creates an isolated git worktree workspace, launches a coding agent there with your spec → agent writes code → opens a PR on GitHub using your GH token → you review and merge. Human merges only.
5. Smoke test verifies the pipe works (publishes a test page + URL).

Essentially: a chat-operated software factory front door where Superset does all execution and PRs, GH token = identity, API key = permission for the bot to command Superset. Roles collapsed into one agent.

Keep it short — a small diagram + bullets.

In plain terms — what you got:

```
You (Slack)  →  QM bot + principal-engineer skill
                    ├─ "show me…"  → render mode: HTML mockup → Superset Page URL (no code touched)
                    └─ "build…"    → build mode: new git worktree on your Mac →
                                       coding agent writes it → opens GitHub PR (your GH token)
                                                                    └─ you merge. Never the agents
```

**Concrete value:**

1. **You stop driving the IDE** — you describe a feature/fix/design in chat; the bot does the plumbing (workspace, branch, agent, PR).
2. **Two speeds, one agent** — design proposals come back as a clickable URL in seconds (cheap, no repo mess); "ship it" spins up an isolated worktree so your working tree is never touched.
3. **Every PR is a real PR** — opened under your GitHub identity from `GH_TOKEN`, reviewed and merged by you only. Agents can't merge or delete anything (guardrails in the skill).
4. **The API key is the whole bridge** — it's what lets the QM bot command your Superset machines/tasks/pages. No key = bot can talk but not act.
5. **`npm run smoke` proves the pipe** — publishes a test page and gives you the URL; if you can open it, render mode works end-to-end.

What it does **not** do (v1): auto-merge, create Superset projects (you add a repo once in the Superset app), or run without your Mac's Superset host online for build mode.

---

## User

ebsiten u creatt very simple website csing rtact vite that will be ike                              ┃  simple mathaalgebra solver, make f ature like taking linear equation        Context                 ┃  for add sub m ltiplication and other coplicate dmath but leave out the      0 tokens                   division feature  can u just create a simple, not react but html website with that, and let say i pass the review from the some program and it sboiuld be able to modify that webiste??

---

## Assistant (Build · MiMo-V2.6-Flash Free · 89.0s)

_Thinking:_

The user wants:
1. A simple HTML website (not React, not Vite — plain HTML) — a simple math/algebra solver
2. Features: take linear equations, support add, sub, multiplication, and "other complicated math" but NO division
3. Then: "let's say I pass the review from some program and it should be able to modify that website" — i.e., the pipeline: reviews/feedback input → agent modifies the website (the render/build loop we built).

So build a plain HTML (maybe single file, or small multi-file: index.html + style.css + app.js) math solver:
- Input: linear equation like "2x + 3 = 7" or expression
- Operations: addition, subtraction, multiplication, exponent/parentheses? "other complicated math but leave out division"
- Solve linear equations in one variable.

Also demonstrate the "pass a review → it modifies the website" flow — that's what our principal-engineer skill does (render mode proposes, build mode changes the repo). I should set this up as a small website in the repo, e.g., `apps/math-solver/` (their ARCHITECTURE.md suggests `apps/acmepulse` structure — but user now wants a math site). Put it somewhere: `apps/math-solver/index.html`.

Should it be a single file? "simple, not react but html website" — plain HTML/CSS/JS. Single `index.html` with inline CSS/JS is simplest, or split into 3 files. Their architecture says agent modifies website from reviews. A small split is nicer for a "coding agent to modify" demo but single file is simpler. I'll do single-folder with index.html + app.js + styles.css? Hmm "simple" — I'll do a single self-contained index.html? For an agent-modification demo, multi-file is more realistic. Let me do 3 tiny files: index.html, style.css, solver.js.

Features to implement (no division):
- Parse linear equation: `ax + b = cx + d` → solve for x
- Expression evaluator supporting +, -, *, ^ (power), parentheses, unary minus, variables? For algebra solver: move terms.
- Keep scope sane: linear equations with integer/decimal coefficients, multi-step: distribute? e.g. `2(x + 3) = 4x - 2`. Implement a small expression parser (shunting-yard or recursive descent) that evaluates with a symbol x, then solve linear: compute f(x)=value by evaluating at two points? Clever trick: evaluate LHS and RHS as linear functions of x: value at x=0 and x=1 → slope/intercept → solve. That handles any linear combination including parentheses and multiplication by constants, powers only if exponent constant... `x^2` would break linearity — detect nonlinearity by evaluating at 3 points and checking slope consistency → report "only linear supported".

That's a neat robust approach:
- evalExpr(node, x)
- L(x) = eval LHS, R(x) = eval RHS at x0=0, x1=1, x2=3 (check linearity)
- slope = L(1)-L(0), etc. solve a*x+b = c*x+d → x = (d-b)/(a-c) — division needed in JS but that's internal; "leave out division feature" means the user-facing solver doesn't support division in input equations. Hmm — or maybe they mean don't include division as a supported operation at all (including in input). Safer: input parser rejects `/` with a friendly "division is not supported" message. Internal float division for solving is fine.

Also support "+,-,*,^, parentheses, decimals". "other complicated math" — maybe also functions? Keep: sqrt? sqrt has division inside... keep to arithmetic ops + power + parentheses. Maybe also support multiple variables? No — linear equation in x only.

UI: input box, "Solve" button, steps output (show steps: expand, move terms), error area. Show steps as text lines.

Also second part: "let say i pass the review from some program and it should be able to modify that website" — explain + wire: feed reviews into the QM agent (render/build modes) or via our pipeline. I can demo: write a sample review file? Their factory already has reviews→tickets. Maybe add `reviews/` sample with2 sample reviews about the math site, and instructions: tell the Slack bot "apply these review changes to apps/math-solver" → build mode → PR. Or directly demonstrate by... we don't have tokens yet, so just make the site + a sample review note that can be pasted to the agent.

Keep it lean: 
- `apps/math-solver/{index.html,style.css,solver.js}`
- maybe `apps/math-solver/REVIEWS.sample.md` with sample user reviews? Could be useful for the demo: "left division out" as a review, etc. Hmm — user said "pass the review from some program and it should be able to modify that website" — meaning: they'll pipe reviews (from their factory/gbrain program) into the agent, and agent edits the site → PR. I'll add a short sample reviews file to demo, and answer explains the flow.

Let's build.

solver.js design:

Tokenizer: numbers (digits + .), identifiers (x), operators + - * / ^ ( ), whitespace. Reject `/` → error "division is not supported yet".

Parser (recursive descent):
- expr := term (('+'|'-') term)*
- term := factor (('*') factor)*  — implicit multiplication? e.g. `2x`, `3(x+1)` — support implicit multiplication between number and variable/paren (common in algebra input). Yes: in factor loop, if next token is number/ident/'(' then implicit multiply.
- unary := ('-'|'+') unary- power := primary ('^' unary)?  (right assoc)
- primary := number | 'x' | '(' expr ')'

AST eval with env {x}.

Solve:
```
function solveEquation(input) {
  split on '=' → need exactly one '='
  parse both sides (throws on '/')
  const f = (v) => evalL(v) - evalR(v);  // root of f
  // linearity check: f(0), f(1), f(2)
  const a0=f(0), a1=f(1), a2=f(2);
  const d1=a1-a0, d2=a2-a1;
  if (Math.abs(d1-d2) > 1e-9) → nonlinear or no solution handling
  const slope=d1, intercept=a0;
  if (slope === 0) → intercept===0 ? "all real numbers" : "no solution"
  x = -intercept/slope
}
```

Steps display: show original, show "evaluate as linear" is too abstract. Better human steps: I can produce basic steps by algebra manipulation? Hard generally. Alternative steps: 
- "Substitute x = 0: LHS = …, RHS = …"
Meh. Provide steps: show computed L(x) and R(x) in standard form `ax + b`: slope = a, intercept = b. So steps:
1. Expand both sides → left: `a·x + b`, right: `c·x + d` (from evaluation)
2. Move variable terms: (a−c)x = d − b
3. Solve: x = (d−b)/(a−c) = value
That's legit readable steps derived from the linear coefficients. 

Also standalone expression mode: if no `=`, evaluate expression with... x unknown → can't. If no '=' and contains x → error "enter an equation with =". If no '=' and no x → evaluate arithmetic (with +-*^) and show result. Nice.

Formatting numbers: round to 6 decimals, strip trailing zeros; handle floating noise (0.30000000000000004).

Validation messages: division: "Division isn't supported — remove / from the equation." Nonlinear: "Only linear equations in x are supported (no x²)."

Edge: `x +1 = 3` → x=2 ✓. `2x + 3 = 7` → 2. `2(x+3) = 4x - 2` → 2x+6=4x-2 → x=4 ✓. `x = x + 1` → no solution. `x = x` → all reals.

UI: minimal clean — header, input, button, result panel, steps list, error box. Also small "supported operations" note (+ − × ^, parentheses) and "division: not yet".

Files: write code.

index.html:
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Linear Equation Solver</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
  <h1>Linear Equation Solver</h1>
  <p class="sub">Solve linear equations in <em>x</em>. Supported: + − × powers, parentheses. No division (yet).</p>
  <form id="solver-form">
    <input id="equation" type="text" placeholder="e.g. 2(x + 3) = 4x - 2" autocomplete="off" autofocus>
    <button type="submit">Solve</button>
  </form>
  <div id="error" class="error" hidden></div>
  <div id="result" class="result" hidden>
    <div class="solution"></div>
    <ol class="steps"></ol>
  </div>
</main>
<script src="solver.js"></script>
</body>
</html>
```

style.css: simple modern, centered card, system font, maybe dark accents.

solver.js: tokenizer/parser/solver + DOM wiring.

Then sample review file: `apps/math-solver/reviews.sample.md` with 2-3 sample "reviews" (e.g., "would love a step-by-step toggle", "support equations like 3x - 5 = 10 quickly", "show coefficient form"). And explain: pipe to agent → build mode → PR.

Also maybe a tiny local server instruction: `npx serve` or just open file. Opening index.html directly works (no modules, plain script). Fine.

Write the files now. Also careful: no division anywhere user-facing — but solver needs division for x = (d-b)/(a-c). That's internal math. If they literally mean the site shouldn't divide... can't solve otherwise. Fine.

Actually wait — should I also implement multiplication display "×"? display uses ×.

Let me write solver.js carefully.

```js
(function () {
  "use strict";

  function tokenize(src) {
    const tokens = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === "/") throw new Error("Division isn't supported yet — take the / out of your equation.");
      if (/[0-9.]/.test(c)) {
        let j = i;
        while (j < src.length && /[0-9.]/.test(src[j])) j++;
        const raw = src.slice(i, j);
        if ((raw.match(/\./g) || []).length > 1 || raw === ".") throw new Error(`"${raw}" is not a valid number.`);
        tokens.push({ type: "num", value: parseFloat(raw) });
        i = j; continue;
      }
      if (/[a-zA-Z]/.test(c)) {
        const name = c.toLowerCase();
        if (name !== "x") throw new Error(`Unknown variable "${c}" — only x is supported.`);
        tokens.push({ type: "var" });
        i++; continue;
      }
      if ("+-*^()".includes(c)) { tokens.push({ type: c }); i++; continue; }
      throw new Error(`Unexpected character "${c}".`);
    }
    return tokens;
  }

  parser with index...
```

implicit multiplication: in parseTerm after parsing a factor, loop: if next token type is num/var/'(' → multiply. Else if '*' consume. Both allowed.

Power: right-assoc, binds tighter than unary? Standard: -x^2 = -(x^2). Implement unary → parses ('-'|'+') unary | power; power → primary ('^' unary)?

Grammar:
```
expr := term (('+'|'-') term)*
term    := unaryOrPower ( ('*' | implicit) unaryOrPower )*
unary   := ('-'|'+') unary | power
power   := primary ('^' unary)?
primary := num | var | '(' expr ')'
```
term calls unary. implicit: after first operand, while next in {num,var,'('} → treat as '*'.

eval(node, x).

linearCoeffs via sampling as planned. Guard: f values must be finite.

Steps generation:
```
const L = (v)=>evalTree(lhs,v), R = ...
const f = v => L(v)-R(v);
f0=f(0), f1=f(1), f2=f(2)
if (!isFinite...) 
d1=f1-f0, d2=f2-f1
if (|d1-d2| > 1e-9 * max(1,|d1|,|d2|)) → nonlinear error
slope = d1; intercept = f0;
// coefficients: L: a=vL(1)-vL(0), b=vL(0); R similarly for display steps
```
For steps display use a,b,c,d:
a = L(1)-L(0), b = L(0), c = R(1)-R(0), d = R(0).

Steps:
1. `Left side simplifies to: a·x + b` (format: formatLinear(a,b))
2. `Right side simplifies to: c·x + d`
3. `Subtract right from left: (a−c)·x = d−b` → format4. If a−c === 0 ... solution handling
5. `x = (d−b) / (a−c) = result` — show fraction with÷? Display as fraction num/den with÷ symbol: `x = 6 ÷ 2 = 3`? "leave out division feature" is about equation input; showing division in steps is fine but maybe avoid confusion; show `x = value` and intermediate line `(d−b) = (a−c)·x`.

Simpler steps:
1. Left → `2·x + 6`
2. Right → `4·x - 2`
3. Move everything left: `(2 - 4)·x = -2 - 6` → `-2·x = -8`
4. `x = 4`

Good. Format numbers: fmt(n): round 1e-9, if near integer show integer.

Linearity fail message: "That doesn't look linear in x — try something like 2x + 3 = 7 (powers of x aren't supported yet)."

If slope0 & intercept 0 → "x = any real number (identity)". slope 0 else "No solution".

Expression-only mode (no '='): if tokens contain var → error "Add an = … to make it an equation." else eval at no x? eval with x=0 works (no var) → show `= value`. Also check for '/' → error (handled in tokenize).

DOM wiring: form submit → solve() → render.

Write files.

REVIEWS sample: `apps/math-solver/reviews.sample.md`:
```
# Sample reviews (feed these to the agent)

> "The placeholder is hard to read on mobile, make the input bigger."
> "Would love it to accept − (unicode minus)."
> "Step3 shows fractions like -8 / -2 — confusing, write it as a single number."
...
```
Hmm keep3 realistic review lines the agent could turn into PRs.

And explain the flow in final message: paste review to Slack bot → build mode → Superset workspace → PR modifies apps/math-solver.

Let me write the files.

**Tool: write**

**Input:**
```json
{
  "content": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Linear Equation Solver</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Linear Equation Solver</h1>\n    <p class=\"sub\">Solve a linear equation in <em>x</em>. Supports <strong>+ − ×</strong>, powers, and parentheses. Division is not supported yet.</p>\n\n    <form id=\"solver-form\" autocomplete=\"off\">\n      <input id=\"equation\" type=\"text\" placeholder=\"e.g. 2(x + 3) = 4x - 2\" autofocus>\n      <button type=\"submit\">Solve</button>\n    </form>\n\n    <div id=\"error\" class=\"error\" hidden></div>\n\n    <div id=\"result\" class=\"result\" hidden>\n      <div class=\"solution\"></div>\n      <ol class=\"steps\"></ol>\n    </div>\n  </main>\n\n  <script src=\"solver.js\"></script>\n</body>\n</html>\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/apps/math-solver/index.html"
}
```

**Output:**
```
Wrote file successfully.
```

**Tool: write**

**Input:**
```json
{
  "content": ":root {\n  --bg: #f4f5f7;\n  --card: #ffffff;\n  --ink: #16181d;\n  --muted: #6b7280;\n  --accent: #2563eb;\n  --accent-ink: #ffffff;\n  --error-bg: #fef2f2;\n  --error-ink: #b91c1c;\n  --ok-bg: #eff6ff;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  background: var(--bg);\n  color: var(--ink);\n  font-family: system-ui, -apple-system, \"Segoe UI\", sans-serif;\n}\n\n.card {\n  width: 100%;\n  max-width: 34rem;\n  background: var(--card);\n  border: 1px solid #e5e7eb;\n  border-radius: 14px;\n  padding: 2rem;\n  box-shadow: 0 10px 30px rgb(0 0 0 / 6%);\n}\n\nh1 {\n  margin: 0 0 0.4rem;\n  font-size: 1.5rem;\n}\n\n.sub {\n  margin: 0 0 1.4rem;\n  color: var(--muted);\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n\nform {\n  display: flex;\n  gap: 0.6rem;\n}\n\ninput {\n  flex: 1;\n  min-width: 0;\n  padding: 0.75rem 0.9rem;\n  font-size: 1.05rem;\n  font-family: ui-monospace, \"SF Mono\", Menlo, monospace;\n  border: 1px solid #d1d5db;\n  border-radius: 9px;\n  background: #fafafa;\n}\n\ninput:focus {\n  outline: 2px solid var(--accent);\n  outline-offset: 1px;\n  background: #fff;\n}\n\nbutton {\n  padding: 0 1.3rem;\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--accent-ink);\n  background: var(--accent);\n  border: none;\n  border-radius: 9px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #1d4ed8;\n}\n\n.error {\n  margin-top: 1rem;\n  padding: 0.8rem 1rem;\n  background: var(--error-bg);\n  color: var(--error-ink);\n  border: 1px solid #fecaca;\n  border-radius: 9px;\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n\n.result {\n  margin-top: 1.2rem;\n  padding: 1.1rem 1.2rem;\n  background: var(--ok-bg);\n  border: 1px solid #bfdbfe;\n  border-radius: 9px;\n}\n\n.solution {\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: var(--accent);\n}\n\n.steps {\n  margin: 0.9rem 0 0;\n  padding-left: 1.3rem;\n  color: var(--ink);\n  font-family: ui-monospace, \"SF Mono\", Menlo, monospace;\n  font-size: 0.95rem;\n  line-height: 1.9;\n}\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/apps/math-solver/style.css"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 25.7s)

_Thinking:_

Now solver.js — the core.

**Tool: write**

**Input:**
```json
{
  "content": "(function () {\n  \"use strict\";\n\n  function tokenize(src) {\n    const tokens = [];\n    let i = 0;\n    while (i < src.length) {\n      const c = src[i];\n      if (/\\s/.test(c)) {\n        i++;\n        continue;\n      }\n      if (c === \"/\") {\n        throw new Error(\"Division isn't supported yet — remove the / from your input.\");\n      }\n      if (/[0-9.]/.test(c)) {\n        let j = i;\n        while (j < src.length && /[0-9.]/.test(src[j])) j++;\n        const raw = src.slice(i, j);\n        const dots = (raw.match(/\\./g) || []).length;\n        if (dots > 1 || raw === \".\") throw new Error(\"\\\"\" + raw + \"\\\" is not a valid number.\");\n        tokens.push({ type: \"num\", value: parseFloat(raw) });\n        i = j;\n        continue;\n      }\n      if (/[a-zA-Z]/.test(c)) {\n        if (c.toLowerCase() !== \"x\") {\n          throw new Error(\"Unknown variable \\\"\" + c + \"\\\" — only x is supported.\");\n        }\n        tokens.push({ type: \"var\" });\n        i++;\n        continue;\n      }\n      if (\"+-*^()\".indexOf(c) !== -1) {\n        tokens.push({ type: c });\n        i++;\n        continue;\n      }\n      throw new Error(\"Unexpected character \\\"\" + c + \"\\\".\");\n    }\n    return tokens;\n  }\n\n  function parse(tokens) {\n    let pos = 0;\n\n    function peek() {\n      return tokens[pos];\n    }\n\n    function eat(type) {\n      if (peek() && peek().type === type) {\n        pos++;\n        return true;\n      }\n      return false;\n    }\n\n    function parseExpr() {\n      let node = parseTerm();\n      while (peek() && (peek().type === \"+\" || peek().type === \"-\")) {\n        const op = tokens[pos++].type;\n        node = { kind: op, left: node, right: parseTerm() };\n      }\n      return node;\n    }\n\n    function startsOperand() {\n      const t = peek();\n      return t && (t.type === \"num\" || t.type === \"var\" || t.type === \"(\");\n    }\n\n    function parseTerm() {\n      let node = parseUnary();\n      for (;;) {\n        if (eat(\"*\")) {\n          node = { kind: \"*\", left: node, right: parseUnary() };\n        } else if (startsOperand()) {\n          node = { kind: \"*\", left: node, right: parseUnary() };\n        } else {\n          return node;\n        }\n      }\n    }\n\n    function parseUnary() {\n      if (peek() && (peek().type === \"-\" || peek().type === \"+\")) {\n        const op = tokens[pos++].type;\n        const operand = parseUnary();\n        return op === \"-\" ? { kind: \"neg\", operand: operand } : operand;\n      }\n      return parsePower();\n    }\n\n    function parsePower() {\n      const base = parsePrimary();\n      if (eat(\"^\")) {\n        return { kind: \"^\", base: base, exponent: parseUnary() };\n      }\n      return base;\n    }\n\n    function parsePrimary() {\n      const t = peek();\n      if (!t) throw new Error(\"The equation ends too early.\");\n      if (t.type === \"num\") {\n        pos++;\n        return { kind: \"num\", value: t.value };\n      }\n      if (t.type === \"var\") {\n        pos++;\n        return { kind: \"var\" };\n      }\n      if (t.type === \"(\") {\n        pos++;\n        const inner = parseExpr();\n        if (!eat(\")\")) throw new Error(\"Missing a closing parenthesis.\");\n        return inner;\n      }\n      throw new Error(\"Unexpected \\\"\" + t.type + \"\\\" in the equation.\");\n    }\n\n    const tree = parseExpr();\n    if (pos < tokens.length) {\n      throw new Error(\"Unexpected \\\"\" + tokens[pos].type + \"\\\" in the equation.\");\n    }\n    return tree;\n  }\n\n  function evalTree(node, x) {\n    switch (node.kind) {\n      case \"num\":\n        return node.value;\n      case \"var\":\n        return x;\n      case \"neg\":\n        return -evalTree(node.operand, x);\n      case \"+\":\n        return evalTree(node.left, x) + evalTree(node.right, x);\n      case \"-\":\n        return evalTree(node.left, x) - evalTree(node.right, x);\n      case \"*\":\n        return evalTree(node.left, x) * evalTree(node.right, x);\n      case \"^\":\n        return Math.pow(evalTree(node.base, x), evalTree(node.exponent, x));\n      default:\n        throw new Error(\"Internal error: unknown node.\");\n    }\n  }\n\n  function fmt(n) {\n    if (Math.abs(n) < 1e-9) n = 0;\n    const rounded = Math.round(n * 1e9) / 1e9;\n    return String(rounded);\n  }\n\n  function linearForm(a, b) {\n    const parts = [];\n    if (a !== 0) {\n      parts.push(a === 1 ? \"x\" : a === -1 ? \"-x\" : fmt(a) + \"x\");\n    }\n    if (b !== 0 || parts.length === 0) {\n      parts.push(fmt(b));\n    }\n    return parts.join(\" + \").replace(/\\+ -/g, \"- \");\n  }\n\n  function solve(input) {\n    const src = String(input).replace(/−/g, \"-\").replace(/×/g, \"*\").trim();\n    if (!src) throw new Error(\"Type an equation first, e.g. 2x + 3 = 7.\");\n    if (src.indexOf(\"=\") === -1) {\n      const hasVar = tokenize(src).some(function (t) {\n        return t.type === \"var\";\n      });\n      if (hasVar) throw new Error(\"Add an \\\"=\\\" to make it an equation, e.g. 2x + 3 = 7.\");\n      const value = evalTree(parse(tokenize(src)), 0);\n      return { solution: fmt(value), steps: [\"Just arithmetic — the value is \" + fmt(value) + \".\"] };\n    }\n\n    const sides = src.split(\"=\");\n    if (sides.length !== 2) throw new Error(\"Use exactly one \\\"=\\\" sign.\");\n    const left = parse(tokenize(sides[0]));\n    const right = parse(tokenize(sides[1]));\n\n    const L = function (v) {\n      return evalTree(left, v);\n    };\n    const R = function (v) {\n      return evalTree(right, v);\n    };\n    const f = function (v) {\n      return L(v) - R(v);\n    };\n\n    const a = L(1) - L(0);\n    const b = L(0);\n    const c = R(1) - R(0);\n    const d = R(0);\n\n    const d1 = f(1) - f(0);\n    const d2 = f(2) - f(1);\n    const tolerance = 1e-9 * Math.max(1, Math.abs(d1), Math.abs(d2));\n    if (!isFinite(f(0)) || !isFinite(f(1)) || !isFinite(f(2)) || Math.abs(d1 - d2) > tolerance) {\n      throw new Error(\"That doesn't look linear in x — powers of x (like x²) aren't supported yet. Try something like 2x + 3 = 7.\");\n    }\n\n    const steps = [\n      \"Left side simplifies to:  \" + linearForm(a, b),\n      \"Right side simplifies to: \" + linearForm(c, d),\n    ];\n\n    const coeff = a - c;\n    const constTerm = d - b;\n    steps.push(\"Move everything to one side:  \" + linearForm(coeff, 0) + \" = \" + fmt(constTerm));\n\n    if (Math.abs(coeff) < 1e-9) {\n      if (Math.abs(constTerm) < 1e-9) {\n        return { solution: \"x = any real number\", steps: steps.concat([\"Both sides are identical — every x works.\"]) };\n      }\n      return { solution: \"No solution\", steps: steps.concat([\"The x terms cancel but the constants differ.\"]) };\n    }\n\n    const x = constTerm / coeff;\n    steps.push(\"x = \" + fmt(constTerm) + \" ÷ \" + fmt(coeff) + \" = \" + fmt(x));\n    return { solution: \"x = \" + fmt(x), steps: steps };\n  }\n\n  const form = document.getElementById(\"solver-form\");\n  const input = document.getElementById(\"equation\");\n  const errorBox = document.getElementById(\"error\");\n  const resultBox = document.getElementById(\"result\");\n  const solutionBox = resultBox.querySelector(\".solution\");\n  const stepsList = resultBox.querySelector(\".steps\");\n\n  form.addEventListener(\"submit\", function (event) {\n    event.preventDefault();\n    errorBox.hidden = true;\n    resultBox.hidden = true;\n    try {\n      const out = solve(input.value);\n      solutionBox.textContent = out.solution;\n      stepsList.innerHTML = \"\";\n      out.steps.forEach(function (step) {\n        const li = document.createElement(\"li\");\n        li.textContent = step;\n        stepsList.appendChild(li);\n      });\n      resultBox.hidden = false;\n    } catch (err) {\n      errorBox.textContent = err.message;\n      errorBox.hidden = false;\n    }\n  });\n})();\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/apps/math-solver/solver.js"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 17.8s)

_Thinking:_

Now verify solver logic with node by extracting the pure functions. solver.js is an IIFE that touches DOM at the bottom — running under node fails at `document`. For testing, I can write a quick test that stubs `document`... simpler: node test with a minimal DOM stub, or refactor: guard DOM wiring with `typeof document !== "undefined"`. Better for testability: wrap DOM wiring in `if (typeof document !== "undefined")`. Then I can `import`? It's not a module — IIFE without exports. For a quick test, run node with stub: create test that reads file, evals with a fake document... 

Simplest: make the DOM section conditional and expose `solve` on globalThis when present? Slight code smell but useful: `if (typeof document === "undefined") { globalThis.__solve = solve; return; }` Hmm.

Cleaner: keep IIFE; in test, stub minimal document object with getElementById returning objects with addEventListener no-op and querySelector returning stubs. solver.js only touches document at the bottom; with stub it runs fine, and solve isn't exported... but I can grab it if I expose: add at end `if (typeof module !== "undefined") module.exports = { solve };`? It's a browser plain script — `module` undefined in browser, fine. But comments/style... Their repo rule: zero comments. module.exports guard is code, not comment.

Actually simplest robust: at the end of IIFE:```js
if (typeof globalThis !== "undefined") globalThis.solveEquation = solve;
```
Hmm polluting globals in browser — acceptable? It's a tiny site; exposes solveEquation — fine and even handy.

But DOM wiring runs before that and would crash under node (document undefined). So guard:

```js
if (typeof document !== "undefined") { ...wire DOM... }
globalThis.solveEquation = solve;
```

Let me restructure the bottom accordingly, then write a quick throwaway test in /tmp running node with several equations.

**Tool: edit**

**Input:**
```json
{
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/apps/math-solver/solver.js",
  "newString": "  if (typeof document !== \"undefined\") {\n    const form = document.getElementById(\"solver-form\");\n    const input = document.getElementById(\"equation\");\n    const errorBox = document.getElementById(\"error\");\n    const resultBox = document.getElementById(\"result\");\n    const solutionBox = resultBox.querySelector(\".solution\");\n    const stepsList = resultBox.querySelector(\".steps\");\n\n    form.addEventListener(\"submit\", function (event) {\n      event.preventDefault();\n      errorBox.hidden = true;\n      resultBox.hidden = true;\n      try {\n        const out = solve(input.value);\n        solutionBox.textContent = out.solution;\n        stepsList.innerHTML = \"\";\n        out.steps.forEach(function (step) {\n          const li = document.createElement(\"li\");\n          li.textContent = step;\n          stepsList.appendChild(li);\n        });\n        resultBox.hidden = false;\n      } catch (err) {\n        errorBox.textContent = err.message;\n        errorBox.hidden = false;\n      }\n    });\n  }\n\n  if (typeof globalThis !== \"undefined\") {\n    globalThis.solveEquation = solve;\n  }\n})();",
  "oldString": "  const form = document.getElementById(\"solver-form\");\n  const input = document.getElementById(\"equation\");\n  const errorBox = document.getElementById(\"error\");\n  const resultBox = document.getElementById(\"result\");\n  const solutionBox = resultBox.querySelector(\".solution\");\n  const stepsList = resultBox.querySelector(\".steps\");\n\n  form.addEventListener(\"submit\", function (event) {\n    event.preventDefault();\n    errorBox.hidden = true;\n    resultBox.hidden = true;\n    try {\n      const out = solve(input.value);\n      solutionBox.textContent = out.solution;\n      stepsList.innerHTML = \"\";\n      out.steps.forEach(function (step) {\n        const li = document.createElement(\"li\");\n        li.textContent = step;\n        stepsList.appendChild(li);\n      });\n      resultBox.hidden = false;\n    } catch (err) {\n      errorBox.textContent = err.message;\n      errorBox.hidden = false;\n    }\n  });\n})();"
}
```

**Output:**
```
Edit applied successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 25.1s)

_Thinking:_

Now test the solver logic under node with a batch of cases.

Cases:
- "2x + 3 = 7" → x = 2
- "2(x + 3) = 4x - 2" → x = 4
- "x - 5 = 10" → 15
- "3x = 9" → 3
- "-2x + 4 = 10" → -3
- "x^2 = 4" → error nonlinear
- "x/2 = 3" → division error
- "5 = 5" → any real number
- "2x = 2x + 1" → no solution
- "0.5x + 1 = 4" → 6
- "x × 3 + 2 = 11" → 3 (unicode ×)
- "10 = 2x + 4" → 3
- "2x+3=7" no spaces
- "(x + 1)(x + 2) = 2" → nonlinear? (x+1)(x+2)=x²+3x+2 → nonlinear error ✓
- arithmetic: "2 * (3 + 4)" → 21Write /tmp/test-solver.mjs that loads file via fs + eval? File uses `globalThis.solveEquation = solve` — I can just `await import(path)`? It's not a module (no exports) but importing a script file executes it and sets globalThis.solveEquation. `import` of a path — works with file URL: `await import("file:///...solver.js")`. Then use globalThis.solveEquation.

**Tool: bash**

**Input:**
```json
{
  "command": "cat > /tmp/test-solver.mjs <<'EOF'\nimport { pathToFileURL } from \"node:url\";\nawait import(pathToFileURL(\"/Users/kgensupertramp/Desktop/own-your-intelligence/apps/math-solver/solver.js\"));\nconst solve = globalThis.solveEquation;\n\nconst cases = [\n  [\"2x + 3 = 7\", \"x = 2\"],\n  [\"2(x + 3) = 4x - 2\", \"x = 4\"],\n  [\"x - 5 = 10\", \"x = 15\"],\n  [\"3x = 9\", \"x = 3\"],\n  [\"-2x + 4 = 10\", \"x = -3\"],\n  [\"0.5x + 1 = 4\", \"x = 6\"],\n  [\"10 = 2x + 4\", \"x = 3\"],\n  [\"2x+3=7\", \"x = 2\"],\n  [\"x × 3 + 2 = 11\", \"x = 3\"],\n  [\"x − 5 = 10\", \"x = 15\"],\n  [\"4x + 2 = 2x + 10\", \"x = 4\"],\n  [\"5 = 5\", \"x = any real number\"],\n  [\"2x = 2x + 1\", \"No solution\"],\n  [\"2 * (3 + 4)\", \"21\"],\n  [\"2^3 + 1\", \"9\"],\n];\nconst errors = [\n  [\"x/2 = 3\", /Division/],\n  [\"x^2 = 4\", /linear/],\n  [\"(x + 1)(x + 2) = 2\", /linear/],\n  [\"y + 1 = 2\", /variable/],\n  [\"2x + 3\", /Add an \"=\"|arithmetic/],\n  [\"2x + = 7\", /ends too early|Unexpected/],\n];\n\nlet failed = 0;\nfor (const [input, want] of cases) {\n  let got;\n  try { got = solve(input).solution; } catch (e) { got = \"THREW: \" + e.message; }\n  const pass = got === want;\n  if (!pass) failed++;\n  console.log(`${pass ? \"ok  \" : \"FAIL\"}  ${JSON.stringify(input)} -> ${got}${pass ? \"\" : ` (want ${want})`}`);\n}\nfor (const [input, re] of errors) {\n  let got;\n  try { got = solve(input).solution; } catch (e) { got = e.message; }\n  const pass = re.test(got);\n  if (!pass) failed++;\n  console.log(`${pass ? \"ok  \" : \"FAIL\"}  ${JSON.stringify(input)} -> error: ${got}`);\n}\nconst steps = solve(\"2(x + 3) = 4x - 2\").steps;\nconsole.log(\"\\nsteps for 2(x+3)=4x-2:\");\nsteps.forEach(s => console.log(\"  \" + s));\nprocess.exit(failed ? 1 : 0);\nEOF\nnode /tmp/test-solver.mjs; echo \"exit=$?\""
}
```

**Output:**
```
ok    "2x + 3 = 7" -> x = 2
ok    "2(x + 3) = 4x - 2" -> x = 4
ok    "x - 5 = 10" -> x = 15
ok    "3x = 9" -> x = 3
ok    "-2x + 4 = 10" -> x = -3
ok    "0.5x + 1 = 4" -> x = 6
ok    "10 = 2x + 4" -> x = 3
ok    "2x+3=7" -> x = 2
ok    "x × 3 + 2 = 11" -> x = 3
ok    "x − 5 = 10" -> x = 15
ok    "4x + 2 = 2x + 10" -> x = 4
ok    "5 = 5" -> x = any real number
ok    "2x = 2x + 1" -> No solution
FAIL  "2 * (3 + 4)" -> 14 (want 21)
ok    "2^3 + 1" -> 9
ok    "x/2 = 3" -> error: Division isn't supported yet — remove the / from your input.
ok    "x^2 = 4" -> error: That doesn't look linear in x — powers of x (like x²) aren't supported yet. Try something like 2x + 3 = 7.
ok    "(x + 1)(x + 2) = 2" -> error: That doesn't look linear in x — powers of x (like x²) aren't supported yet. Try something like 2x + 3 = 7.
ok    "y + 1 = 2" -> error: Unknown variable "y" — only x is supported.
ok    "2x + 3" -> error: Add an "=" to make it an equation, e.g. 2x + 3 = 7.
ok    "2x + = 7" -> error: The equation ends too early.

steps for 2(x+3)=4x-2:
  Left side simplifies to:  2x + 6
  Right side simplifies to: 4x - 2
  Move everything to one side:  -2x = -8
  x = -8 ÷ -2 = 4
exit=1

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 19.1s)

_Thinking:_

Only "failure" is my test expectation error: `2 * (3 + 4)` = 14? 2*7=14. I wrote want 21 wrongly (that's 3*7). 14 is correct! Fix test expectation — solver is right.

All good. Now the review-driven modification part: add a sample reviews file demonstrating the loop, and explain how it works with the pipeline.

Let me also quickly render-check? Can't screenshot easily. Could open with a headless check... skip; HTML/CSS is simple.

Create `apps/math-solver/reviews.sample.md` — sample reviews to feed the agent. Their factory mints tickets from reviews; the loop: reviews → agent → PR modifying this site.

Content: a few review-style quotes + one-line "how to run the loop".

Then final answer: explain site, how to open, test results, and the review→modify loop (paste review into Slack bot → build mode → PR touching apps/math-solver; render mode to preview first).

The "failure" was my test's expectation (2×7=14 is correct — the solver is right, my expected value was wrong). Fixing the test and adding the sample review file:

**Tool: bash**

**Input:**
```json
{
  "command": "sed -i '' 's/\\[\"2 \\* (3 + 4)\", \"21\"\\]/[\"2 * (3 + 4)\", \"14\"]/' /tmp/test-solver.mjs && node /tmp/test-solver.mjs | tail -3; echo \"exit=$?\""
}
```

**Output:**
```
  Right side simplifies to: 4x - 2
  Move everything to one side:  -2x = -8
  x = -8 ÷ -2 = 4
exit=0

```

**Tool: write**

**Input:**
```json
{
  "content": "# Sample reviews → website changes\n\nPaste any of these to the QM Slack bot to exercise the loop against `apps/math-solver/`.\n\n> \"On mobile the input field is tiny and the Solve button wraps to its own line. Make the form stack vertically on small screens.\"\n\n> \"Users keep typing division like 10/2 and getting an error. Show a hint under the input listing what IS supported, so the error is less surprising.\"\n\n> \"The steps say 'x = -8 ÷ -2 = 4'. Rewrite that last line so the result appears first, then the arithmetic that got there.\"\n\n## The loop\n\n1. **Preview** — end the message with \"show me a mockup first\" → agent runs render mode → you get a Superset Pages URL.\n2. **Ship** — say \"apply it and open a PR\" → agent runs build mode → Superset workspace on this repo → coding agent edits `apps/math-solver/` → PR lands via your `GH_TOKEN` → you merge.\n\nReviews from your factory pipeline (gbrain/tickets) work the same way — hand the agent the review text and the path `apps/math-solver`.\n",
  "filePath": "/Users/kgensupertramp/Desktop/own-your-intelligence/apps/math-solver/reviews.sample.md"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 14.1s)

_Thinking:_

All 21 tests pass. Done. Summarize concisely:

- Files: apps/math-solver/{index.html, style.css, solver.js, reviews.sample.md}
- Plain HTML/CSS/JS, no build step, open index.html
- Features: linear equations, + − × ^ parens, implicit multiplication (2x, 3(x+1)), unicode −/×, decimals; NO division (clear error); nonlinearity detected; no-solution/identity cases; steps shown
- Tests: 21 cases pass
- Review loop: paste sample review to bot → render/build → PR

Done. Plain HTML/CSS/JS — no React, no Vite, no build step. Open `apps/math-solver/index.html` in a browser.

**Files:** `apps/math-solver/{index.html, style.css, solver.js, reviews.sample.md}`

**What it does:**
- Linear equations: `2x + 3 = 7`, `2(x + 3) = 4x - 2`, `10 = 2x + 4` → shows steps + `x = …`
- Supports: `+ − ×`, powers `^`, parentheses, decimals, implicit multiplication (`2x`, `3(x+1)`), unicode `−`/`×`
- **No division** — typing `/` gives a clear error
- Also handles: non-linear input (`x²` → friendly rejection), `No solution`, `x = any real number`, plain arithmetic mode
- Verified: **21/21 test cases pass** (ran the solver logic under node)

**The review → modify loop** (your second question): yes — that's exactly what the pipeline we built does:

1. Paste a review (samples in `apps/math-solver/reviews.sample.md`) to the QM Slack bot: *"...show me a mockup first"* → **render mode** → Superset Pages URL
2. Then *"apply it and open a PR"* → **build mode** → Superset workspace edits `apps/math-solver/` → PR via your `GH_TOKEN` → you merge

---

## User

so how does this works or will work??? how to test this

---

## Assistant (Build · MiMo-V2.6-Flash Free · 16.2s)

_Thinking:_

The user asks: how does this work / will work, and how to test it. They want the practical end-to-end explanation + test steps.

Current state:
- Code written: QM layer (skill + supersetctl), math-solver website, smoke test, start-host script
- Tokens NOT yet added (.env empty)
- QM dev instance not running; DEPLOYMENT_LAYER not wired- Superset app/host status unknown

I should lay out the flow (what happens at each step when they use it) and then concrete test steps in order, from zero to full loop. Maybe I can check what's running/installed right now to tailor steps (superset CLI present? .env present? QM instance?). Quick checks are read-only, fine.

Let me check: superset on PATH / app installed, .env existence, gh auth, node. Then give ordered steps.

**Tool: bash**

**Input:**
```json
{
  "command": "ls -la .env 2>/dev/null || echo \"no .env\"; command -v superset || ls ~/.superset/bin 2>/dev/null || echo \"superset CLI not found\"; command -v gh && gh auth status 2>&1 | head -5; ps aux | grep -iE \"superset|dev-instance|qm\" | grep -v grep | head -5 || true",
  "workdir": "/Users/kgensupertramp/Desktop/own-your-intelligence"
}
```

**Output:**
```
no .env
amp
claude
codex
copilot
cursor-agent
devin
droid
gemini
grok
kimi
mastracode
muse
opencode
superset
vibe
/Users/kgensupertramp/.local/bin/gh
You are not logged into any GitHub hosts. To log in, run: gh auth login
kgensupertramp   20527   0.0  2.7 1489042896 226432   ??  S     4:04PM   0:03.60 /Applications/Superset.app/Contents/Frameworks/Superset Helper (Renderer).app/Contents/MacOS/Superset Helper (Renderer) --type=renderer --user-data-dir=/Users/kgensupertramp/Library/Application Support/Superset --standard-schemes=superset-icon,superset-font --secure-schemes=superset-icon,superset-font --bypasscsp-schemes=superset-icon,superset-font --fetch-schemes=superset-icon,superset-font --app-path=/Applications/Superset.app/Contents/Resources/app.asar --enable-sandbox --force-color-profile=srgb --max-active-webgl-contexts=256 --lang=en-GB --num-raster-threads=2 --enable-zero-copy --enable-gpu-memory-buffer-compositor-resources --enable-main-frame-before-activation --renderer-client-id=4 --time-ticks-at-unix-epoch=-1790533285174998 --launch-time-ticks=17004878092 --shared-files --field-trial-handle=1718379636,r,3616347536412777255,9028856293156192473,262144 --enable-features=PdfUseShowSaveFilePicker --disable-features=DropInputEventsWhilePaintHolding,LocalNetworkAccessChecks,ScreenAIOCREnabled,SpareRendererForSitePerProcess,TraceSiteInstanceGetProcessCreation --variations-seed-version --pseudonymization-salt-handle=1935764596,r,8169779552484328644,3571607717037483052,4 --trace-process-track-uuid=3190708990060038890 --seatbelt-client=77
kgensupertramp   20398   0.0  1.4 1488989700 114764   ??  Ss    4:04PM   0:01.12 /Applications/Superset.app/Contents/MacOS/Superset /Applications/Superset.app/Contents/Resources/app.asar/dist/main/terminal-host.js
kgensupertramp   20351   0.0  0.0 83975848   3600   ??  S     4:04PM   0:00.03 /Applications/Superset.app/Contents/Frameworks/Electron Framework.framework/Helpers/chrome_crashpad_handler --no-rate-limit --monitor-self-annotation=ptype=crashpad-handler --database=/Users/kgensupertramp/Library/Application Support/Superset/Crashpad --url=https://f.a.k/e --annotation=_productName=Superset --annotation=_version=1.30.2 --annotation=plat=OS X --annotation=prod=Electron --annotation=ver=41.10.3 --handshake-fd=54
kgensupertramp   20278   0.0  0.5 84339568  40756   ??  S     4:04PM   0:00.58 /Applications/Superset.app/Contents/Frameworks/Superset Helper.app/Contents/MacOS/Superset Helper --type=utility --utility-sub-type=network.mojom.NetworkService --lang=en-GB --service-sandbox-type=network --user-data-dir=/Users/kgensupertramp/Library/Application Support/Superset --standard-schemes=superset-icon,superset-font --secure-schemes=superset-icon,superset-font --bypasscsp-schemes=superset-icon,superset-font --fetch-schemes=superset-icon,superset-font --shared-files --field-trial-handle=1718379636,r,3616347536412777255,9028856293156192473,262144 --enable-features=PdfUseShowSaveFilePicker --disable-features=DropInputEventsWhilePaintHolding,LocalNetworkAccessChecks,ScreenAIOCREnabled,SpareRendererForSitePerProcess,TraceSiteInstanceGetProcessCreation --variations-seed-version --pseudonymization-salt-handle=1935764596,r,8169779552484328644,3571607717037483052,4 --trace-process-track-uuid=3190708989122997041 --seatbelt-client=40
kgensupertramp   20275   0.0  0.5 84395908  40836   ??  S     4:04PM   0:00.69 /Applications/Superset.app/Contents/Frameworks/Superset Helper.app/Contents/MacOS/Superset Helper --type=gpu-process --user-data-dir=/Users/kgensupertramp/Library/Application Support/Superset --gpu-preferences=SAAAAAAAAAAgAQAEAAAAAAAAAAAAAGAAAwAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAACAAAAAAAAAAIAAAAAAAAAA== --shared-files --field-trial-handle=1718379636,r,3616347536412777255,9028856293156192473,262144 --enable-features=PdfUseShowSaveFilePicker --disable-features=DropInputEventsWhilePaintHolding,LocalNetworkAccessChecks,ScreenAIOCREnabled,SpareRendererForSitePerProcess,TraceSiteInstanceGetProcessCreation --variations-seed-version --pseudonymization-salt-handle=1935764596,r,8169779552484328644,3571607717037483052,4 --trace-process-track-uuid=3190708988185955192 --seatbelt-client=40

```

---

## Assistant (Build · MiMo-V2.6-Flash Free · 22.9s)

_Thinking:_

State:
- Superset.app IS running (v1.30.2), CLI shim exists at ~/.superset/bin/superset
- gh installed but NOT logged in, no .env yet
- No QM dev instance running
- No .env

So the honest current status: pieces exist, tokens missing, QM layer not wired, gh not authed.

Give the user:
1. How it works — the flow in6 steps (what happens when they say something)
2. How to test — layered, from cheap to full E2E, with exact commands and expected outputs, noting current blockers:
   - T0 (now): math site itself: open index.html; solver tests pass already
   - T1: add key → npm run smoke → verification URL (tests Superset API pipe; needs SUPERSET_API_KEY)
   - T2: GH: .env GH_TOKEN or gh auth login (PR path)
   - T3: QM wiring: DEPLOYMENT_LAYER + start dev instance → check skill visible → talk to Slack bot
   - T4: full E2E: render request + build request on math-solver

Also mention expected failure modes at each step.

Keep it structured but concise. Table or numbered steps with commands + "you should see". This is a "how to" answer — needs some length, but keep tight.

Here's the current state and the exact test ladder.

**Where you are right now:**
- ✅ Superset app is running (v1.30.2), CLI shim present
- ❌ No `.env` yet (no API key, no GH token), `gh` not logged in
- ❌ QM dev instance not running, skill layer not wired
- ✅ Website itself works (21/21 solver tests passed)

---

## How the whole thing works (one message through the system)

```
You: "apply this review to apps/math-solver, show me a mockup first"
  → QM Slack bot receives it, loads principal-engineer skill
  → skill says: render mode → runs supersetctl → Superset cloud MCP API
  → your Mac's Superset publishes an HTML page → you get a URL
You: "ok, ship it"
  → build mode → supersetctl workspaces_create (git worktree on your Mac)
  → agents_create launches a coding agent → it edits apps/math-solver/
  → opens PR with GH_TOKEN → you review → you merge
```

## Test ladder (in order, each step proves one layer)

**T0 — the website (works right now, free):**
```bash
open apps/math-solver/index.html
```
Type `2(x + 3) = 4x - 2` → expect `x = 4` with steps. Type `10/2` → expect the "division not supported" error.

**T1 — Superset API pipe (needs your API key):**
```bash
cp .env.example .env        # paste SUPERSET_API_KEY=sk_live_…
npm run smoke
```
Expect: `ok auth-check` … `ok pages-publish` and a `verification URL:` you can open. This proves the key works and the agent can publish.

**T2 — GitHub path (needs token):**
```bash
# in .env: GH_TOKEN=ghp_…
npm run host                # starts Superset host daemon with the token exported
```
Expect: `superset status` shows the host running. PRs opened from workspaces will now carry your identity.

**T3 — QM agent wiring (needs the env var):**
```bash
export DEPLOYMENT_LAYER=$PWD/qm/sandbox
# then start your QM dev instance as usual (npm run dev-instance:slack in ~/Desktop/qm)
```
Expect: in QM admin/skills you see **principal-engineer**, and the agent can run `supersetctl auth-check` successfully in its sandbox.

**T4 — full E2E in Slack:**
1. `@bot render a bigger-input mobile layout for apps/math-solver` → expect a Pages URL
2. `@bot apply reviews.sample.md item 1 to apps/math-solver and open a PR` → expect a workspace id, then a PR link on GitHub
3. Merge the PR yourself — that's the loop closed

**Fastest path to a win today:** T0 + T1 (5 minutes, only needs the API key). T2–T4 need the GH token and the QM instance, and are where I'd expect the first wiring hiccups (sandbox key visibility, skill seeding) — run them in order and tell me which step's output looks wrong.

---

## User

wait what api key does it need at this point??

---

## Assistant (Build · MiMo-V2.6-Flash Free · 12.5s)

_Thinking:_

The user is asking: what API key does it need at this point? They're confused about which API key — Superset API key.

Clarify: SUPERSET_API_KEY — the Superset app's own API key (Settings → API Keys, starts with sk_live_). Not OpenAI, not GitHub, not SerpAPI. It authenticates supersetctl/the QM agent to Superset's cloud MCP API (api.superset.sh).

Why needed at this point: T1 smoke test / agent actions (publish pages, create workspaces). Without it, only the local website (T0) works.

Also distinguish the three credentials in play:
1. SUPERSET_API_KEY — Superset app → Settings → API Keys (sk_live_) — for MCP2. GH_TOKEN — GitHub PAT — for PRs
3. Existing ones in factory/.env (SerpAPI etc.) — unrelated
4. QM's model keys (ANTHROPIC_API_KEY etc.) — already in dev.env, unrelated

Keep short.

The **Superset app's own API key** — nothing else.

- **Where from:** Superset desktop app → **Settings → API Keys → Create API Key** (looks like `sk_live_…`)
- **What it's for:** it authenticates `supersetctl` / the QM agent to Superset's cloud API (`api.superset.sh/mcp`) — that's the only way the agent can publish pages, create workspaces, launch coding agents
- **Where it goes:** `.env` as `SUPERSET_API_KEY=…`

It's **not**:
- not OpenAI/Anthropic (QM already has its model keys in `~/.config/qm/dev.env`)
- not the GitHub token (that's the separate `GH_TOKEN`, only needed for PRs at T2)
- not SerpAPI (that's `factory/.env`, unrelated)

Right now, without it, only T0 (the website itself) works. The key is the entry ticket for everything Superset-side.

---

## User

wait can we use groq provier

---

## Assistant (Build · MiMo-V2.6-Flash Free · 11.1s)

_Thinking:_

The user asks: "wait can we use groq provider" — in what context? Two possible interpretations:

1. QM's model provider (HARNESS/MODEL_PROVIDER in dev.env) — can QM use Groq as the LLM provider for the agent?
2. Superset's model providers (docs mention "Use with OpenRouter, Bedrock, Vertex, or Vercel") — can Superset coding agents use Groq?

Context: previous message was about API keys. They might be thinking: instead of paying for Anthropic/OpenAI, can we use Groq for the agent models?

Let me check:
- Superset providers doc: /providers — "Use with OpenRouter, Bedrock, Vertex, or Vercel" — probably no Groq directly, but OpenRouter supports Groq models.
- QM: model gateway / MODEL_PROVIDER — check .env.example for provider list.

Let me quickly grep QM .env.example for providers and fetch superset providers page.

**Tool: bash**

**Input:**
```json
{
  "command": "grep -inE \"provider|groq|openrouter|MODEL_BASE|OPENAI|ANTHROPIC|GEMINI|BEDROCK\" ~/Desktop/qm/.env.example | head -30; echo \"--- dev.env provider ---\"; grep -E \"^MODEL_PROVIDER|^HARNESS\" ~/.config/qm/dev.env; echo \"--- model-gateway doc ---\"; curl -s https://raw.githubusercontent.com/yc-software/qm/main/docs/model-gateway.md | head -60"
}
```

**Output:**
```
14:#ANTHROPIC_API_KEY=sk-ant-...
15:#OPENAI_API_KEY=sk-...
16:#OPENROUTER_API_KEY=sk-or-...
45:# Extra root CA (PEM content) trusted for the Postgres connection, for providers that pin a private root. Optional; verification stays on. (core)
--- dev.env provider ---
MODEL_PROVIDER=openrouter
HARNESS=pi
--- model-gateway doc ---
# Model gateways

Pi can route model calls through an authenticated gateway instead of holding provider keys. Set `MODEL_GATEWAY_URL`, `MODEL_GATEWAY_API_KEY`, and `MODEL_GATEWAY_API_KEY_HEADER`. The key stays server-side. No model list is required.

QM discovers models using authenticated `GET /v1/models` and `GET /model_group/info`, the end-user metadata endpoint implemented by LiteLLM. A base URL ending in `/v1` is supported; both endpoints retain any preceding path prefix. Discovery uses the same key as inference, rejects redirects, and ignores upstream credential and endpoint fields.

Only models listed by both endpoints, marked as chat models with tool support, and carrying valid context, output and pricing metadata are offered. Discovered IDs are namespaced as `gateway/<upstream-id>`. Groups whose metadata identifies only Anthropic providers use native Messages, preserving signed thinking blocks across tool calls. Groups whose providers are exclusively OpenAI or Azure use Responses, including native file inputs. Other groups use OpenAI-compatible streaming chat completions. Reasoning controls are enabled for native Anthropic and OpenAI/Azure groups; other provider combinations use standard chat without requesting reasoning effort. They are available in Pi, not process harnesses. The gateway owns provider translation and group capabilities. QM selects the protocol from provider metadata, never model names. Gateways must expose `/v1/messages` for Anthropic groups and `/v1/responses` for OpenAI/Azure groups. PDF inputs on chat-completion routes require vision capability and a provider set consisting only of Anthropic, OpenAI, Azure, Gemini or Vertex. Unknown or mixed unsupported provider groups use bounded text extraction.

Availability refreshes on demand every five minutes and before inference when expired. Successful refreshes replace the catalog, including an empty catalog. After discovery has succeeded, a failed refresh disables gateway routes until recovery without interrupting independent direct providers, with retries after thirty seconds. In-flight requests are not cancelled; the gateway still enforces its key permissions on every call. Retired selections remain in conversation history but cannot issue a new request through a different provider.

`MODEL_GATEWAY_MODELS` is optional and accepts the existing `local-id=upstream-id` pairs. These provide compatibility aliases using QM's existing native model definitions; they do not limit discovered models. After discovery succeeds, aliases are usable only while their upstream IDs remain advertised. Gateways without the discovery endpoints can continue to use explicit mappings. Before the first successful discovery, failures leave those configured routes available. This compatibility fallback never restores a route removed by a successful discovery.

For LiteLLM deployments, allow the two authenticated GET endpoints alongside inference paths. Do not expose administrative `/model/info` or key-management routes to enable discovery. Gateways implementing only the OpenAI model-list endpoint can use explicit mappings or implement the metadata contract below.

The metadata endpoint returns `{"data": [...]}` with one object per model group. QM uses `model_group`, `mode`, `supports_function_calling`, `max_input_tokens`, `max_output_tokens`, `input_cost_per_token`, and `output_cost_per_token`. Optional fields include `providers`, `supports_vision`, `supports_reasoning`, `supports_adaptive_thinking`, `supported_openai_params`, `cache_read_input_token_cost`, and `cache_creation_input_token_cost`. Prices are per token and converted to per-million-token prices for QM. Missing cache prices use the input rate. Input capacity is used conservatively as the context budget; output capacity must be smaller.

LiteLLM group metadata may combine capabilities and maximum limits from multiple deployments. It is a gateway contract, not a guarantee that every backing deployment has identical capabilities.

```

**Tool: webfetch**

**Input:**
```json
{
  "format": "markdown",
  "url": "https://docs.superset.sh/providers"
}
```

**Output:**
```
Use with OpenRouter, Bedrock, Vertex, or Vercel | Superset Docs

[Superset](https://superset.sh)

[Changelog](https://superset.sh/changelog)[Website](https://superset.sh)[](https://github.com/superset-sh/superset)-   English日本語简体中文Français한국어繁體中文EspañolDeutschPortuguês (Brasil)ItalianoРусскийTürkçePolskiNederlandsBahasa IndonesiaČeštinaTiếng Việt
[Download](https://superset.sh/download)

Get Started

[What is Superset?](/overview)[Install](/install)[Your First Parallel Session](/first-workspace)[The Superset Model](/superset-model)

Recipes

[Race Agents on One Task](/recipes/race-agents)[Run Three Workstreams at Once](/recipes/parallel-workstreams)[Clear PR Feedback in the Background](/recipes/pr-feedback)[Fan Out a Big Refactor](/recipes/fan-out-refactor)[Wake Up to a Finished Audit](/recipes/nightly-audit)[Command Your Fleet from the CLI](/recipes/command-your-fleet)[Drive Superset from Your Agent](/recipes/agent-driven-superset)[Agent Orchestration](/orchestration)

Core Features

[Workspaces](/workspaces)[Diff Viewer](/diff-viewer)[Editor & Files](/editor)[Terminal](/terminal-integration)[Port Management](/ports)[In-App Browser](/browser)[Computer Control](/computer)[Pages](/pages)[AI Agents](/agent-integration)[Agent Status & Notifications](/agent-status)[Tasks](/tasks)[Pull Requests](/pull-requests)[Remote Access](/remote-access)[Automations](/automations)[Usage](/usage)[Skills](/skills)[Superset MCP Server](/mcp-server)

CLI

[Getting Started](/cli/getting-started)[Superset CLI Reference](/cli/cli-reference)[Host Server](/cli/host-server)[Environment variables](/cli/env-vars)

TypeScript SDK

[Getting Started](/sdk/getting-started)[Superset SDK Reference](/sdk/reference)[Advanced Usage](/sdk/advanced)

Integrations

[IDE Integration](/use-with-ide)[Linear Integration](/use-with-linear)[Slack Integration](/use-with-slack)[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers)

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts)[Monorepos](/using-monorepos)[Terminal Scripts](/terminal-scripts)[Keyboard Shortcuts](/keyboard-shortcuts)[Custom Themes](/custom-themes)[Customization](/customization)

Help

[Troubleshooting](/troubleshooting)[FAQ](/faq)[Community & Support](/community)

Search docs...⌘K

Get Started

[What is Superset?](/overview "What is Superset?")[Install](/install "Install")[Your First Parallel Session](/first-workspace "Your First Parallel Session")[The Superset Model](/superset-model "The Superset Model")

Recipes

[Race Agents on One Task](/recipes/race-agents "Race Agents on One Task")[Run Three Workstreams at Once](/recipes/parallel-workstreams "Run Three Workstreams at Once")[Clear PR Feedback in the Background](/recipes/pr-feedback "Clear PR Feedback in the Background")[Fan Out a Big Refactor](/recipes/fan-out-refactor "Fan Out a Big Refactor")[Wake Up to a Finished Audit](/recipes/nightly-audit "Wake Up to a Finished Audit")[Command Your Fleet from the CLI](/recipes/command-your-fleet "Command Your Fleet from the CLI")[Drive Superset from Your Agent](/recipes/agent-driven-superset "Drive Superset from Your Agent")[Agent Orchestration](/orchestration "Agent Orchestration")

Core Features

[Workspaces](/workspaces "Workspaces")[Diff Viewer](/diff-viewer "Diff Viewer")[Editor & Files](/editor "Editor & Files")[Terminal](/terminal-integration "Terminal")[Port Management](/ports "Port Management")[In-App Browser](/browser "In-App Browser")[Computer Control](/computer "Computer Control")[Pages](/pages "Pages")[AI Agents](/agent-integration "AI Agents")[Agent Status & Notifications](/agent-status "Agent Status & Notifications")[Tasks](/tasks "Tasks")[Pull Requests](/pull-requests "Pull Requests")[Remote Access](/remote-access "Remote Access")[Automations](/automations "Automations")[Usage](/usage "Usage")[Skills](/skills "Skills")[Superset MCP Server](/mcp-server "Superset MCP Server")

CLI

[Getting Started](/cli/getting-started "Getting Started")[Superset CLI Reference](/cli/cli-reference "Superset CLI Reference")[Host Server](/cli/host-server "Host Server")[Environment variables](/cli/env-vars "Environment variables")

TypeScript SDK

[Getting Started](/sdk/getting-started "Getting Started")[Superset SDK Reference](/sdk/reference "Superset SDK Reference")[Advanced Usage](/sdk/advanced "Advanced Usage")

Integrations

[IDE Integration](/use-with-ide "IDE Integration")[Linear Integration](/use-with-linear "Linear Integration")[Slack Integration](/use-with-slack "Slack Integration")[Use with OpenRouter, Bedrock, Vertex, or Vercel](/providers "Use with OpenRouter, Bedrock, Vertex, or Vercel")

Configuration

[Project Lifecycle Scripts](/setup-teardown-scripts "Project Lifecycle Scripts")[Monorepos](/using-monorepos "Monorepos")[Terminal Scripts](/terminal-scripts "Terminal Scripts")[Keyboard Shortcuts](/keyboard-shortcuts "Keyboard Shortcuts")[Custom Themes](/custom-themes "Custom Themes")[Customization](/customization "Customization")

Help

[Troubleshooting](/troubleshooting "Troubleshooting")[FAQ](/faq "FAQ")[Community & Support](/community "Community & Support")

On this page

Integrations

# Use with OpenRouter, Bedrock, Vertex, or Vercel

Connect Superset to Vercel AI Gateway, OpenRouter, AWS Bedrock, Google Vertex, and other providers

Copy MarkdownOpen in

If you're using Superset in the terminal - any CLI agent (Claude Code, Codex, Curser Agents, etc.) automatically just work. That's the beauty of us being terminal first.

For the Chat UI, we have a flow for users to get started.

## [Chat UI](#chat-ui)

1.  Open the model picker at the bottom of the chat

![Model picker](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproviders-model-picker.3hv_vbr3h3qu8.png&w=3840&q=75)

2.  Click the **key icon** next to **Anthropic**
    
3.  Select **Use API key**
    

![Connect Anthropic](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproviders-connect-dialog.0fxdcle8bq78h.png&w=3840&q=75)

4.  Enter the environment variables for your provider (one per line, `VAR_NAME=value` format)

![Environment variables](/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproviders-env-vars.3q8mn8h74vytl.png&w=3840&q=75)

5.  Click **Save settings**

See the provider sections below for the specific variables to use.

## [Terminal](#terminal)

Set environment variables in your shell profile or per workspace via **Settings > Env**.

For Anthropic-compatible providers (OpenRouter, Vercel AI Gateway), set `ANTHROPIC_API_KEY` to an empty string to prevent direct Anthropic authentication.

---

## [Vercel AI Gateway](#vercel-ai-gateway)

Route requests through the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway).

```
ANTHROPIC_BASE_URL=https://ai-gateway.vercel.sh
ANTHROPIC_AUTH_TOKEN=your-vercel-ai-gateway-api-key
ANTHROPIC_API_KEY=
```

## [OpenRouter](#openrouter)

[OpenRouter](https://openrouter.ai) provides access to many models through a single API.

```
ANTHROPIC_BASE_URL=https://openrouter.ai/api
ANTHROPIC_AUTH_TOKEN=your-openrouter-api-key
ANTHROPIC_API_KEY=
```

## [AWS Bedrock](#aws-bedrock)

Use Claude models through your AWS account with [Amazon Bedrock](https://aws.amazon.com/bedrock/).

Ensure your AWS credentials are configured via `aws configure`, environment variables, or SSO profile.

```
CLAUDE_CODE_USE_BEDROCK=1
AWS_REGION=us-east-1
```

Optionally override the region for the small/fast model (Haiku):

```
ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION=us-west-2
```

Pin specific model versions to prevent breakage when new models are released:

```
ANTHROPIC_DEFAULT_OPUS_MODEL=us.anthropic.claude-opus-4-6-v1
ANTHROPIC_DEFAULT_SONNET_MODEL=us.anthropic.claude-sonnet-4-6
ANTHROPIC_DEFAULT_HAIKU_MODEL=us.anthropic.claude-haiku-4-5-20251001-v1:0
```

For full setup details including IAM configuration, see the [Claude Code on Amazon Bedrock docs](https://code.claude.com/docs/en/amazon-bedrock).

## [Google Vertex AI](#google-vertex-ai)

Run Claude models on [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai).

Authenticate with `gcloud auth application-default login`, then set:

```
CLAUDE_CODE_USE_VERTEX=1
CLOUD_ML_REGION=global
ANTHROPIC_VERTEX_PROJECT_ID=your-project-id
```

Pin specific model versions to prevent breakage when new models are released:

```
ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-6
ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5@20251001
```

For full setup details including IAM configuration, see the [Claude Code on Google Vertex AI docs](https://code.claude.com/docs/en/google-vertex-ai).

## [Microsoft Foundry (Azure)](#microsoft-foundry-azure)

Use Claude models via [Microsoft Foundry](https://ai.azure.com).

Authenticate with an API key or Microsoft Entra ID (`az login`), then set:

```
CLAUDE_CODE_USE_FOUNDRY=1
ANTHROPIC_FOUNDRY_RESOURCE=your-resource-name

# If using API key authentication:
ANTHROPIC_FOUNDRY_API_KEY=your-azure-api-key
```

Pin specific model versions to prevent breakage when new models are released:

```
ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-6
ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5
```

For full setup details including RBAC configuration, see the [Claude Code on Microsoft Foundry docs](https://code.claude.com/docs/en/microsoft-foundry).

## [Other Anthropic-Compatible Providers](#other-anthropic-compatible-providers)

Any provider that exposes an Anthropic-compatible API (such as LiteLLM) can be used:

```
ANTHROPIC_BASE_URL=https://your-provider.example.com
ANTHROPIC_AUTH_TOKEN=your-api-key
ANTHROPIC_API_KEY=
```

For LLM gateway configuration details, see the [Claude Code LLM gateway docs](https://code.claude.com/docs/en/llm-gateway).

[Edit on GitHub](https://github.com/superset-sh/superset/blob/main/apps/docs/content/docs/providers.mdx)

[

Previous

Slack Integration

](/use-with-slack)[

Next

Project Lifecycle Scripts

](/setup-teardown-scripts)

### On this page

[

Chat UI](#chat-ui)[

Terminal](#terminal)[

Vercel AI Gateway](#vercel-ai-gateway)[

OpenRouter](#openrouter)[

AWS Bedrock](#aws-bedrock)[

Google Vertex AI](#google-vertex-ai)[

Microsoft Foundry (Azure)](#microsoft-foundry-azure)[

Other Anthropic-Compatible Providers](#other-anthropic-compatible-providers)
```

---

## Assistant (Build · MiMo-V2.6-Flash Free)

_Thinking:_

Question: "can we use groq provider" — context: keys. Their QM dev.env already has MODEL_PROVIDER=openrouter (and OPENROUTER_API_KEY). So for QM, Groq models are already reachable via OpenRouter.

For Superset coding agents: docs list Anthropic-compatible providers (OpenRouter, Vercel, LiteLLM, Bedrock, Vertex, Foundry). Groq is OpenAI-compatible, not Anthropic-compatible — Claude Code (the agent Superset launches) needs Anthropic-compatible API. Groq has an Anthropic-compatible endpoint? Groq has an Anthropic-compatible API? As of 2025, Groq announced compatibility? I recall Groq offers an "Anthropic-compatible" endpoint? Not sure. Actually, Groq provides OpenAI-compatible API at api.groq.com/openai/v1. Claude Code specifically speaks Anthropic Messages API; there are proxies (LiteLLM) that translate Anthropic→Groq. LiteLLM is listed as supported ("Any provider that exposes an Anthropic-compatible API (such as LiteLLM)").

Also relevant: Superset agents include OpenCode/Codex/Gemini CLI etc., which support OpenAI-compatible endpoints — e.g., OpenCode can use Groq via OpenAI-compatible provider. Superset's providers doc is oriented to Claude Code though.

So answer:
1. QM side: yes — you're already on OpenRouter; just pick a groq/llama model through OpenRouter, or set MODEL_PROVIDER accordingly (check what providers QM supports: ANTHROPIC/OPENAI/OPENROUTER in .env.example). Groq directly? .

---

