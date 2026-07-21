from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


PROJECT_ROOT = Path(__file__).resolve().parent.parent
COURSE_DIR = PROJECT_ROOT / "course"

app = FastAPI(title="Agentic Operations Platform", version="0.2.0")
app.mount(
    "/course/assets",
    StaticFiles(directory=COURSE_DIR / "assets"),
    name="course-assets",
)


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


@app.get("/", include_in_schema=False)
async def home() -> RedirectResponse:
    return RedirectResponse(url="/course")


@app.get("/course", include_in_schema=False)
async def course_home() -> FileResponse:
    return FileResponse(COURSE_DIR / "index.html")


@app.get("/course/lessons/{lesson_slug}", include_in_schema=False)
async def course_lesson(lesson_slug: str) -> FileResponse:
    # The browser application validates the slug against the lesson catalog.
    return FileResponse(COURSE_DIR / "index.html")


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="agentic-operations-platform",
        version="0.2.0",
    )


@app.post("/classify", response_model=RequestClassificationResponse)
async def classify(request: OperationsRequest) -> RequestClassificationResponse:
    return classify_request(request)
