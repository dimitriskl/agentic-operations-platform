# Industrial-Strength Agent Engineering Curriculum

## Course purpose

This is the canonical knowledge curriculum for the Agentic Operations Platform.

It is a complete, hands-on path for a working software developer who wants to progress from conventional application development to designing, implementing, evaluating, securing, and operating industrial-strength AI agents.

The curriculum is broader than the current repository implementation. A lesson must remain in the curriculum even when its lab has not started. Current code progress controls sequencing; it does not control knowledge coverage.

The first applied domain is a 3D printer simulator. The engineering principles must remain transferable to other operational domains.

## Web course delivery contract

The learner-facing version of every module is implemented as an English web lesson in `course/assets/lessons.json` and served at `/course/lessons/<slug>`.

Every lesson page must combine:

1. learning outcomes and substantial written theory
2. a worked implementation example
3. an applied scenario and coding tasks
4. editable starter code with immediate structural feedback
5. progressive hints and a reference solution
6. a quiz with explanatory feedback
7. completion evidence that connects the page to real repository work

The web workspace supports reading, drafting, and formative feedback. It deliberately does not execute arbitrary learner code on the application server. Real code execution, tests, evaluations, security checks, and production evidence remain part of the repository labs.


## Course promise

A developer who completes this curriculum should be able to:

- distinguish deterministic software, LLM applications, assistants, agents, workflows, and multi-agent systems
- design a framework-neutral agent harness around a replaceable model
- build bounded tool-using agents with typed contracts and durable state
- engineer instructions, context, knowledge, memory, and reusable skills
- select isolation and permission boundaries based on threat and blast radius
- evaluate outcomes, trajectories, reliability, safety, cost, and user experience
- improve an agent harness through evidence without allowing uncontrolled self-modification
- deploy, observe, recover, govern, and safely evolve production agent systems
- explain when an agent is the wrong architecture and a deterministic workflow is better

## Audience and prerequisites

The primary learner is an experienced application developer. No prior AI-agent experience is required.

Useful prerequisites:

- general programming and API experience
- basic Python learned progressively through the project
- familiarity with automated tests, HTTP, JSON, Git, and containers
- willingness to reason explicitly about failure, security, and operations

## Coverage and implementation are separate

Every curriculum module has an independent status:

1. Knowledge lesson specified
2. Hands-on lab specified
3. Implementation started
4. Automated verification present
5. Production evidence present
6. Complete

A module is included as soon as its lesson and lab are specified. It is not considered learned or complete until its evidence requirements pass.

The immediate implementation may remain on an early stage while every later knowledge lesson is already documented here.

## Hands-on completion contract

Every substantial module must eventually produce:

1. A concise concept note in the repository.
2. A working vertical slice.
3. Typed inputs, outputs, and error contracts.
4. Automated unit, integration, or contract tests.
5. At least one evaluation scenario.
6. Observable trace, metric, or audit evidence.
7. A failure-mode and security note.
8. A short architecture or trade-off decision.
9. A recovery, rollback, or safe-stop path where applicable.
10. A demonstration that behavior is bounded and permissions cannot silently expand.

Reading or watching reference material alone does not complete a module.

## Curriculum map

| Module | Knowledge area | Primary project stages |
| --- | --- | --- |
| 0 | Reliability mindset and agent architecture | 1-18 |
| 1 | Deterministic operational foundation | 1-7 |
| 2 | Models, instructions, prompts, personas, and typed output | 8-9 |
| 3 | Harness engineering from first principles | 8-10, 15 |
| 4 | Tools, permissions, approvals, and execution policy | 3-6, 8-10 |
| 5 | Reasoning, planning, and bounded loops | 10, 16 |
| 6 | Context delivery and context management | 9-11, 13, 15 |
| 7 | Knowledge engineering and RAG | 11 |
| 8 | Memory architecture and forgetting | 11, 16 |
| 9 | Skills as reusable procedural knowledge | 11, 15 |
| 10 | MCP, A2A, adapters, and multimodal integration | 12-13 |
| 11 | Multi-agent architecture and orchestration | 13 |
| 12 | Evaluation, reliability, and feedback | 7, 14-16 |
| 13 | Safe harness self-improvement | 14-16 |
| 14 | Sandboxing, security, and blast-radius control | 4-5, 12, 15, 17 |
| 15 | Deployment, observability, resilience, and cost | 6, 14-17 |
| 16 | Cognitive safeguards, human operations, and governance | 5, 14-17 |
| 17 | Production capstone and architecture transfer | 18 |

