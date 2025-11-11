from flask import Blueprint, request, current_app, jsonify
import requests
import random

weather_bp = Blueprint("weather", __name__)

# List of random cities for homepage preview
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

@weather_bp.route("/weather/random", methods=["GET"])
def random_weather():
    city, country = random.choice(RANDOM_CITIES)
    api_key = current_app.config.get("WEATHER_API_KEY")
    if not api_key:
        return jsonify({"error": "Weather API key not configured"}), 500

    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city},{country}&units=metric&appid={api_key}"

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        if response.status_code != 200 or data.get("cod") != "200":
            return jsonify({"error": data.get("message", "City or country not recognized")}), 404

        # Keep only one forecast per day
        daily_forecast = {}
        for item in data.get("list", []):
            date_str = item["dt_txt"].split(" ")[0]
            if date_str not in daily_forecast:
                daily_forecast[date_str] = {
                    "temperature": item["main"]["temp"],
                    "weather": item["weather"][0]["description"],
                }

        return jsonify({
            "city": data.get("city", {}).get("name", city),
            "country": data.get("city", {}).get("country", country),
            "forecasts": daily_forecast
        })

    except requests.RequestException as e:
        return jsonify({"error": f"Network error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


@weather_bp.route("/weather", methods=["GET"])
def weather():
    city = request.args.get("city", "").strip()
    country = request.args.get("country", "").strip()

    # Input validation
    if not city or not country:
        return jsonify({"error": "Please enter both city and country"}), 400

    api_key = current_app.config.get("WEATHER_API_KEY")
    if not api_key:
        return jsonify({"error": "Weather API key not configured"}), 500

    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city},{country}&units=metric&appid={api_key}"

    try:
        response = requests.get(url, timeout=10)
        data = response.json()

        if response.status_code != 200 or data.get("cod") != "200":
            return jsonify({"error": data.get("message", "City or country not recognized")}), 404

        # Keep only one forecast per day
        daily_forecast = {}
        for item in data.get("list", []):
            date_str = item["dt_txt"].split(" ")[0]
            if date_str not in daily_forecast:
                daily_forecast[date_str] = {
                    "temperature": item["main"]["temp"],
                    "weather": item["weather"][0]["description"],
                    "datetime": item["dt_txt"]
                }

        weather_data = {
            "city": data["city"]["name"],
            "country": data["city"]["country"],
            "forecasts": daily_forecast
        }

        return jsonify(weather_data)

    except requests.RequestException as e:
        return jsonify({"error": f"Network error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500