from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

def create_app():
    # Load .env from the same folder as this file (app/)
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env.example')
    load_dotenv(dotenv_path)

    # Optional: print to verify
    print("WEATHER_API_KEY loaded:", os.getenv("WEATHER_API_KEY"))

    app = Flask(__name__)
    CORS(app)

    # Load API keys
    app.config["NEWS_API_KEY"] = os.getenv("NEWS_API_KEY")
    app.config['WEATHER_API_KEY'] = os.getenv("WEATHER_API_KEY")

    # Import blueprints
    from app.routes.news_routes import news_bp
    app.register_blueprint(news_bp, url_prefix="/api/v1/")
    from app.routes.weather_route import weather_bp  
    app.register_blueprint(weather_bp, url_prefix="/api/v1/") 

    return app