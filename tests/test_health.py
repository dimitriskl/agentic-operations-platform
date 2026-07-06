from fastapi.testclient import TestClient
from src.main import app


def test_health():
    client = TestClient(app)
    result = client.get("/health")
    assert result.status_code == 200
