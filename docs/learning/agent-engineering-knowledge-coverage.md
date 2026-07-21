# Agent Engineering Knowledge Coverage Roadmap

## Purpose

This roadmap extends the project-first 3D printer learning track so the Agentic Operations Platform eventually covers the durable engineering knowledge needed to design, build, evaluate, secure, and deploy reliable AI agents.

The roadmap is informed by the topic coverage of *AI Agents in Action, Second Edition*, but the project remains independent of the book and does not copy its text or examples. Every topic must become working project output, not passive theory.

## Canonical lesson catalog

The complete course is maintained in:

~~~text
docs/learning/industrial-strength-agent-engineering-curriculum.md
~~~

That curriculum is the source of truth for knowledge coverage. It contains the full lesson catalog, hands-on lab, and completion evidence for every module. Curriculum coverage is independent of current code progress: a future topic remains part of the course even when its implementation has not started.

## Non-negotiable learning rules

- Keep the 3D printer simulator as the first operational domain.
- Learn framework-neutral concepts before SDK-specific implementation.
- Do not jump to multi-agent orchestration before a reliable single agent exists.
- Do not connect real hardware before deterministic behavior, approvals, audit, evaluations, and production safety controls pass.
- Every topic must produce code, tests or evaluations, and a short design note.
- Record concise decision summaries and traces; do not depend on hidden chain-of-thought.
- Tool permissions must be explicit and least-privilege.

## Existing strong coverage

The current learning track already covers:

- deterministic state and transitions
- typed inputs and outputs
- tool schemas and a tool registry
- risk classification
- human approval
- audit logging
- baseline evaluation scenarios
- a structured-output recommendation agent
- printer adapter abstraction
- OctoPrint or Moonraker/Klipper integration
- real-hardware safety boundaries

## Core knowledge areas covered

### 1. Agent foundations and persona

Learn:

- differences between LLM applications, assistants, and agents
- sense-plan-act-learn as an observable engineering loop
- model parameters and their operational trade-offs
- prompt and persona design
- typed outputs and validation
- agent and tool tracing
- minimal OpenAI Agents SDK integration after framework-neutral interfaces exist

Required project output:

- traced single-agent printer advisor
- versioned persona and prompt files
- typed recommendation schema
- tests for invalid or incomplete model output
- comparison between deterministic policy and model recommendation

### 2. Model Context Protocol

Learn:

- MCP clients, servers, tools, resources, and prompts
- local and remote transport choices
- converting existing printer tools into an MCP server
- consuming MCP tools through the agent runtime
- authentication, authorization, and deployment boundaries

Required project output:

- printer MCP server over a safe local transport
- MCP client adapter
- contract tests for tool discovery and invocation
- explicit allowlist of exposed printer capabilities
- failure handling for unavailable or malformed MCP services

### 3. Reasoning, planning, and agentic loops

Learn:

- ReAct as reasoning plus observable action/observation cycles
- planning and plan revision
- Tree-of-Thought, Reflexion, and sequential-thinking trade-offs
- inner, task, and orchestration loops
- termination gates, iteration limits, timeouts, token and cost budgets
- stagnation and repeated-action detection

Required project output:

- bounded printer-diagnosis loop
- explicit plan and action records
- deterministic termination criteria
- loop-budget and repeated-action tests
- evaluation comparing simple recommendation with iterative diagnosis

### 4. Knowledge, memory, and RAG

Learn:

- document ingestion, chunking, embeddings, and retrieval
- semantic, keyword, and hybrid search
- grounding answers in manuals and troubleshooting documents
- session, semantic, episodic, and procedural memory
- memory relevance, compression, retention, and forgetting
- separation of authoritative knowledge from remembered experience

Required project output:

- RAG over printer manuals and safety procedures
- citations to retrieved evidence
- session memory for the current print job
- episodic memory for past incidents
- retention and deletion policy
- tests for irrelevant retrieval and unsupported recommendations

### 5. Multi-agent systems and A2A

Learn:

- sequential agent flows
- coordinator/worker orchestration
- collaborative agent teams
- handoffs, message passing, shared state, and shared memory
- A2A capability discovery and communication boundaries
- input/output guardrails at every handoff
- when a deterministic workflow is better than multiple agents

Required project output:

- small printer incident flow with monitor, diagnostician, and safety reviewer roles
- typed handoff contracts
- centralized approval and tool-execution boundary
- comparison against an equivalent single-agent or deterministic flow
- latency, cost, and failure-amplification evaluation

### 6. Advanced evaluation and feedback

Learn:

- test-driven agent development
- scenario datasets and rubrics
- grounding, critic, and evaluator agents
- human feedback and annotations
- session and trace evaluation
- regression suites for prompts, tools, models, and policies

Required project output:

- versioned evaluation dataset
- deterministic and model-based evaluators
- groundedness, tool-choice, safety, and task-success metrics
- human-review workflow for disputed outcomes
- release gate that blocks safety regressions

