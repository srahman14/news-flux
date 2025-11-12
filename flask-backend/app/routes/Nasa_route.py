from flask import Blueprint, jsonify, request
from app.controllers.nasa_controller import get_random_apod, get_apod_by_date

nasa_bp = Blueprint("nasa", __name__)

@nasa_bp.route("/nasa-small", methods=["GET"])
def nasa_small():
    data = get_random_apod()
    return jsonify(data)

@nasa_bp.route("/nasa", methods=["GET", "POST"])
def nasa_main():
    date = request.args.get("date")
    data = get_apod_by_date(date)
    return jsonify(data)