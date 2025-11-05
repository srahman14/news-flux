from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)

    # Load API key example
    app.config["NEWS_API_KEY"] = os.getenv("NEWS_API_KEY")
    app.config['WEATHER_API_KEY'] = os.getenv("WEATHER_API_KEY")

    # Import blueprints
    from app.routes.news_routes import news_bp
    from app.routes.weather_route import weather_bp  

    app.register_blueprint(news_bp, url_prefix="/api/news")
    app.register_blueprint(weather_bp, url_prefix="/api/weather") 

    return app