from flask import current_app
import requests

def get_random_apod():
    api_key = current_app.config.get("NASA_API_KEY")
    count = 1

    if not api_key:
        return {"error": "NASA API key not configured"}

    url = "https://api.nasa.gov/planetary/apod"
    params = {
        "api_key": api_key,
        "count": count
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()  
        data = response.json()      
    except requests.RequestException:
        return {"error": "Failed to fetch NASA data"}
    except ValueError:
        return {"error": "Invalid JSON response from NASA API"}

    if not data or not isinstance(data, list):
        return {"error": "Invalid response from NASA API"}

    data = data[0]  # Get the first item

    
    if data.get("media_type") != "image":
        return {"error": "APOD is not an image"}

    return {
        "title": data.get("title"),
        "explanation": data.get("explanation"),
        "url": data.get("url"),
        "hdurl": data.get("hdurl"),
        "media_type": data.get("media_type")
    }


def get_apod_by_date(date):
    api_key = current_app.config.get("NASA_API_KEY")

    if not api_key:
        return {"error": "NASA API key not configured"}

    url = "https://api.nasa.gov/planetary/apod"
    params = {
        "api_key": api_key,
        "date": date
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()  
        data = response.json()       #
    except requests.RequestException:
        return {"error": "Failed to fetch NASA data"}
    except ValueError:
        return {"error": "Invalid JSON response from NASA API"}

    if not data or not isinstance(data, dict):
        return {"error": "Invalid response from NASA API"}

    
    if data.get("media_type") != "image":
        return {"error": "APOD is not an image"}

    return {
        "title": data.get("title"),
        "explanation": data.get("explanation"),
        "url": data.get("url"),
        "hdurl": data.get("hdurl"),
        "media_type": data.get("media_type")
    }