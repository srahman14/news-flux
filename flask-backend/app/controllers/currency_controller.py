from flask import current_app, request
import requests

POPULAR_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY"]

def fetch_currency_data(base="USD", target=None):
    api_key = current_app.config.get("CURRENCY_API_KEY")
    if not api_key:
        return {"error": "Currency API key not configured"}

    base = base.upper()
    url = f"https://v6.exchangerate-api.com/v6/{api_key}/latest/{base}"

    try:
        response = requests.get(url, timeout=10).json()
        if response.get("result") != "success":
            return {"error": "Failed to fetch currency data"}

        rates = response["conversion_rates"]

        # Small feed: top 5 strongest
        strongest = sorted(
            ((cur, val) for cur, val in rates.items() if cur in POPULAR_CURRENCIES),
            key=lambda x: x[1],
            reverse=True
        )[:5]

        target_rate = rates.get(target.upper()) if target else None

        return {
            "base": base,
            "date": response.get("time_last_update_utc"),
            "rates": strongest,
            "target_rate": target_rate
        }

    except requests.RequestException as e:
        return {"error": f"Network error: {str(e)}"}