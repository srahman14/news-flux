def format_news_article(article):
    return {
        "title": article.get("title"),
        "source": article.get("source", {}).get("name"),
        "url": article.get("url"),
        "image_url": article.get("urlToImage"),
        "published_at": article.get("publishedAt"),
        "description": article.get("description"),
    }