### 7. Deployment, observability, security, and cost

Learn:

- hosting agents behind APIs
- Docker and Docker Compose
- state, memory, idempotency, and resumability
- release engineering for prompts, tools, policies, and models
- traces, metrics, logs, and correlation identifiers
- timeouts, retries, fallbacks, circuit breakers, and budgets
- model routing and cost controls
- identity, secrets, sandboxing, and egress restrictions
- prompt-injection and data-exfiltration defenses
- governance and policy enforcement

Required project output:

- containerized platform and emulator
- health, readiness, and dependency checks
- end-to-end correlation from request to tool action
- failure-injection tests
- threat model and security checklist
- cost and latency budget dashboard or report
- rollback procedure for agent configuration releases

### 8. Cognitive and metacognitive safeguards

Learn:

- perception, planning, execution, evaluation, attention, and memory modules
- confidence-gated execution
- knowledge-boundary awareness
- stagnation detection and strategy switching
- measuring cognitive efficiency without granting uncontrolled autonomy

Required project output:

- confidence threshold that routes uncertain actions to a human
- known/unknown classification
- strategy-pivot rule for stalled diagnosis
- metrics for success, iterations, interventions, latency, and cost
- tests proving that low confidence cannot expand permissions

### 9. Capstone and transfer

Complete the learning path with:

- one production-shaped printer-agent capstone
- one second operational domain to prove the architecture transfers
- an architecture decision record comparing deterministic workflows, single agents, and multi-agent systems
- an operational runbook
- a final evaluation report covering reliability, safety, security, cost, and maintainability

## Industrial-strength harness additions

The curriculum explicitly includes the following areas in addition to the original book-oriented roadmap.

### Harness engineering as an architecture discipline

- model, harness, and operator-interface boundaries
- instructions, context, tools, execution environment, durable state, orchestration, skills, verification, and observability
- a minimal framework-neutral agent loop built from primitives before SDK abstraction
- control-plane and execution-plane separation
- resumability and recovery

Canonical lessons: Modules 0 and 3.

### Context engineering

- select, compress, persist, and isolate as explicit context operations
- poisoning, distraction, confusion, and conflict failure modes
- information lost in the middle of long contexts
- tool selection degradation
- context manifests and inspection of the exact model input
- prompt-cache latency and cost trade-offs
- context-preserving research, planning, implementation, and verification workflows

Canonical lesson: Module 6.

### Skills as reusable procedural knowledge

- trigger, inputs, preconditions, procedure, output contract, and failure modes
- progressive disclosure and loading
- focused boundaries, least privilege, ownership, versioning, and deprecation
- skill-specific evaluation, regression, and rollback
- detection of stale or over-broad procedures

Canonical lesson: Module 9.

### Layered sandboxing and blast radius

- language isolates and WebAssembly
- operating-system sandboxing and syscall boundaries
- Docker, user-space kernels, and microVM trade-offs
- filesystem, process, network, device, secret, and tenant isolation
- permission fatigue, tool attack surface, egress controls, cleanup, and incident evidence
- a sandbox decision matrix based on threat, latency, cost, compatibility, and developer experience

Canonical lesson: Module 14.

### Safe harness self-improvement

- weakness mining from traces, evaluations, incidents, and fallback logs
- explicit editable and immutable surfaces
- candidate changes proposed but never self-deployed
- isolated implementation and independent regression evaluation
- human review, staged release, monitoring, rollback, and kill switches
- separation of proposer, evaluator, approver, and deployer authority

Canonical lesson: Module 13.

### Industrial reliability evaluation

- outcome, trajectory, reliability, safety, cost, latency, and experience metrics
- repeated trials, variance, pass-at-k, and pass-to-the-k
- safe abstention versus confidently wrong output
- calibrated model-based judges backed by human labels
- long-horizon checkpoints, fault injection, recovery, and behavior-drift detection
- fingerprinted datasets, configurations, traces, and result artifacts

Canonical lesson: Module 12.

### Memory conflict resolution

- conflict handling between session, episodic, semantic, and procedural memory
- authority, provenance, confidence, recency, and current device state
- memory consolidation, retention, deletion, forgetting, poisoning, and leakage
- evaluation of usefulness, contamination, conflicts, and correct forgetting

Canonical lesson: Module 8.

## Coverage completion criteria

A knowledge area is complete only when the repository contains:

1. A working vertical slice.
2. Automated tests.
3. At least one evaluation scenario.
4. Observable traces or audit evidence.
5. A short design or trade-off note.
6. Security and failure considerations.
7. A demonstration that the behavior is bounded and recoverable.

## Sequencing rule

The immediate next work remains the deterministic printer simulator. This roadmap controls future implementation scope without limiting lesson coverage. All industrial-strength knowledge lessons remain in the canonical curriculum from the beginning, even when their code labs are scheduled for later.
