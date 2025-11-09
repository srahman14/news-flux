from flask import Blueprint, jsonify, request
from app.controllers.news_controller import fetch_news_data

news_bp = Blueprint("news", __name__)

@news_bp.route("/news", methods=["GET"])
def get_news():
    data = fetch_news_data(country="us", category="technology")
    return jsonify(data)

@news_bp.route("news/search", methods=["GET"])
def search_news():
    query_params = request.args.to_dict()

    data = fetch_news_data(**query_params)
    return jsonify(data)