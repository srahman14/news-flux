import requests
from flask import current_app
from app.utils.formatter import format_news_article
from app.utils.news_helper import make_get_req 

def fetch_news_data(endpoint="top-headlines", **params):
    api_key = current_app.config["NEWS_API_KEY"]
    base_url = f"https://newsapi.org/v2/"

    response = make_get_req(
        apiKey=api_key,
        BASE_URL=base_url,
        endpoint=endpoint,
        params=params
    )
 
    if isinstance(response, dict) and "error" in response:
        return response
    
    return [format_news_article(article) for article in response]

def fetch_news_tech_data(category="technology"):
    api_key = current_app.config["NEWS_API_KEY"]
    url = f"https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={api_key}"
    response = requests.get(url)
    if response.status_code != 200:
        return {"error": "Failed to fetch news"}
    articles = response.json().get("articles", [])
    return articles


