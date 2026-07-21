# AI Agents in Action, Second Edition — Source Code Learning Map

## Purpose

This document maps the local source-code package supplied with *AI Agents in Action, Second Edition* to the Industrial-Strength Agent Engineering Curriculum.

The source package is reference material, not the architecture of this project. Its examples are converted into original printer-domain labs with deterministic policy, tests, evaluation, security boundaries, observability, and recovery evidence.

## Reviewed source

Local archive reviewed on 2026-07-21:

```text
E:\Downloads\code.zip
AI Agents in Action Second Edition Source Code/
```

The archive contains Chapters 2–12, a demo project, bonus MCP examples, presentations, and approximately 131 Python files. It includes examples for the OpenAI Agents SDK, MCP, A2A, Chroma, Phoenix tracing, FastAPI, multimodal agents, and multiple reasoning and orchestration patterns.

The archive is not committed to this repository. Learners do not need it to complete the course.

## Source-quality and reuse rules

- Treat every example as a teaching sample, not production-ready code.
- Reimplement the concept in the printer domain rather than copying the book example.
- Preserve framework-neutral contracts around model, tool, state, policy, approval, and execution boundaries.
- Verify current official SDK and protocol documentation before implementing an API.
- Add deterministic tests, repeated evaluations, failure injection, security controls, and observable evidence.
- Never import API keys, local databases, generated media, or `.env` files from the archive.
- The archive README displays an MIT badge while its `LICENSE` file contains Apache License 2.0. Do not redistribute copied source until that discrepancy and any required attribution are resolved.
- Some files are empty, duplicated, misspelled, or demonstration-only. Their presence does not make them course requirements.

## Chapter-to-module mapping

| Book source area | Main concepts visible in the code | Curriculum modules | Course adaptation |
| --- | --- | --- | --- |
| Chapter 2 | First agent, model parameters, typed output, tools, tracing | 2, 3, 4, 15 | Build the typed printer advisor first through framework-neutral interfaces, then implement the same contract with the OpenAI Agents SDK and compare traces. |
| Chapter 3 | MCP tools, resources, prompts, local files, stdio and older SSE examples | 10, 14 | Build a read-only printer MCP server over stdio and Streamable HTTP. Keep HTTP+SSE only as a legacy-compatibility exercise. |
| Chapter 4 | Multiple MCP servers, agent workflows, decisions, handoffs, monitoring, input/output guardrails | 4, 10, 11, 12 | Compare manager-style orchestration and handoffs while keeping all side effects behind one deterministic execution gateway. |
| Chapter 5 | ReAct, sequential thinking, Tree-of-Thought, Reflexion, planning | 5, 12 | Implement bounded observable variants and compare quality, cost, latency, and failure rate. Store plans and decision summaries, not hidden chain-of-thought. |
| Chapter 6 | Embeddings, vector similarity, Chroma, RAG, MCP memory, hybrid memory, recovery | 7, 8, 10 | Put Chroma behind a retrieval port, combine keyword and vector retrieval, and prove memory conflict, recovery, retention, and deletion behavior. |
| Chapter 7 | RAG grounding, output guardrails, image generation, vision critic, Phoenix tracing | 7, 10, 12, 15 | Ground printer answers with citations, test abstention, treat images as untrusted observations, and correlate retrieval, model, guardrail, and tool spans. |
| Chapter 8 | Speech, realtime image agents, Docker, idempotency, trace metadata | 4, 10, 15 | Add optional voice/vision observations, a durable idempotency store, containerization, and privacy-safe trace metadata. |
| Chapter 9 | Research state, planning, task loops, synthesis, orchestrator and collaboration loops | 3, 5, 6, 11, 15 | Create a resumable incident-investigation loop with typed state, step budgets, stagnation detection, scoped workers, and deterministic completion checks. |
| Chapter 10 | Cognitive workspace, perception, planning, execution, evaluation, attention, memory, confidence, stagnation, boundary awareness | 5, 8, 12, 16 | Implement confidence gates, known-unknown classification, contradiction handling, safe strategy changes, and permission monotonicity. |
| Chapter 11 | Persona, tools, reasoning, knowledge, memory, evaluation, support and RAG tips | 2, 4, 5, 7, 8, 12 | Convert informal tips into testable contracts, checklists, evaluation items, and release gates. |
| Chapter 12 | A2A consumer | 10, 11 | Build a typed A2A compatibility lab with authenticated identity, explicit task lifecycle, artifact validation, timeouts, and failure handling. |
| Demo project | Basic agent, reasoning, RAG, grounding and MCP | 2, 5, 7, 10 | Use only as a contrast baseline before industrial controls are added. |
| Bonus projects | Hosted/local MCP, filesystem connectors, sandbox examples, concurrent image generation | 10, 14, 15 | Compare trust boundaries, egress, filesystem scope, concurrency limits, cleanup, and sandbox selection. |

## Required source-informed labs

### 1. SDK equivalence lab

Implement one typed printer-advisor turn twice:

1. with the framework-neutral harness primitives
2. with the current OpenAI Agents SDK

Use the same input, output, tool, policy, approval, and verification contracts. Compare model calls, tool dispatch, tracing, state ownership, error handling, and framework coupling.

### 2. MCP transport and security lab

Expose the same read-only printer capabilities over:

- stdio for a local child process
- Streamable HTTP for a remote service

Add authentication, capability allowlists, schema validation, timeouts, Origin validation, localhost-only development binding, and malformed-message tests. Analyze the archive's HTTP+SSE examples only as legacy migration material.

### 3. Reasoning-pattern evaluation lab

Compare one-pass structured output, ReAct, bounded Tree-of-Thought, and bounded Reflexion on the same diagnosis dataset. Fix step, token, time, and cost budgets. Measure success, variance, unsafe actions, repeated actions, latency, and cost.

### 4. RAG and memory adapter lab

Implement keyword and vector retrieval behind stable ports. Use Chroma as one replaceable adapter. Evaluate relevance, groundedness, stale documents, malicious instructions, citations, abstention, memory conflicts, retention, deletion, and recovery.

### 5. Guardrail and execution-policy lab

Demonstrate the difference between:

- SDK input/output guardrails
- schema validation
- deterministic business policy
- human approval
- execution-boundary enforcement

Prove that bypassing a model guardrail cannot bypass printer permissions.

### 6. Orchestration and A2A lab

Compare a single-agent workflow, manager-style orchestration, handoffs, agents-as-tools, and A2A. Use typed messages, scoped context, explicit budgets, centralized execution, authenticated identity, and end-to-end traces.

### 7. Multimodal and realtime lab

Use speech or image observations to recommend a read-only diagnosis or approval request. Preserve provenance, confidence, privacy policy, and fallback behavior. Multimodal input must never directly authorize a high-risk action.

### 8. Cognitive safeguards lab

Implement confidence gating, contradiction detection, known-unknown classification, stagnation detection, and safe strategy switching. Prove that additional uncertainty can only preserve or reduce authority.

### 9. Tracing and evaluation lab

Correlate model, context, retrieval, tool, guardrail, handoff, approval, execution, and verification events. Use OpenTelemetry-compatible instrumentation and compare an external backend such as Phoenix with provider-native tracing. Redact sensitive model, tool, and audio data.

## Completion rule

A source example is considered integrated only when the corresponding original project lab has:

- learner-facing theory
- a worked example
- starter code and a reference solution
- automated tests or evaluation checks
- safety and failure-mode notes
- observable evidence
- a recovery or safe-stop path where applicable
- a short comparison explaining what was retained, changed, and rejected from the reference example

Merely linking to or running a script from the archive does not complete integration.
