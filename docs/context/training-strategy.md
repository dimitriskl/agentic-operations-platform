# Training Strategy

## Target identity

Senior Applied AI Engineer / AI Agent Integration Architect.

## Project-first rule

Do not learn theory without producing project output.

Each session should produce one small result:

- code file
- endpoint
- Pydantic model
- test
- tool
- workflow definition
- evaluation
- README update
- learning-log update

## Current learning domain

The first practical domain will be a **software 3D printer simulator**.

Reason:

- it gives a realistic operational system without buying hardware first
- it has state, temperature, jobs, commands, progress, and risks
- it is a safe domain for learning tools, approvals, audit logs, and evals
- it can later be connected to OctoPrint Virtual Printer, Moonraker/Klipper, or a real printer

The simulator decision is documented in:

```text
docs/context/3d-printer-agent-simulator.md
```

## Learning order

1. Python Bridge
2. Pydantic request/response models
3. Fake 3D printer simulator
4. Tools over the simulator
5. Reliable single agent
6. State and sessions
7. Evaluations
8. Workflow engine
9. Memory
10. RAG
11. Human approval
12. Multi-agent orchestration
13. Agentic platform prototype

## Udacity usage

Udacity is a reference library, not the main path.

Keep these topics:

- structured outputs
- tool calling
- Pydantic
- state management
- memory
- APIs
- database agents
- RAG
- evaluations
- workflow patterns
- multi-agent architecture

## Important safety rule

Do not control real hardware until the simulator path has:

- deterministic state model
- risk classification
- human approval for risky actions
- audit logs
- tests/evals
