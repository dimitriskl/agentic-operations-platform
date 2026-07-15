# 3D Printer Agent Simulator

## Decision

Before buying a physical 3D printer, we will first build a software-based 3D printer simulator inside the Agentic Operations Platform.

This lets Dimitris learn agent design, tools, state, approvals, audit logs, and evaluations without risking hardware, failed prints, fire hazards, or unsafe G-code.

## Why this matters

The long-term idea is to build an AI agent that can monitor and control operational systems.

A 3D printer is a good learning domain because it has:

- status
- temperature
- jobs
- progress
- pause/resume/cancel actions
- risk levels
- hardware-like state transitions
- clear safety boundaries

But a real printer should not be controlled directly by an untested agent.

So the learning order is:

1. Fake Printer API inside this repo
2. Agent tools that call the fake printer
3. State and approval workflow
4. Audit logs
5. Evaluations
6. Optional OctoPrint Virtual Printer later
7. Optional Moonraker/Klipper integration later
8. Real 3D printer only after the control model is safe

## Simulator states

The printer simulator should model these states:

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

## Initial simulator endpoints

The first version can expose endpoints like:

```text
GET  /printer/status
GET  /printer/job
POST /printer/start
POST /printer/pause
POST /printer/resume
POST /printer/cancel
POST /printer/set-temperature
```

These endpoints can be implemented inside FastAPI with in-memory state first.

No database is needed at the beginning.

## Example status response

```json
{
  "state": "printing",
  "progress": 42,
  "nozzle_temp": 210,
  "bed_temp": 60,
  "risk_level": "low",
  "needs_attention": false
}
```

## Safety rules

The agent must not directly execute risky actions.

Initial rules:

- read/status operations are low risk
- pause may be medium risk
- resume may be medium risk
- cancel is high risk
- start print is high risk
- set temperature is high risk
- arbitrary G-code is forbidden

For high-risk commands, the agent should produce a proposed action and require human approval.

## Agent learning pattern

The first agent should learn this loop:

```text
observe printer state
classify situation
select possible tool
determine risk
ask approval if needed
execute only approved action
write audit log
evaluate outcome
```

## First implementation milestone

After Phase 0 Day 1 and Day 2, create:

```text
src/printer_simulator.py
src/printer_models.py
tests/test_printer_simulator.py
```

Initial model ideas:

```text
PrinterState
PrinterStatus
PrinterCommand
PrinterCommandResult
RiskLevel
```

## Integration with the main roadmap

This simulator becomes the first real domain for the Agentic Operations Platform.

It helps teach:

- Pydantic models
- FastAPI endpoints
- deterministic state machines
- tool design
- risk classification
- approvals
- audit logs
- evals
- later agent orchestration

## Buying decision postponed

Physical printer purchase is postponed until the simulator and initial agent-control architecture are understood.

If a printer is purchased later:

- QIDI Plus4 remains the best all-round future-capable choice
- Sovol SV08 remains the cheaper hackable choice
- Prusa MK4S remains the cleanest OctoPrint/API learning choice
- Bambu remains the best polished appliance printer, but less ideal for open agent integration
