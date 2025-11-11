from flask import Blueprint, jsonify, request
from app.controllers.currency_controller import fetch_currency_data

currency_bp = Blueprint("currency", __name__)

@currency_bp.route("/currency/latest", methods=["GET"])
def get_currency():
    base = request.args.get("base", "USD")
    target = request.args.get("target")
    data = fetch_currency_data(base, target)
    return jsonify(data)