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