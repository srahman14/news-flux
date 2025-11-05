from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

def create_app():
    load_dotenv()

    app = Flask(__name__)
    CORS(app)

    # Example
    from app.routes.news_routes import news_bp
    app.register_blueprint(news_bp, url_prefix="/api")

    return app


