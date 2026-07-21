# 3D Printer AI Agent Learning Track

This learning track makes 3D printer handling the first concrete domain for the Agentic Operations Platform.

The goal is not to buy a printer immediately.

The goal is to learn how to design reliable AI agents that can safely monitor, reason about, and control an operational system.

A 3D printer is a good learning domain because it has:

- hardware-like state
- temperature values
- jobs
- progress
- pause/resume/cancel commands
- risky actions
- clear need for human approval
- auditability
- possible future real API integrations

## Core principle

No AI agent should control real hardware until the same behavior has been proven in a simulator.

The learning path is:

```text
Fake Printer Simulator
  -> deterministic tools
  -> risk classification
  -> human approval
  -> audit logs
  -> evaluations
  -> optional OctoPrint Virtual Printer
  -> optional Moonraker / Klipper
  -> real printer
```

## Learning outcomes

By the end of this track, Dimitris should be able to build an agent that can:

1. Observe printer state.
2. Understand whether the situation is normal or risky.
3. Choose a safe tool.
4. Propose an action.
5. Require approval before risky actions.
6. Execute approved actions.
7. Write audit logs.
8. Run evaluations against known scenarios.
9. Explain what it did and why.

## Stage 1 — Printer simulator foundation

Build a fake printer domain in plain Python.

No LLM yet.

Files:

```text
src/printer_models.py
src/printer_simulator.py
tests/test_printer_simulator.py
```

Concepts:

- Python enums
- Pydantic models
- deterministic state machine
- functions with typed inputs/outputs
- pytest tests

States:

```text
idle
heating
ready
printing
paused
completed
failed
cancelled
```

Initial operations:

```text
get_status
start_print
pause_print
resume_print
cancel_print
set_temperature
```

## Stage 2 — FastAPI printer endpoints

Expose the simulator through FastAPI.

Endpoints:

```text
GET  /printer/status
GET  /printer/job
POST /printer/start
POST /printer/pause
POST /printer/resume
POST /printer/cancel
POST /printer/set-temperature
```

Concepts:

- request models
- response models
- endpoint tests
- API shape
- error handling

## Stage 3 — Tool layer

Wrap printer operations as tools.

Example tools:

```text
get_printer_status()
get_current_job()
pause_print()
resume_print()
cancel_print()
set_target_temperature()
```

Concepts:

- tool function
- tool schema
- tool registry
- tool permissions
- read tool vs write tool

## Stage 4 — Risk classification

Classify commands by risk.

Risk model:

```text
low: read-only status or job check
medium: pause or resume
high: start, cancel, set temperature
forbidden: arbitrary G-code
```

Concepts:

- risk policy
- command validation
- safe defaults
- blocked operations

## Stage 5 — Human approval

High-risk actions must not execute immediately.

They must create an approval request.

Approval flow:

```text
proposed action
  -> risk classification
  -> pending approval
  -> approve / reject / edit
  -> execute only if approved
  -> audit log
```

Concepts:

- approval queue
- pending command
- approve endpoint
- reject endpoint
- state transition

## Stage 6 — Audit log

Every important action must be logged.

Minimum audit fields:

```text
timestamp
request_id
actor
command
risk_level
approval_required
approval_result
before_state
after_state
result
error
```

Concepts:

- JSONL audit log first
- later database table
- traceability
- debugging

## Stage 7 — Evaluations

Create a golden dataset of scenarios.

Example eval cases:

```json
{
  "scenario": "printer is printing and nozzle temperature is too high",
  "expected_risk": "high",
  "expected_action": "pause_and_request_review",
  "must_require_approval": true
}
```

Eval categories:

- status interpretation
- risk classification
- tool choice
- approval decision
- state transition correctness

Concepts:

- eval dataset
- eval runner
- scoring
- failure analysis
- regression checks

## Stage 8 — AI agent handling

Only after deterministic tools, approval, audit, and evals exist, add an AI agent.

The first AI agent should not directly execute commands.

It should produce structured output:

```json
{
  "situation_summary": "The printer is printing but nozzle temperature is above expected range.",
  "recommended_action": "pause_print",
  "risk_level": "high",
  "requires_approval": true,
  "reason": "High temperature during active print can damage print quality or hardware."
}
```

Concepts:

- structured output
- tool choice
- guardrails
- approval-first design
- no arbitrary G-code

## Stage 9 — Agent foundations, persona, and tracing

Build a minimal, observable single-agent layer over the safe recommendation boundary.

Learn and implement:

- LLM application vs assistant vs agent
- sense-plan-act-learn as an observable loop
- model configuration and prompt engineering
- versioned persona and prompts
- typed outputs and validation
- agent traces and tool-call traces
- OpenAI Agents SDK only after the framework-neutral interfaces are stable

Deliverables:

- traced printer advisor
- typed recommendation contract
- invalid-output tests
- deterministic-policy vs model-recommendation comparison

## Stage 10 — Reasoning, planning, and bounded agentic loops

Add iterative diagnosis only when one-pass recommendations are reliable.

Patterns to study:

- ReAct
- planning and plan revision
- Tree-of-Thought
- Reflexion
- sequential thinking
- inner, task, and orchestration loops

Safety and reliability controls:

- termination gates
- iteration limits
- timeouts
- token and cost budgets
- repeated-action and stagnation detection
- concise observable decision records instead of hidden chain-of-thought

Deliverables:

