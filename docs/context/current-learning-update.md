# Current Learning Update

## Latest decision

The repository must contain a complete, hands-on curriculum for a developer learning to build industrial-strength agents. Knowledge coverage is independent of the current code stage.

The first applied learning path continues to include **AI handling of a 3D printer**.

We will not start by buying or controlling a real printer.

We will start by building a software printer simulator inside this repo.

## Why

This lets Dimitris learn reliable agent design with a realistic operational domain:

- printer state
- temperature
- jobs
- progress
- pause/resume/cancel commands
- high-risk actions
- approval workflow
- audit logs
- evaluations

## Updated learning direction

After the current Python/FastAPI/Pydantic basics, move toward:

1. Pydantic models for printer state and commands
2. in-memory printer simulator
3. simulator tests
4. FastAPI endpoints for printer status and commands
5. tool functions wrapping printer operations
6. risk classification
7. human approval for risky actions
8. audit logs
9. evaluation dataset
10. AI agent that recommends printer actions with structured output

## Long-term knowledge coverage decision

The canonical lesson catalog is:

```text
docs/learning/industrial-strength-agent-engineering-curriculum.md
```

The coverage roadmap and completion criteria are:

```text
docs/learning/agent-engineering-knowledge-coverage.md
```

Future stages include:

- framework-neutral harness engineering from primitives
- agent instructions, persona, typed outputs, durable state, verification, and tracing
- reasoning, planning, and bounded agentic loops
- context delivery and management, including selection, compression, persistence, isolation, and prompt-cache trade-offs
- knowledge engineering, RAG, memory, conflict resolution, forgetting, and versioned skills
- MCP, multimodal observations, external adapters, and protocol security
- multi-agent orchestration, typed handoffs, A2A, and centralized execution guardrails
- industrial evaluation, repeated reliability, calibrated judges, fault injection, and drift detection
- safe harness self-improvement with weakness mining, independent evaluation, approval, staged release, and rollback
- layered sandboxing, egress restrictions, security, and blast-radius control
- deployment, observability, resilience, release engineering, and cost control
- cognitive safeguards, human operations, governance, and incident response
- capstone and transfer to a second operational domain

These lessons are already part of the course, even when their implementations are future milestones. They do not change the immediate next implementation direction.

## Important safety policy

Do not allow an AI agent to send arbitrary G-code.

Do not allow high-risk actions without approval.

Treat these as high-risk:

- start print
- cancel print
- set temperature
- future real hardware control

Read-only status checks are low risk.

Pause/resume are medium risk.

## Docs to read

Codex should read these files before continuing:

```text
AGENTS.md
docs/context/training-strategy.md
docs/context/3d-printer-agent-simulator.md
docs/learning/industrial-strength-agent-engineering-curriculum.md
docs/learning/3d-printer-agent-learning-track.md
docs/learning/agent-engineering-knowledge-coverage.md
docs/context/current-learning-update.md
```

## Next implementation direction

Do not jump to AI yet.

First implement the deterministic simulator.

Suggested files later:

```text
src/printer_models.py
src/printer_simulator.py
tests/test_printer_simulator.py
```

Suggested first model concepts:

```text
PrinterState
RiskLevel
PrinterStatus
PrinterCommand
PrinterCommandResult
```