## Module 0 — Reliability mindset and agent architecture

### Knowledge lessons

- probabilistic model behavior inside deterministic software boundaries
- differences between an LLM feature, assistant, autonomous agent, deterministic workflow, and multi-agent system
- sense, decide, plan, act, observe, evaluate, and learn as observable system activities
- the agent as a replaceable model surrounded by a harness and an operator interface
- separation of policy, orchestration, tool execution, state, memory, and presentation
- framework-neutral interfaces before SDK-specific integration
- deciding when not to use an agent
- failure domains, trust boundaries, and defense in depth
- industrial-strength meaning: bounded, observable, testable, recoverable, secure, and economically operable

### Hands-on lab

Create an architecture map for the printer platform. Mark deterministic components, probabilistic components, trust boundaries, approval points, persistent state, external dependencies, and recovery paths.

### Completion evidence

- architecture diagram and short ADR
- comparison of deterministic workflow, single agent, and multi-agent alternatives
- explicit list of actions that must never be delegated to model judgment alone

## Module 1 — Deterministic operational foundation

### Knowledge lessons

- domain modeling and state machines
- typed commands, events, results, and errors
- invariants and transition guards
- idempotency and duplicate-request handling
- deterministic policy before model recommendation
- test pyramids, fixtures, scenario tests, and failure injection
- auditability as a design property
- simulators and emulators as safety infrastructure

### Hands-on lab

Build and test the printer simulator, API, risk policy, approval flow, audit log, and baseline scenario evaluator without an LLM.

### Completion evidence

- deterministic transition tests
- forbidden-action tests
- idempotency and replay tests
- audit records that reconstruct every important state change

## Module 2 — Models, instructions, prompts, personas, and typed output

### Knowledge lessons

- model capabilities, limits, context windows, sampling, latency, and cost
- stateless inference and application-managed conversation history
- system, developer, user, tool, and retrieved-content instruction boundaries
- instruction priority and resistance to untrusted instructions
- persona as an operational contract, not decorative prose
- structured output, schema validation, retries, repair, and safe failure
- model selection and routing by risk, capability, latency, privacy, and cost
- versioning prompts, models, policies, and output schemas
- provider-neutral adapters and replaceable SDK integrations
- concise decision summaries without depending on hidden chain-of-thought

### Hands-on lab

Build a read-only printer advisor that returns a validated recommendation contract. Compare at least two model configurations with the deterministic policy.

### Completion evidence

- versioned instruction and persona artifacts
- schema-conformance and invalid-output tests
- prompt-injection test cases
- latency, cost, quality, and safety comparison

## Module 3 — Harness engineering from first principles

### Knowledge lessons

- the model as one stateless primitive inside a larger system
- instructions, context delivery, context management, tools, execution environments, durable state, orchestration, sub-agents, skills, verification, observability, and operator interfaces
- raw model call, conversation history, tool dispatch, and action-observation loop
- control plane versus execution plane
- durable sessions and resumable work
- verification before declaring completion
- how SDKs implement primitives and where abstraction can hide risk
- how harness design, rather than model changes alone, drives reliability
- architecture evolution without coupling the entire system to one framework

### Hands-on lab

Implement a minimal framework-neutral agent loop before using a high-level agent SDK. Add history, one safe tool, an approval boundary, durable session state, verification, and tracing one primitive at a time.

### Completion evidence

- sequence diagram of the complete turn
- trace linking model request, tool proposal, approval, execution, verification, and result
- recovery test after interruption
- comparison with an SDK implementation using the same contracts

