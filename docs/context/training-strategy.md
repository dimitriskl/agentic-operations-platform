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

## Knowledge-coverage rule

The complete industrial-strength lesson catalog exists independently of current implementation progress:

~~~text
docs/learning/industrial-strength-agent-engineering-curriculum.md
~~~

Do not remove, hide, or defer a lesson out of the curriculum because its code lab has not started. The curriculum defines complete knowledge coverage; the 3D-printer learning track defines implementation order.

Each knowledge lesson must specify a hands-on lab and completion evidence before it can be treated as covered. Reading, watching, or discussing a topic alone is not completion.

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

1. Python bridge and typed application foundations
2. Deterministic 3D printer simulator
3. FastAPI contracts, tool registry, and permission boundaries
4. Risk classification, human approval, and audit evidence
5. Baseline tests and evaluations
6. Minimal model integration with instructions, persona, typed output, and tracing
7. Harness engineering from raw primitives before SDK abstraction
8. Reasoning, planning, verification, and bounded loops
9. Context delivery and context management
10. Knowledge engineering and RAG
11. Working, episodic, semantic, and procedural memory, including conflict resolution and forgetting
12. Versioned skills with progressive loading, ownership, evaluation, and rollback
13. MCP, external adapters, multimodal observations, and protocol security
14. Multi-agent systems, typed handoffs, A2A, and centralized execution guardrails
15. Industrial evaluation, repeated reliability, calibrated judges, fault injection, and behavior drift
16. Safe harness self-improvement through weakness mining, isolated candidates, independent evaluation, human approval, staged release, and rollback
17. Layered sandboxing, security, egress control, and blast-radius analysis
18. Deployment, observability, resilience, release engineering, and cost control
19. Cognitive safeguards, human operations, governance, and incident response
20. Real printer integration after production-safety gates
21. Production capstone and architecture transfer to a second operational domain

The canonical curriculum is:

~~~text
docs/learning/industrial-strength-agent-engineering-curriculum.md
~~~

The implementation sequence is:

~~~text
docs/learning/3d-printer-agent-learning-track.md
~~~

The coverage roadmap is:

~~~text
docs/learning/agent-engineering-knowledge-coverage.md
~~~

## Reference-material rule

Books, courses, and official documentation are reference libraries, not the main path.

Read a topic just before its project milestone. Every learning session should still produce a small repository result.

Framework-neutral interfaces and safety policies come first. SDK-specific implementations, including OpenAI Agents SDK examples, come later and must remain replaceable.

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
