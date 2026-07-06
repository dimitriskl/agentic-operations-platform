from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Agentic Operations Platform", version="0.1.0")


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="agentic-operations-platform",
        version="0.1.0",
    )
