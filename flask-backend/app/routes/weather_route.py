from flask import Blueprint, render_template, request, current_app
import requests

weather_bp = Blueprint("weather", __name__)

@weather_bp.route("/", methods=["GET", "POST"])
def weather():
    weather_data = None
    error_message = None
    city = ""
    country = ""

    if request.method == "POST":
        # Get cit/country inputs
        city = request.form.get("city", "").strip()
        country = request.form.get("country", "").strip()

        # Input validation
        if not city or not country:
            error_message = "Please enter both a city and a country."
        else:
            # Gets api key
            api_key = current_app.config.get("WEATHER_API_KEY")
            if not api_key:
                error_message = "Weather API key not configured."
            else:
                # Uses inputs to request json data
                url = f"http://api.openweathermap.org/data/2.5/forecast?q={city},{country}&units=metric&appid={api_key}"
                try:
                    response = requests.get(url)
                    data = response.json()

                    if response.status_code != 200 or data.get("cod") != "200":
                        error_message = data.get("message", "City or country not recognized.")
                    else:
                        # Stores one value each day in a dictionary
                        daily_forecast = {}
                        for item in data["list"]:
                            date_str = item["dt_txt"].split(" ")[0]
                            if date_str not in daily_forecast:
                                daily_forecast[date_str] = {
                                    "temperature": item["main"]["temp"],
                                    "weather": item["weather"][0]["description"],
                                    "datetime": item["dt_txt"]
                                }
                        # Formats the data
                        weather_data = {
                            "city": data["city"]["name"],
                            "country": data["city"]["country"],
                            "forecasts": daily_forecast
                        }

                except Exception as e:
                    error_message = f"An error occurred: {str(e)}"
    # Sends to html
    return render_template(
        "weather.html",
        weather_data=weather_data,
        error_message=error_message,
        city=city,
        country=country
    )