## Module 4 — Tools, permissions, approvals, and execution policy

### Knowledge lessons

- tool purpose, schema, description, discovery, and selection
- read, propose, write, privileged, and forbidden capabilities
- capability allowlists and deny-by-default registries
- validation, normalization, preconditions, postconditions, and side-effect classification
- confirmation and human approval at the actual side-effect boundary
- approval fatigue, batching risks, delegated authority, and expiry
- credentials scoped to tools rather than exposed to models
- timeouts, retries, idempotency keys, compensation, and partial failure
- result provenance and untrusted tool output
- policy enforcement outside model prompts

### Hands-on lab

Expose printer operations through a typed tool registry and centralized execution gateway. Require human approval for risky actions and block arbitrary G-code.

### Completion evidence

- tool contract tests
- permission-escalation tests
- expired, rejected, edited, and duplicate approval cases
- audit linkage from proposal to final side effect

## Module 5 — Reasoning, planning, and bounded loops

### Knowledge lessons

- ReAct-style observable action and observation cycles
- explicit planning and plan revision
- sequential decomposition, search, reflection, and critique patterns
- Tree-of-Thought and Reflexion trade-offs
- inner, task, and orchestration loops
- termination gates, iteration ceilings, token budgets, time budgets, and cost budgets
- repeated-action, stagnation, and no-progress detection
- safe strategy switching and human escalation
- verification checkpoints and recovery after tool failure
- when a fixed workflow is safer and simpler than free-form planning

### Hands-on lab

Build a bounded printer-diagnosis loop that records plans and actions, stops deterministically, detects repetition, and escalates unresolved cases.

### Completion evidence

- loop-budget and termination tests
- one-pass versus iterative-diagnosis evaluation
- trace showing revision after a failed observation
- proof that additional iterations cannot expand permissions

## Module 6 — Context delivery and context management

### Knowledge lessons

- distinction between instructions, context delivery, RAG, memory, and context management
- the four context operations: select, compress, write or persist, and isolate
- context failure modes: poisoning, distraction, confusion, and conflict
- relevance, recency, authority, priority, and token-budget selection
- position effects and information lost in the middle of long contexts
- compaction strategies, summaries, invariants, open decisions, and head-tail preservation
- writing durable intermediate artifacts instead of keeping everything in the prompt
- sub-agent context isolation and scoped handoffs
- tool selection degradation as available tools grow
- prompt-cache behavior, reshuffling cost, latency, and cache-aware context construction
- observing and testing the exact context delivered to the model
- research, plan, implement, verify as a context-preserving workflow

### Hands-on lab

Create a long-running printer investigation that deliberately accumulates noisy context. Implement select, compress, persist, and isolate strategies, then compare quality, latency, token use, and cache behavior.

### Completion evidence

- context manifest for every model call
- tests for conflicting and poisoned context
- lost-in-the-middle regression scenario
- compaction quality evaluation
- report comparing context strategies and costs

## Module 7 — Knowledge engineering and RAG

### Knowledge lessons

- authoritative knowledge sources and provenance
- document ingestion, parsing, normalization, chunking, and metadata
- embeddings, semantic search, keyword search, filters, reranking, and hybrid retrieval
- retrieval query construction and multi-step retrieval
- grounding, citations, evidence sufficiency, and abstention
- freshness, re-indexing, versioning, deletion, and access control
- retrieval poisoning and malicious document content
- evaluation of relevance, recall, precision, groundedness, and unsupported claims
- knowledge graphs and structured retrieval where appropriate
- choosing RAG, tools, memory, fine-tuning, or deterministic lookup

### Hands-on lab

Build a printer-manual and safety-procedure RAG service with citations, authority ranking, hybrid retrieval, and unsupported-answer refusal.

### Completion evidence

- versioned corpus and ingestion report
- retrieval and groundedness eval set
- malicious-document and stale-document tests
- citation trace from answer back to source chunks

## Module 8 — Memory architecture and forgetting

### Knowledge lessons

