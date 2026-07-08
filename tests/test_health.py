import asyncio

from src.main import health


def test_health_returns_ok_response():
    response = asyncio.run(health())

    assert response.status == "ok"
    assert response.service == "agentic-operations-platform"
    assert response.version == "0.1.0"
