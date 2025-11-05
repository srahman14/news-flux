import requests

def make_get_req(apiKey: str, BASE_URL: str, endpoint: str, params: dict = None):
    if params is None:
        params = {}

    params["apiKey"] = apiKey

    url = f"{BASE_URL}/{endpoint}"
    response = requests.get(url, params=params)

    if response.status_code != 200:
        return {"error", f"Failed to get news: {response.status_code}"}

    return response.json().get("articles", [])