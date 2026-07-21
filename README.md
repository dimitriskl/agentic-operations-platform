# Agentic Operations Platform

Complete project-first, hands-on curriculum for building industrial-strength AI agents.

This repo is for learning Python only as needed to build agentic backend systems.

## Start here — Lesson 0

The course assumes the learner may have a clean computer with no development tools installed.

Before starting Python or agent lessons, complete:

- [Lesson 0 — Environment Setup on Windows and Ubuntu](docs/learning/lesson-00-environment-setup.md)

Lesson 0 covers:

- installing Git
- installing Python
- using PowerShell on Windows
- using Bash on Ubuntu
- cloning the repository
- creating and activating a virtual environment
- installing dependencies
- running tests
- starting the FastAPI application
- opening the interactive course
- understanding what every command and important argument means

## Interactive web course

The complete curriculum is available as an English web course at:

```text
/course
```

Every lesson has a stable web page with:

- substantial theory and learning outcomes
- a worked code example
- a hands-on implementation task
- an editable browser workspace with structural checks, hints, and a reference solution
- a knowledge quiz
- explicit completion evidence

Browser drafts and progress stay on the learner's device. The browser workspace does not execute arbitrary Python on the server; learners run the real lab tests inside the repository.

## Run the course on Windows PowerShell

From inside the cloned repository:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pytest
python -m fastapi dev src/main.py
```

Then open:

```text
http://127.0.0.1:8000/course
```

For explanations and troubleshooting, follow Lesson 0 rather than copying these commands blindly.

## Run the course on Ubuntu

From inside the cloned repository:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pytest
python -m fastapi dev src/main.py
```

Then open:

```text
http://127.0.0.1:8000/course
```

For explanations and troubleshooting, follow Lesson 0 rather than copying these commands blindly.

## Course-wide teaching rule

Every terminal command in every lesson must explain:

1. why the command is needed
2. which program executes it
3. what every important option and argument means
4. what it changes
5. what successful output should look like
6. common errors and how to recover

The course must never assume that the learner already has Git, Python, a virtual environment, dependencies, or a preferred terminal configured.

## Current phase

Phase 0 — Python Bridge for C# Developer.

## Learning roadmaps

The complete knowledge syllabus and its implementation path are documented in:

- [Lesson 0 — Environment Setup](docs/learning/lesson-00-environment-setup.md)
- [Industrial-Strength Agent Engineering Curriculum](docs/learning/industrial-strength-agent-engineering-curriculum.md)
- [AI Agents in Action Source Code Learning Map](docs/learning/ai-agents-in-action-source-code-learning-map.md)
- [3D Printer AI Agent Learning Track](docs/learning/3d-printer-agent-learning-track.md)
- [Agent Engineering Knowledge Coverage Roadmap](docs/learning/agent-engineering-knowledge-coverage.md)
- [Training Strategy](docs/context/training-strategy.md)
- [Architecture](docs/architecture.md)

The deterministic printer simulator remains the immediate next milestone. That current implementation position does not limit course coverage: every future knowledge lesson is already part of the curriculum. Advanced code is introduced progressively only after the required tests, evaluations, safety, and observability gates exist.

## Day 1 goal

After Lesson 0, create a minimal FastAPI app with:

- health endpoint
- Pydantic response model
- pytest test
- clear project structure
- learning log

## Work with Codex

### Windows PowerShell

```powershell
Set-Location "$HOME\code\agentic-operations-platform"
codex
```

### Ubuntu

```bash
cd ~/code/agentic-operations-platform
codex
```

Then ask Codex to read `AGENTS.md` and `docs/context/codex-start-prompt.md`.
