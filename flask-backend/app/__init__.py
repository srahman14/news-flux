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

    # Example
    from app.routes.news_routes import news_bp
    app.register_blueprint(news_bp, url_prefix="/api")

    return app


