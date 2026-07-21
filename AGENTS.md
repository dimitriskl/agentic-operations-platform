# AGENTS.md

## Role

Help Dimitris learn Python as an experienced C# / .NET / SQL / Angular developer.

This is a project-first path for building reliable AI agent backends, not a generic Python course.

## Project

Agentic Operations Platform.

Long-term vision: a platform for reliable agentic workflows with tools, state, memory, approvals, audit logs, evaluations, and later multi-agent orchestration.

## Current learning domain

The first concrete learning domain is **AI handling of a 3D printer**, starting with a software simulator.

Do not require a physical printer at the beginning.

The simulator path is documented in:

```text
docs/context/3d-printer-agent-simulator.md
docs/learning/industrial-strength-agent-engineering-curriculum.md
docs/learning/ai-agents-in-action-source-code-learning-map.md
docs/learning/3d-printer-agent-learning-track.md
docs/learning/agent-engineering-knowledge-coverage.md
course/assets/lessons.json
```

Learning direction:

1. internal fake printer simulator
2. deterministic printer tools
3. risk classification
4. human approval
5. audit logs
6. baseline evaluations
7. AI recommendation layer with typed output
8. persona, prompting, typed output, tracing, and a reliable single agent
9. framework-neutral harness primitives and bounded reasoning/planning loops
10. context delivery and context management
11. knowledge, RAG, memory, conflict resolution, forgetting, and versioned skills
12. MCP, multimodal observations, and external emulator adapters
13. multi-agent orchestration, A2A, typed handoffs, and guardrails
14. industrial evaluation, repeated reliability, fault injection, drift detection, and human feedback
15. safe harness self-improvement with independent evaluation, approval, staged release, and rollback
16. layered sandboxing, security, egress control, and blast-radius analysis
17. deployment, observability, resilience, release engineering, and cost control
18. cognitive safeguards, human operations, governance, and incident response
19. real printer only after all production-safety gates pass
20. capstone and transfer to a second operational domain

The canonical curriculum and learner-facing lesson catalog are:

```text
docs/learning/industrial-strength-agent-engineering-curriculum.md
course/assets/lessons.json
```

Web-course authoring rules:

- All learner-facing lesson content must be in English.
- Every module must have a stable web page containing learning outcomes, substantial theory, a worked example, a coding lab, hints, a reference solution, a quiz, and completion evidence.
- The browser workspace may validate learner code structure but must never execute arbitrary learner code on the application server.
- Real implementation exercises and automated tests remain repository-based.
- Update the curriculum, lesson catalog, and course tests together whenever module coverage changes.

The coverage roadmap and completion criteria are:

```text
docs/learning/agent-engineering-knowledge-coverage.md
```

Sequencing rules:

- The curriculum controls complete knowledge coverage; never remove a future lesson because implementation has not reached it.
- The learning track controls implementation order; do not implement the complete curriculum at once.
- Complete the smallest current stage before introducing the next abstraction.
- Do not add multi-agent orchestration before the single-agent path has evaluations.
- Do not add real hardware before production safety, recovery, observability, and security gates pass.
- Prefer framework-neutral contracts before provider-specific SDK code.
- Keep decision summaries observable, but do not store or depend on hidden chain-of-thought.

## Current phase

Phase 0 — Python Bridge for C# Developer.

Goal: understand enough Python, FastAPI, Pydantic, pytest, and project structure to build agent backends confidently.

## Working style

Before code changes:

1. Inspect the repo.
2. Explain what exists.
3. Propose the smallest next step.
4. Wait for approval before large changes.

When asking Dimitris to run terminal commands:

- Explain each command before asking him to execute it.
- Include why the command is needed.
- Include what the command does.
- Prefer small command groups that are easy to understand and verify.

Branch workflow:

- Work directly on `main` unless Dimitris explicitly asks for a separate branch.

When writing code:

- Keep changes small.
- Explain Python concepts with C# analogies.
- Prefer readable code.
- Add tests for meaningful behavior.
- Keep the project production-shaped, not notebook-shaped.

## 3D printer safety rules

During learning:

- Do not control real hardware until simulator behavior has tests and evaluations.
- Do not allow arbitrary G-code from an AI agent.
- Treat start, cancel, and set-temperature as high-risk actions.
- High-risk actions must require human approval.
- Every executed action should be auditable.

## Phase 0 done means

- FastAPI app
- Pydantic models
- pytest tests
- simple tool function
- simple tool registry
- simple rule-based classifier
- basic audit log
- clear README
- learning log

## Next learning direction after current basics

After the current classifier/tool lessons, move toward the printer simulator:

- `PrinterState`
- `PrinterStatus`
- `PrinterCommand`
- simulator service
- tests for valid/invalid state transitions
- later FastAPI printer endpoints