- working or session memory
- episodic memory of prior events and incidents
- semantic memory of facts and concepts
- procedural memory of how work is performed
- memory read, write, update, merge, conflict, and deletion policies
- salience, relevance, confidence, provenance, and authority
- consolidation, compression, retention, expiry, and deliberate forgetting
- conflict resolution between memory, current state, and authoritative sources
- privacy, consent, tenancy, access control, and right-to-delete concerns
- memory poisoning and incorrect experience generalization
- evaluating retrieval, usefulness, conflicts, leakage, and forgetting

### Hands-on lab

Add session and episodic printer memory. Create conflicting memories and prove that current device state and authoritative safety documentation win.

### Completion evidence

- memory schema and lifecycle policy
- retention and deletion tests
- conflict-resolution scenarios
- memory usefulness and contamination evaluation

## Module 9 — Skills as reusable procedural knowledge

### Knowledge lessons

- difference between prompts, tools, workflows, skills, and procedural memory
- a skill contract: trigger, inputs, preconditions, process, outputs, and failure modes
- packaging instructions, examples, scripts, templates, checklists, and references
- progressive disclosure and progressive loading
- context-efficient discovery and activation
- narrow boundaries, least privilege, and explicit non-goals
- skill ownership, review, versioning, compatibility, and deprecation
- measuring skill precision, recall, reliability, latency, and cost
- detecting stale procedures and dangerous broad skills
- skills as living engineering artifacts improved through evaluation evidence

### Hands-on lab

Package a printer-incident-review skill with a clear trigger, typed input, procedure, output format, scripts, safety boundaries, and progressive loading.

### Completion evidence

- versioned skill package
- trigger and non-trigger tests
- before-and-after evaluation against an unstructured prompt
- owner, change log, compatibility policy, and rollback path

## Module 10 — MCP, A2A, adapters, and multimodal integration

### Knowledge lessons

- MCP clients, servers, tools, resources, prompts, transports, and discovery
- local versus remote transport and trust boundaries
- MCP authentication, authorization, capability allowlists, and failure handling
- contract versioning and compatibility
- A2A capability discovery, task lifecycle, messages, artifacts, and boundaries
- typed adapters around vendor and hardware APIs
- voice and vision input as untrusted observations
- multimodal confidence, provenance, latency, privacy, and fallback
- integration testing with simulators, emulators, and unavailable dependencies

### Hands-on lab

Expose safe printer capabilities through MCP, consume them through the agent harness, and add an optional image-based observation that can recommend but cannot directly execute a risky action.

### Completion evidence

- MCP discovery and invocation contract tests
- malformed and unavailable server tests
- capability and authorization matrix
- multimodal uncertainty and fallback scenarios

## Module 11 — Multi-agent architecture and orchestration

### Knowledge lessons

- sequential flows, coordinator-worker patterns, parallel fan-out, and collaborative teams
- task decomposition and capability-based routing
- typed messages, handoffs, artifacts, shared state, and shared memory
- context isolation and least-knowledge delegation
- centralized execution and approval boundaries
- agent identity, authentication, budgets, and tenancy
- cascading error, coordination overhead, deadlock, duplication, and failure amplification
- verification and guardrails at every handoff
- deterministic workflow and single-agent comparison
- tracing across agent and protocol boundaries

### Hands-on lab

Build a small incident flow with monitor, diagnostician, and safety reviewer roles. Keep all device actions behind one policy and execution gateway.

### Completion evidence

- typed handoff contracts
- end-to-end multi-agent trace
- deadlock, duplicate-work, and failed-handoff tests
- quality, latency, cost, and failure comparison with a single-agent design

## Module 12 — Evaluation, reliability, and feedback

### Knowledge lessons

