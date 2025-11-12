import requests

def get_top_cryptos(limit=5):
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": limit,
        "page": 1,
        "sparkline": False
    }

    try:
        response = requests.get(url, params=params, timeout=10).json()
        if not isinstance(response, list):
            return []
        return [
            {
                "id": coin.get("id", ""),
                "name": coin.get("name", ""),
                "current_price": coin.get("current_price", 0)
            }
            for coin in response
        ]
    except requests.RequestException:
        return []

def get_crypto_history(crypto="bitcoin", days=30):
    url = f"https://api.coingecko.com/api/v3/coins/{crypto}/market_chart"
    params = {"vs_currency": "usd", "days": days}
    try:
        response = requests.get(url, params=params, timeout=10).json()
        return {"prices": response.get("prices", [])}
    except requests.RequestException:
        return {"prices": []}