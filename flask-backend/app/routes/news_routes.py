from flask import Blueprint, jsonify

news_bp = Blueprint("news", __name__)

@news_bp.route("/hello", methods=["GET"])
def hello_world():
    return jsonify({"message": "Hello from Flask!"})