- evaluation datasets, items, expected behavior, graders, metrics, scores, and runs
- deterministic tests versus probabilistic evaluations
- outcome, trajectory, reliability, safety, cost, latency, and user-experience metrics
- tool-choice, argument, state-transition, approval, groundedness, and policy metrics
- repeated trials, variance, pass-at-k, and pass-to-the-k reliability
- safe abstention versus confidently wrong output
- deterministic graders before model-based judges
- LLM judges, bias, calibration against human labels, and disagreement review
- session, trace, long-horizon, and weighted-checkpoint evaluation
- fault injection and recovery evaluation
- prompt, model, tool, skill, memory, policy, and harness behavior drift
- fingerprinted datasets, configurations, traces, and result artifacts
- release gates, regression budgets, and disputed-outcome workflows
- using failure and fallback logs to choose the next engineering improvement

### Hands-on lab

Create a versioned evaluation harness for the printer agent. Run repeated trials, inject faults, measure confident errors and abstentions, and compare two harness versions.

### Completion evidence

- reproducible, fingerprinted evaluation runs
- calibrated deterministic and model-based graders
- reliability and variance report
- release gate that blocks safety or behavior regressions

## Module 13 — Safe harness self-improvement

### Knowledge lessons

- improving the harness instead of silently changing model behavior
- failure clustering and weakness mining from traces, evals, incidents, and fallbacks
- defining editable surfaces: instructions, context rules, tool descriptions, schemas, skills, policies, and routing
- immutable safety boundaries and surfaces that an agent may never edit
- proposing candidate changes without applying them
- isolated branches or sandboxes for candidate implementation
- targeted tests plus full regression evaluation
- human review, audit, provenance, and approval
- scheduled or manually triggered improvement cycles
- staged rollout, canary comparison, monitoring, rollback, and kill switches
- avoiding reward hacking, evaluation overfitting, feedback loops, and self-approval
- separating proposer, evaluator, approver, and deployer authority

### Hands-on lab

Mine recurring printer-agent failures and generate a candidate harness change. Test it in isolation, compare it with the baseline, require human approval, and simulate rollback. The agent must never deploy its own change.

### Completion evidence

- weakness report linked to traces and eval cases
- candidate patch with declared editable surface
- independent regression results
- approval record, staged-release plan, and rollback proof

## Module 14 — Sandboxing, security, and blast-radius control

### Knowledge lessons

- prompt instructions versus enforceable containment
- threat modeling models, users, retrieved content, tools, dependencies, and external services
- attack surface created by file access, code execution, package installation, child processes, network access, and credentials
- runtime isolation with V8-style language isolates and WebAssembly
- operating-system sandboxing and syscall boundaries
- Docker containers and their limits
- user-space kernels such as gVisor
- microVM isolation such as Firecracker-style designs
- choosing isolation by threat, cost, latency, compatibility, and developer experience
- filesystem, process, network, device, identity, secret, and tenant isolation
- egress allowlists and data-exfiltration prevention
- tool registries, credential brokers, and short-lived scoped credentials
- prompt injection, indirect injection, confused deputy, dependency, and supply-chain attacks
- approval fatigue and why approval alone is not containment
- blast-radius analysis, quotas, cleanup, and post-run destruction
- security logging, incident response, and forensic evidence

### Hands-on lab

Create a sandbox decision matrix and run the same controlled file, process, and network operations through at least two isolation configurations. Prove denied access and cleanup.

### Completion evidence

- threat model and attack-surface inventory
- sandbox decision record
- escape, egress, secret, and permission tests
- measured isolation, startup latency, runtime cost, and compatibility
- blast-radius and incident-response drill

## Module 15 — Deployment, observability, resilience, and cost

### Knowledge lessons

- synchronous APIs, asynchronous jobs, queues, workers, and event-driven execution
- durable state, checkpoints, resumability, idempotency, and recovery
- containerization and environment parity
- health, readiness, dependency, and degradation signals
- logs, metrics, traces, spans, correlation identifiers, and OpenTelemetry
- tracing model calls, context composition, retrieval, tools, approvals, handoffs, and verification
- service-level indicators and objectives
- timeouts, retries, backoff, fallbacks, circuit breakers, bulkheads, and dead-letter handling
- rate limits, concurrency, quotas, and backpressure
- model routing, caching, batching, and token, latency, and monetary budgets
- versioned releases for code, prompts, models, policies, tools, skills, and data
- canary rollout, compatibility, migration, rollback, and disaster recovery
- scaling stateless and stateful agent components
- privacy, data residency, tenancy, backup, and retention
- operational dashboards, alerts, on-call runbooks, and incident review

