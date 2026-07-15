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

## Stage 9 — External emulator integration

After the internal simulator works, optionally integrate with:

```text
OctoPrint Virtual Printer
Moonraker / Klipper sandbox
```

The platform should abstract printer control behind a common interface, so the agent does not care whether it is talking to:

```text
internal simulator
OctoPrint
Moonraker
real printer
```

## Stage 10 — Real printer integration

Only after the previous stages pass.

Safety rules for real printer:

- no direct arbitrary G-code from the agent
- no public internet exposure
- local network or VPN only
- authentication required
- high-risk actions require approval
- audit log always enabled
- physical smoke detector nearby
- no fully unattended experimentation at the beginning

## Relationship to printer buying decision

Printer purchase is postponed.

Possible later choices:

- QIDI Plus4: best all-round future-capable printer for engineering materials, masks, props, drone parts
- Sovol SV08: cheaper, large, hackable option
- Prusa MK4S: reliable, open, clean OctoPrint path
- Bambu: best polished print experience, less ideal for open agent integration

The learning does not depend on buying the printer now.

The simulator is the first printer.
