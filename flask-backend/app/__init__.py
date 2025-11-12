from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)

    # Loading API keys
    app.config["NEWS_API_KEY"] = os.getenv("NEWS_API_KEY")
    app.config["WEATHER_API_KEY"] = os.getenv("WEATHER_API_KEY")
    app.config["CURRENCY_API_KEY"] = os.getenv("CURRENCY_API_KEY")
    app.config["NASA_API_KEY"] = os.getenv("NASA_API_KEY")
    print("NASA_API_KEY:", app.config["NASA_API_KEY"])
    print("CURRENCY_API_KEY:", app.config["CURRENCY_API_KEY"])
    print("NEWS_API_KEY:", app.config["NEWS_API_KEY"])
    print("WEATHER_API_KEY:", app.config["WEATHER_API_KEY"])

    from app.routes.news_routes import news_bp
    app.register_blueprint(news_bp, url_prefix="/api")
    from app.routes.weather_route import weather_bp
    app.register_blueprint(weather_bp, url_prefix="/api")
    from app.routes.currency_route import currency_bp
    app.register_blueprint(currency_bp, url_prefix="/api")
    from app.routes.Nasa_route import nasa_bp
    app.register_blueprint(nasa_bp , url_prefix="/api")
    from app.routes.crypto_route import crypto_bp
    app.register_blueprint(crypto_bp, url_prefix="/api")



    return app


