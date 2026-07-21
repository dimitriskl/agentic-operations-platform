# Architecture

## Vision

Agentic Operations Platform is a project-first learning system for building reliable agentic backends.

The first practical domain is a software 3D printer simulator. The simulator gives us a safe operational system with state, temperatures, jobs, progress, commands, risk levels, approvals, and audit logs.

The architecture must grow through vertical slices. A planned layer is not implemented until it has working behavior, tests, evaluations, and observable evidence.

## Planned layers

1. API layer
2. Simulator and operational-domain layer
3. Adapter layer for internal, OctoPrint, Moonraker, and future real-printer targets
4. Tool registry and capability-permission layer
5. Policy, risk, and guardrail layer
6. Human-approval layer
7. Agent runtime, persona, prompting, typed-output, and tracing layer
8. State, sessions, workflow, and bounded-loop layer
9. Knowledge, memory, and retrieval layer
10. Evaluation and feedback layer
11. Multi-agent orchestration, handoff, MCP, and A2A integration layer
12. Audit, observability, reliability, and cost-control layer
13. Deployment, identity, secrets, security, and governance layer

## Phase 0 scope

Only API foundation, Python basics, Pydantic models, and tests.

No LLM, MCP, RAG, or multi-agent logic yet.

## Initial printer simulator architecture

The simulator starts as plain Python plus FastAPI, with in-memory state.

Initial components:

\`\`\`text
src/printer_models.py
src/printer_simulator.py
tests/test_printer_simulator.py
\`\`\`

Initial states:

\`\`\`text
idle
heating
ready
printing
paused
completed
failed
cancelled
\`\`\`

Initial endpoints later:

\`\`\`text
GET  /printer/status
GET  /printer/job
POST /printer/start
POST /printer/pause
POST /printer/resume
POST /printer/cancel
POST /printer/set-temperature
\`\`\`

## Stable domain and adapter boundary

Agent code must not know whether it is controlling:

\`\`\`text
internal simulator
OctoPrint Virtual Printer
Moonraker / Klipper sandbox
real printer
\`\`\`

All targets implement a common typed printer-control interface.

The deterministic policy, approval, audit, and evaluation layers wrap this interface. Switching an adapter must not bypass those controls.

## Agent runtime boundary

The first agent is recommendation-only.

It produces validated structured output and cannot directly execute a printer command. The deterministic policy layer independently computes risk and approval requirements.

Future agent-runtime capabilities include:

- versioned persona and prompts
- model configuration
- typed output validation
- agent and tool tracing
- bounded reasoning and planning loops
- explicit iteration, timeout, and cost budgets
- confidence-gated human escalation

Framework-neutral application interfaces come before OpenAI Agents SDK or any other provider-specific runtime.

## MCP and A2A boundary

MCP may expose approved tools, resources, and prompts, but only through a capability allowlist.

MCP servers and clients require:

- typed contracts
- authentication and authorization where applicable
- transport and deployment decisions
- timeouts and failure handling
- contract tests
- audit correlation

A2A and multi-agent communication are added only after the single-agent path is reliable.

Handoffs must be typed, observable, guarded, and unable to expand permissions. All tools still execute through the centralized policy and approval boundary.

## Reasoning and loop boundary

Reasoning patterns are engineering options, not permission mechanisms.

ReAct, planning, Reflexion, Tree-of-Thought, sequential thinking, and multi-agent loops must have:

- explicit termination gates
- iteration and cost budgets
- repeated-action and stagnation detection
- recoverable state
- concise observable decision records
- evaluations proving an improvement over a simpler approach

The system must not store or depend on hidden chain-of-thought.

## Knowledge and memory boundary

Authoritative printer manuals and safety procedures remain distinct from remembered experience.

The knowledge and memory layer may contain:

- indexed authoritative documents
- semantic, keyword, or hybrid retrieval
- current-job session memory
- incident-focused episodic memory
- reusable procedural memory
- relevance, retention, compression, and forgetting policies

Recommendations derived from RAG must cite retrieved evidence. Memory must never override a safety policy or expand tool permissions.

## Evaluation and feedback boundary

Evaluation is a release gate, not a final optional step.

Coverage includes:

- deterministic tests
- scenario datasets
- state-transition correctness
- risk and approval correctness
- groundedness
- tool choice
- task success
- model-based rubrics
- human annotations
- prompt, tool, model, and policy regressions

Safety regressions block release.

## Production boundary

Before real hardware, the platform must add:

- containerized deployment
- health and readiness checks
- state persistence, idempotency, and resumability
- request and trace correlation
- metrics, logs, and traces
- retries, fallbacks, circuit breakers, and budgets
- model routing and cost controls
- identity and least-privilege access
- secret management
- sandbox and network-egress restrictions
- prompt-injection and data-exfiltration defenses
- configuration rollback
- threat model and operational runbook

## Cognitive and metacognitive safeguards

Advanced adaptive behavior may add perception, planning, execution, evaluation, attention, and memory modules.

It must remain bounded by:

- confidence-gated execution
- knowledge-boundary awareness
- stagnation detection
- safe strategy switching
- human escalation
- metrics for success, iterations, interventions, latency, and cost

Uncertainty must reduce autonomy, never expand it.

## Safety boundary

At first, the simulator is controlled by deterministic code and tests only.

Later, agent tools may propose simulator commands.

Risky commands such as start, cancel, and set-temperature require approval before execution. Arbitrary G-code remains forbidden.

Real printer integration is allowed only after deterministic behavior, approvals, audit, evaluations, observability, security, recovery, and production-safety gates pass.

## Extended learning coverage

The detailed future knowledge areas, deliverables, and completion criteria are maintained in:

\`\`\`text
docs/learning/agent-engineering-knowledge-coverage.md
docs/learning/3d-printer-agent-learning-track.md
\`\`\`
