from flask import Blueprint, jsonify, request
from app.controllers.weather_controller import fetch_weather_data, fetch_random_weather

weather_bp = Blueprint("weather", __name__)


@weather_bp.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city", "").strip()
    country = request.args.get("country", "").strip()

    if not city or not country:
        return jsonify({"error": "Please enter both city and country"}), 400

    data = fetch_weather_data(city, country)
    return jsonify(data)


@weather_bp.route("/weather/random", methods=["GET"])
def get_random_weather():
    data = fetch_random_weather()
    return jsonify(data)