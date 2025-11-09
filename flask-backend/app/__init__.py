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

    from app.routes.news_routes import news_bp
    app.register_blueprint(news_bp, url_prefix="/api")
    from app.routes.weather_route import weather_bp
    app.register_blueprint(weather_bp, url_prefix="/api")

    return app


