from flask import Blueprint, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from app.models import User

users_bp = Blueprint("users", __name__)


@users_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = int(get_jwt_identity())

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({
            "error": "User not found."
        }), 404

    return jsonify(user.to_dict()), 200


@users_bp.route("/all-accounts", methods=["GET"])
def get_all_registered_users():
    # 1. Fetch every single user row out of your live cloud database table
    all_users = User.query.all()
    
    # 2. Return a clean JSON array mapping out the data profiles
    return jsonify([
        {
            "id": u.id,
            "username": u.username,
            "email": u.email
        } for u in all_users
    ]), 200

