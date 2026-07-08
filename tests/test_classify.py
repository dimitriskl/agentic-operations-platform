from fastapi.testclient import TestClient
from src.main import app

def test_classify_temperature_issue():
    client = TestClient(app)

    response = client.post(
        "/classify",
        json={
            "message": "the freezer is too cold",
            "source": "email",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["intent"] == "temperature_issue"
    assert data["risk_level"] == "low"
    assert data["requires_approval"] is False

