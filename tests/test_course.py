import json
from pathlib import Path

from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)
project_root = Path(__file__).resolve().parent.parent


def test_course_home_returns_the_interactive_shell() -> None:
    response = client.get("/course")

    assert response.status_code == 200
    assert "Industrial-Strength AI Agents" in response.text
    assert "course-app" in response.text


def test_lesson_url_returns_the_same_course_shell() -> None:
    response = client.get("/course/lessons/context-engineering")

    assert response.status_code == 200
    assert "course-app" in response.text


def test_course_assets_are_served() -> None:
    response = client.get("/course/assets/app.js")

    assert response.status_code == 200
    assert "COURSE_DATA_URL" in response.text


def test_course_catalog_contains_eighteen_theory_and_practice_lessons() -> None:
    catalog_path = project_root / "course" / "assets" / "lessons.json"
    lessons = json.loads(catalog_path.read_text(encoding="utf-8"))["lessons"]

    assert len(lessons) == 18
    assert [lesson["module"] for lesson in lessons] == list(range(18))
    assert len({lesson["slug"] for lesson in lessons}) == 18
    assert all(len(lesson["theory"]) >= 3 for lesson in lessons)
    assert all(lesson["practice"]["starterCode"] for lesson in lessons)
    assert all(lesson["quiz"]["options"] for lesson in lessons)
    assert all(lesson["completionEvidence"] for lesson in lessons)


def test_every_lesson_is_a_complete_english_theory_and_practice_page() -> None:
    catalog_path = project_root / "course" / "assets" / "lessons.json"
    lessons = json.loads(catalog_path.read_text(encoding="utf-8"))["lessons"]

    for lesson in lessons:
        theory_text = " ".join(
            paragraph
            for section in lesson["theory"]
            for paragraph in [*section["paragraphs"], section["takeaway"]]
        )
        quiz = lesson["quiz"]
        practice = lesson["practice"]

        assert len(theory_text.split()) >= 175, lesson["slug"]
        assert all(len(section["paragraphs"]) >= 2 for section in lesson["theory"])
        assert lesson["outcomes"] and lesson["workedExample"]["code"]
        assert len(practice["tasks"]) >= 3
        assert len(practice["checks"]) >= 3
        assert len(practice["hints"]) >= 2
        assert practice["starterCode"] and practice["solution"]
        assert practice["runCommand"]
        assert 0 <= quiz["answer"] < len(quiz["options"])
        assert quiz["explanation"]
        assert not any("\u0370" <= character <= "\u03ff" for character in theory_text)


def test_home_redirects_to_course_without_changing_api_routes() -> None:
    response = client.get("/", follow_redirects=False)
    health = client.get("/health")

    assert response.status_code in {302, 307}
    assert response.headers["location"] == "/course"
    assert health.status_code == 200
    assert health.json()["status"] == "ok"
