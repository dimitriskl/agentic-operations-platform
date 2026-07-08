from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Agentic Operations Platform", version="0.1.0")


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str


class OperationsRequest(BaseModel):
    message: str
    source: str


class RequestClassificationResponse(BaseModel):
    intent: str
    risk_level: str
    requires_approval: bool


def classify_request(request: OperationsRequest) -> RequestClassificationResponse:
    normalized_message = request.message.lower()

    if "cold" in normalized_message or "hot" in normalized_message:
        intent = "temperature_issue"
    else:
        intent = "general_request"

    return RequestClassificationResponse(
        intent=intent,
        risk_level="low",
        requires_approval=False,
    )


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="agentic-operations-platform",
        version="0.1.0",
    )


@app.post("/classify", response_model=RequestClassificationResponse)
async def classify(request: OperationsRequest) -> RequestClassificationResponse:
    return classify_request(request)
