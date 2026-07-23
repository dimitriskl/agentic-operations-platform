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


def test_reliability_lesson_explains_its_command_for_windows_and_ubuntu() -> None:
    catalog_path = project_root / "course" / "assets" / "lessons.json"
    lessons = json.loads(catalog_path.read_text(encoding="utf-8"))["lessons"]
    lesson = next(
        lesson for lesson in lessons if lesson["slug"] == "reliability-mindset"
    )
    guide = lesson["practice"]["commandGuide"]

    assert guide["windowsCommand"] == "pytest -q"
    assert guide["ubuntuCommand"] == "pytest -q"
    assert "PowerShell" in guide["terminal"]
    assert "Bash" in guide["terminal"]
    assert guide["why"] and guide["program"] and guide["parts"]
    assert guide["effect"] and guide["successEvidence"] and guide["failureRecovery"]


def test_reliability_lesson_defines_specialized_terms_when_they_are_introduced() -> None:
    catalog_path = project_root / "course" / "assets" / "lessons.json"
    lessons = json.loads(catalog_path.read_text(encoding="utf-8"))["lessons"]
    lesson = next(
        lesson for lesson in lessons if lesson["slug"] == "reliability-mindset"
    )
    learner_text = " ".join(
        [
            *(paragraph for section in lesson["theory"] for paragraph in section["paragraphs"]),
            *(
                step["description"]
                for section in lesson["theory"]
                for step in section.get("exampleSteps", [])
            ),
            lesson["workedExample"]["explanation"],
            lesson["practice"]["scenario"],
            *lesson["practice"]["hints"],
            lesson["quiz"]["explanation"],
            *lesson["completionEvidence"],
        ]
    ).lower()

    assert "policy code is normal application code" in learner_text
    assert "a state machine is code that lists" in learner_text
    assert "credentials are secret values" in learner_text
    assert "the execution boundary is the last controlled point" in learner_text
    assert "a file that records a technical choice" in learner_text


def test_reliability_lesson_explains_the_plain_flow_before_naming_its_parts() -> None:
    catalog_path = project_root / "course" / "assets" / "lessons.json"
    lessons = json.loads(catalog_path.read_text(encoding="utf-8"))["lessons"]
    lesson = next(
        lesson for lesson in lessons if lesson["slug"] == "reliability-mindset"
    )
    first_section = lesson["theory"][0]
    plain_example = " ".join(first_section["paragraphs"]).lower()
    steps = first_section["exampleSteps"]
    named_example = " ".join(
        f"{step['name']} {step['description']}" for step in steps
    ).lower()

    assert "sends this suggestion back to the shop's application" in plain_example
    assert "the model's job ends after it sends the suggestion" in plain_example
    assert "i paid for my order twice" in plain_example
    assert "i recommend refunding the second payment" in plain_example
    assert "printer" not in plain_example
    assert all(
        term in named_example
        for term in [
            "pydantic",
            "policy code",
            "human approval",
            "payment adapter",
            "audit log",
        ]
    )
    assert "pydantic is ready-made python code" in named_example
    assert "an adapter translates" in named_example
    assert "time-ordered record is called an audit log" in named_example
    assert "a 3d printer is a machine that makes a physical object" in lesson[
        "practice"
    ]["scenario"].lower()


def test_reliability_lesson_explains_the_python_starter_code() -> None:
    catalog_path = project_root / "course" / "assets" / "lessons.json"
    lessons = json.loads(catalog_path.read_text(encoding="utf-8"))["lessons"]
    lesson = next(
        lesson for lesson in lessons if lesson["slug"] == "reliability-mindset"
    )
    code_guide = " ".join(lesson["practice"]["codeGuide"]).lower()

    assert "like a c# enum" in code_guide
    assert "prevents magic strings" in code_guide
    assert "similar to a simple c# record" in code_guide
    assert "the @ symbol starts a decorator" in code_guide
    assert "frozen=true means" in code_guide
    assert "kind: boundarykind is a type hint" in code_guide
    assert "-> list[architectureboundary] is a return type hint" in code_guide


def test_reliability_lesson_uses_enums_instead_of_boundary_magic_strings() -> None:
    catalog_path = project_root / "course" / "assets" / "lessons.json"
    lessons = json.loads(catalog_path.read_text(encoding="utf-8"))["lessons"]
    lesson = next(
        lesson for lesson in lessons if lesson["slug"] == "reliability-mindset"
    )
    practice = lesson["practice"]
    starter_code = practice["starterCode"]
    solution = practice["solution"]

    assert "from enum import StrEnum" in starter_code
    assert "class BoundaryKind(StrEnum):" in starter_code
    assert "class BoundaryOwner(StrEnum):" in starter_code
    assert "class AccessLevel(StrEnum):" in starter_code
    assert "kind: BoundaryKind" in starter_code
    assert "owner: BoundaryOwner" in starter_code
    assert "access_level: AccessLevel" in starter_code
    assert "ArchitectureBoundary(\"" not in solution
    assert "BoundaryKind.MODEL" in solution
    assert "BoundaryOwner.AI_APPLICATION" in solution
    assert "AccessLevel.UNTRUSTED" in solution


def test_curriculum_requires_best_practices_in_learner_code() -> None:
    curriculum_path = (
        project_root
        / "docs"
        / "learning"
        / "industrial-strength-agent-engineering-curriculum.md"
    )
    curriculum = curriculum_path.read_text(encoding="utf-8")

    assert "### Code-example best-practice standard" in curriculum
    assert "enums for a closed set of domain values" in curriculum
    assert "instead of repeating magic strings" in curriculum
    assert "Never present intentionally weak code" in curriculum


def test_home_redirects_to_course_without_changing_api_routes() -> None:
    response = client.get("/", follow_redirects=False)
    health = client.get("/health")

    assert response.status_code in {302, 307}
    assert response.headers["location"] == "/course"
    assert health.status_code == 200
    assert health.json()["status"] == "ok"
