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
2. Typed request/response models and FastAPI
3. Deterministic 3D printer simulator
4. Tool registry and permission boundaries
5. Risk classification
6. Human approval and audit log
7. Baseline evaluations
8. Minimal single agent with persona, typed output, and tracing
9. Reasoning, planning, and bounded agentic loops
10. Knowledge, memory, and RAG
11. MCP and external printer adapters
12. Multi-agent systems, typed handoffs, A2A, and guardrails
13. Advanced evaluation and feedback
14. Deployment, observability, security, and cost control
15. Cognitive and metacognitive safeguards
16. Real printer integration after production-safety gates
17. Capstone and transfer to a second operational domain

The detailed future knowledge map is:

\`\`\`text
docs/learning/agent-engineering-knowledge-coverage.md
\`\`\`

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