### Hands-on lab

Containerize the platform and emulator, add correlated tracing, inject dependency failures, enforce budgets, and recover an interrupted long-running task.

### Completion evidence

- deployment and rollback procedure
- failure-injection and recovery report
- cost and latency budget report
- observable request-to-action trace
- runbook with alerts and operator actions

## Module 16 — Cognitive safeguards, human operations, and governance

### Knowledge lessons

- perception, planning, execution, evaluation, attention, knowledge, and memory as separable responsibilities
- confidence, uncertainty, known-unknown classification, and calibrated abstention
- confidence-gated execution and human escalation
- stagnation detection and safe strategy changes
- permission monotonicity: uncertainty can only reduce authority
- human-in-the-loop, human-on-the-loop, and human-out-of-the-loop boundaries
- operator interfaces, explanations, evidence, and override
- policy-as-code, identity, separation of duties, and audit
- model and data governance, privacy, documentation, and accountability
- incident classification, emergency stop, post-incident review, and corrective action
- accessibility and usability of approval and monitoring experiences
- measuring intervention load, automation bias, and approval quality

### Hands-on lab

Add confidence gating, known-unknown classification, operator escalation, emergency stop, and policy evidence to the printer platform.

### Completion evidence

- low-confidence and conflicting-evidence tests
- proof that uncertainty cannot increase permissions
- operator-response and emergency-stop drill
- governance checklist and audit report

## Module 17 — Production capstone and architecture transfer

### Knowledge lessons

- combining deterministic workflows, agent reasoning, tools, context, memory, skills, protocols, evaluation, security, and operations
- architecture fitness functions and production readiness reviews
- maintainability, replaceability, and framework-exit strategy
- runbooks, threat models, ADRs, evaluation reports, and service ownership
- transferring architecture without copying domain assumptions

### Hands-on lab

Complete a production-shaped printer-agent platform and then implement a smaller vertical slice in a second operational domain.

### Completion evidence

- working capstone with full automated verification
- production readiness review
- reliability, safety, security, cost, and maintainability report
- operational runbook and incident drill
- second-domain comparison proving which components transfer and which remain domain-specific

## Required cross-cutting lesson artifacts

The repository should eventually contain reusable lesson artifacts for:

- architecture diagrams and ADRs
- concept notes and terminology
- code labs with learner checkpoints
- unit, integration, contract, security, and recovery tests
- versioned evaluation datasets and results
- traces and observability examples
- threat models and safety checklists
- cost and latency reports
- operator runbooks
- reflection questions and trade-off exercises

## Teaching order rule

Knowledge coverage is complete in this document from the beginning, but implementation remains progressive:

1. deterministic simulator
2. tools and safety policy
3. approval and audit
4. baseline evaluations
5. minimal observable single agent
6. harness, context, knowledge, memory, and skills
7. protocols and multi-agent patterns
8. production evaluation, safe improvement, sandboxing, and operations
9. real hardware only after all required safety gates
10. capstone and transfer

Advanced lessons must not be deleted or postponed out of the curriculum merely because the code has not reached them.

## Reference-material rule

Books, videos, courses, research papers, and official documentation are supporting references. The curriculum remains framework-neutral and independent of any one source.

Topic coverage is informed by:

- AI-agent engineering books, including the areas covered by *AI Agents in Action, Second Edition*
- the supplied book source-code package, mapped through [AI Agents in Action Source Code Learning Map](ai-agents-in-action-source-code-learning-map.md)
- the Agentic Harness Masterclasses playlist topics: harness engineering, agent primitives, self-improvement, memory, context management, skills, sandboxing, and evaluation
- official protocol, framework, security, and deployment documentation used at the time each lab is implemented

No source is treated as a substitute for project evidence.
