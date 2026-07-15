# Current Learning Update

## Latest decision

The learning path must include **AI handling of a 3D printer**.

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
docs/learning/3d-printer-agent-learning-track.md
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