- bounded printer-diagnosis loop
- explicit plan/action records
- loop-budget tests
- evaluation comparing one-pass and iterative diagnosis

## Stage 11 — Knowledge, memory, and RAG

Ground recommendations in authoritative printer documentation.

Learn and implement:

- ingestion, chunking, embeddings, and retrieval
- semantic, keyword, and hybrid search
- evidence citations
- session, semantic, episodic, and procedural memory
- memory relevance, retention, compression, and forgetting
- separation between authoritative knowledge and remembered experience

Deliverables:

- RAG over manuals and safety procedures
- session memory for the current print job
- episodic memory for past incidents
- unsupported-recommendation and irrelevant-retrieval tests
- retention and deletion policy

## Stage 12 — MCP and external emulator integration

Expose approved printer capabilities through Model Context Protocol and connect to an external emulator.

Learn and implement:

- MCP clients and servers
- tools, resources, and prompts
- local and remote transport trade-offs
- tool discovery and invocation
- authentication, authorization, and deployment boundaries
- MCP inspection and contract testing

External targets:

\`\`\`text
OctoPrint Virtual Printer
Moonraker / Klipper sandbox
\`\`\`

The platform must keep printer control behind a common interface:

\`\`\`text
internal simulator
OctoPrint
Moonraker
real printer
\`\`\`

Deliverables:

- safe printer MCP server
- MCP client adapter
- capability allowlist
- discovery/invocation contract tests
- unavailable or malformed service handling

## Stage 13 — Multi-agent systems, A2A, and handoff guardrails

Add multiple agents only after a single agent is reliable and evaluated.

Study and compare:

- sequential agent flows
- coordinator/worker orchestration
- collaborative teams
- typed handoffs
- message passing and shared state
- shared memory
- A2A capability discovery
- input/output guardrails
- deterministic workflow alternatives

Printer incident roles may include:

\`\`\`text
monitor
diagnostician
safety reviewer
\`\`\`

The safety reviewer does not bypass the centralized approval and execution boundary.

Deliverables:

- one small multi-agent incident flow
- typed handoff contracts
- handoff and guardrail tests
- latency, cost, and failure-amplification comparison against a single-agent flow

## Stage 14 — Advanced evaluation and feedback

Extend the Stage 7 baseline into a production-shaped regression system.

Learn and implement:

- test-driven agent development
- rubrics
- grounding, critic, and evaluator agents
- human annotations and disputed-outcome review
- session and trace evaluation
- prompt, tool, model, and policy regression suites

Required metrics:

- task success
- groundedness
- tool choice
- state-transition correctness
- approval correctness
- safety-policy compliance
- latency and cost

Deliverables:

- versioned evaluation dataset
- deterministic and model-based evaluators
- human-review workflow
- release gate that blocks safety regressions

## Stage 15 — Deployment, observability, security, and cost

Prepare the platform for reliable operation before real hardware.

Learn and implement:

- agent APIs
- Docker and Docker Compose
- state, idempotency, resumability, and recovery
- release engineering for prompts, tools, policies, and models
- traces, metrics, logs, and correlation identifiers
- timeouts, retries, fallbacks, circuit breakers, and budgets
- model routing and cost control
- identity, secrets, sandboxing, and egress control
- prompt-injection and data-exfiltration defenses
- governance and policy enforcement

Deliverables:

- containerized platform and emulator
- health and readiness checks
- end-to-end correlation
- failure-injection tests
- threat model
- cost and latency report
- rollback procedure

## Stage 16 — Cognitive and metacognitive safeguards

Add adaptive behavior without granting uncontrolled autonomy.

Learn and implement:

- perception, planning, execution, evaluation, attention, and memory modules
- confidence-gated execution
- knowledge-boundary awareness
- stagnation detection
- safe strategy switching
- cognitive-efficiency metrics

Deliverables:

- known/unknown classification
- human escalation below a confidence threshold
- safe strategy-pivot rule
- tests proving that uncertainty cannot expand permissions
- metrics for iterations, interventions, latency, cost, and success

## Stage 17 — Real printer integration

Only after the previous stages and production-safety gates pass.

Safety rules for real printer:

- no direct arbitrary G-code from the agent
- no public internet exposure
- local network or VPN only
- authentication required
- least-privilege tool access
- high-risk actions require approval
- audit log and observability always enabled
- tested timeout, fallback, and emergency-stop behavior
- physical smoke detector nearby
- no fully unattended experimentation at the beginning

## Stage 18 — Capstone and transfer

Complete the track with:

- a production-shaped printer-agent capstone
- an operational runbook
- a final reliability, safety, security, cost, and maintainability report
- an architecture decision record comparing deterministic workflows, single agents, and multi-agent systems
- a second operational domain proving that the architecture transfers

## Extended knowledge coverage

The durable agent-engineering topics, deliverables, and completion criteria are maintained in:

\`\`\`text
docs/learning/agent-engineering-knowledge-coverage.md
\`\`\`

A knowledge area is not complete after reading about it. It is complete only after implementation, automated tests, evaluation scenarios, observable evidence, and a short trade-off note.

## Relationship to printer buying decision

Printer purchase is postponed.

Possible later choices:

- QIDI Plus4: best all-round future-capable printer for engineering materials, masks, props, drone parts
- Sovol SV08: cheaper, large, hackable option
- Prusa MK4S: reliable, open, clean OctoPrint path
- Bambu: best polished print experience, less ideal for open agent integration

The learning does not depend on buying the printer now.

The simulator is the first printer.
