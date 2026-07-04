from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models.favourite import Favourite
from app.schemas.favourite_schema import (
    favourite_schema,
    favourites_schema,
)

favourites_bp = Blueprint("favourites", __name__)


@favourites_bp.route("/", methods=["GET"])
def get_favourites():
    favourites = Favourite.query.all()
    return favourites_schema.dump(favourites), 200


@favourites_bp.route("/", methods=["POST"])
def add_favourite():
    data = request.get_json()

    favourite = Favourite(
        game_id=data["game_id"],
        user_id=data["user_id"],
    )

    db.session.add(favourite)
    db.session.commit()

    return favourite_schema.dump(favourite), 201


@favourites_bp.route("/<int:id>", methods=["DELETE"])
def remove_favourite(id):
    favourite = Favourite.query.get_or_404(id)

    db.session.delete(favourite)
    db.session.commit()

    return jsonify({
        "message": "Favourite removed successfully."
    }), 200
