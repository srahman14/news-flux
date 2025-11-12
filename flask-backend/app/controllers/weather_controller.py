from flask import current_app
import requests
import random

RANDOM_CITIES = [
    ("London", "GB"),
    ("New York", "US"),
    ("Tokyo", "JP"),
    ("Paris", "FR"),
    ("Berlin", "DE"),
    ("Toronto", "CA"),
    ("Sydney", "AU"),
    ("Dubai", "AE"),
    ("Rome", "IT"),
    ("Madrid", "ES"),
]


def fetch_weather_data(city, country):
    """Fetch 5-day weather forecast for a specific city and country."""
    api_key = current_app.config.get("WEATHER_API_KEY")
    if not api_key:
        return {"error": "Weather API key not configured"}

    city = city.strip()
    country = country.strip()
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city},{country}&units=metric&appid={api_key}"

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        if response.status_code != 200 or data.get("cod") != "200":
            return {"error": data.get("message", "City or country not recognized")}

        # Keep only one forecast per day
        daily_forecast = {}
        for item in data.get("list", []):
            date_str = item["dt_txt"].split(" ")[0]
            if date_str not in daily_forecast:
                daily_forecast[date_str] = {
                    "temperature": item["main"]["temp"],
                    "weather": item["weather"][0]["description"],
                    "icon": item["weather"][0]["icon"],
                    "datetime": item["dt_txt"]
                }

        return {
            "city": data.get("city", {}).get("name", city),
            "country": data.get("city", {}).get("country", country),
            "forecasts": daily_forecast
        }

    except requests.RequestException as e:
        return {"error": f"Network error: {str(e)}"}
    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}


def fetch_random_weather():
    """Fetch weather data for a random city."""
    city, country = random.choice(RANDOM_CITIES)
    return fetch_weather_data(city, country)