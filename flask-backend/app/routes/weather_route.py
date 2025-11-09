from flask import Blueprint, request, current_app, jsonify
import requests

weather_bp = Blueprint("weather", __name__)

@weather_bp.route("/weather", methods=["GET"])
def weather():
    city = request.args.get("city", "").strip()
    country = request.args.get("country", "").strip()

    if not city or not country:
        return jsonify({"error": "Please enter both city and country"}), 400

    api_key = current_app.config.get("WEATHER_API_KEY")
    if not api_key:
        return jsonify({"error": "Weather API key not configured"}), 500

    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city},{country}&units=metric&appid={api_key}"

    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200 or data.get("cod") != "200":
            return jsonify({"error": data.get("message", "City or country not recognized")}), 404

        daily_forecast = {}
        for item in data["list"]:
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

    except Exception as e:
        return jsonify({"error": str(e)}), 500