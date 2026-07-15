# Architecture

## Vision

Agentic Operations Platform is a project-first learning system for building reliable agentic backends.

The first practical domain is a software 3D printer simulator. The simulator gives us a safe operational system with state, temperatures, jobs, progress, commands, risk levels, approvals, and audit logs.

## Planned layers

1. API layer
2. Simulator/domain layer
3. Agent runtime
4. Tool registry
5. State and workflow layer
6. Memory layer
7. Retrieval layer
8. Approval layer
9. Evaluation layer
10. Audit log layer

## Phase 0 scope

Only API foundation, Python basics, Pydantic models, and tests.

No multi-agent logic yet.

## Initial printer simulator architecture

The simulator will start as plain Python + FastAPI, with in-memory state.

Initial components:

```text
src/printer_models.py
src/printer_simulator.py
tests/test_printer_simulator.py
```

Initial states:

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

Initial endpoints later:

```text
GET  /printer/status
GET  /printer/job
POST /printer/start
POST /printer/pause
POST /printer/resume
POST /printer/cancel
POST /printer/set-temperature
```

## Safety boundary

At first, the simulator is controlled by deterministic code and tests only.

Later, agent tools may call simulator commands.

Risky commands such as start, cancel, and set-temperature must require approval before execution.
