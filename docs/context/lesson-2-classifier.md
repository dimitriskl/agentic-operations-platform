# Lesson 2 — Pydantic Request Models and a Rule-Based Classifier

Status: done

## Goal

Build the first small piece of agent-like backend behavior without using an LLM.

The API should accept an operations message and classify it with simple Python rules.

## Why this lesson matters

Reliable agent backends are not only prompts.

They need normal backend pieces first:

- request DTOs
- response DTOs
- domain functions
- API routes
- tests

## Files to edit

- `src/main.py`
- `tests/test_health.py` or a new `tests/test_classify.py`
- `docs/learning-log.md`

## Target behavior

Add a `POST /classify` endpoint.

Example request:

```json
{
  "message": "The freezer is too cold",
  "source": "email"
}
```

Example response:

```json
{
  "intent": "temperature_issue",
  "risk_level": "low",
  "requires_approval": false
}
```

## Implementation steps

1. Fix or add `OperationsRequest`.
2. Fix or add `RequestClassificationResponse`.
3. Write `classify_request(request: OperationsRequest)`.
4. Add `POST /classify`.
5. Add one representative classifier test for a temperature message.
6. Update the learning log.

## Python concepts

`def classify_request(...)` defines a function.

Type hints such as `request: OperationsRequest` and `-> RequestClassificationResponse`
are similar to C# parameter and return types, but Python checks them mostly with tools
and readability, not at runtime by default.

`request.message.lower()` creates a lowercase copy of the string, similar to
`request.Message.ToLowerInvariant()` in C#.

`if "cold" in normalized_message` checks whether a substring exists inside a string,
similar to `normalizedMessage.Contains("cold")` in C#.

## C# analogies

- Pydantic model: DTO or record with validation.
- FastAPI route: controller action.
- Plain function: small domain service method.
- pytest function: xUnit test method.

## Done means

- `/health` still works.
- `/classify` works.
- Tests pass.
- Learning log explains what was learned.
