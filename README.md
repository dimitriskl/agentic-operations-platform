# Agentic Operations Platform

Complete project-first, hands-on curriculum for building industrial-strength AI agents.

This repo is for learning Python only as needed to build agentic backend systems.

## Current phase

Phase 0 — Python Bridge for C# Developer.

## Learning roadmaps

The complete knowledge syllabus and its implementation path are documented in:

- [Industrial-Strength Agent Engineering Curriculum](docs/learning/industrial-strength-agent-engineering-curriculum.md)
- [3D Printer AI Agent Learning Track](docs/learning/3d-printer-agent-learning-track.md)
- [Agent Engineering Knowledge Coverage Roadmap](docs/learning/agent-engineering-knowledge-coverage.md)
- [Training Strategy](docs/context/training-strategy.md)
- [Architecture](docs/architecture.md)

The deterministic printer simulator remains the immediate next milestone. That current implementation position does not limit course coverage: every future knowledge lesson is already part of the curriculum. Advanced code is introduced progressively only after the required tests, evaluations, safety, and observability gates exist.

## Day 1 goal

Create a minimal FastAPI app with:

- health endpoint
- Pydantic response model
- pytest test
- clear project structure
- learning log

## Local setup

```bash
cd ~/code
git clone https://github.com/dimitriskl/agentic-operations-platform.git
cd agentic-operations-platform
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## Run API

```bash
source .venv/bin/activate
fastapi dev src/main.py
```

## Run tests

```bash
source .venv/bin/activate
pytest
```

## Work with Codex

```bash
cd ~/code/agentic-operations-platform
codex
```

Then ask Codex to read AGENTS.md and docs/context/codex-start-prompt.md.
