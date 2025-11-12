from flask import Blueprint, jsonify, request
from app.controllers.crypto_controller import get_top_cryptos, get_crypto_history

crypto_bp = Blueprint("crypto", __name__)

# Endpoint for top 5 cryptos
@crypto_bp.route("/crypto-small", methods=["GET"])
def crypto_small():
    cryptos = get_top_cryptos(limit=5)
    return jsonify(cryptos)

# Endpoint for crypto history
@crypto_bp.route("/crypto-history", methods=["GET"])
def crypto_history():
    crypto = request.args.get("crypto", "bitcoin")
    days = request.args.get("days", 30)
    try:
        days = int(days)
    except ValueError:
        days = 30

    history = get_crypto_history(crypto, days)
    return jsonify(history)  # returns {"prices": [...]}