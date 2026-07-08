from src.main import OperationsRequest, classify_request


def test_classify_temperature_issue():
    response = classify_request(
        OperationsRequest(
            message="the freezer is too cold",
            source="email",
        )
    )

    assert response.intent == "temperature_issue"
    assert response.risk_level == "low"
    assert response.requires_approval is False
