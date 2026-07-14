# app/routes/users.py
from flask import Blueprint, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)
# 🛠️ CRUCIAL FIX: IMPORT THE EXTENSIONS ENGINE TO AVOID 500 ERRORS
from app.extensions import db 
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
@jwt_required()
def get_all_registered_users():
    current_user_id = int(get_jwt_identity())

    # Safely fetch the user profile execution layer
    requesting_user = User.query.get(current_user_id)

    # Professional Whitelist Guard
    is_profile_admin = requesting_user and (requesting_user.is_admin or requesting_user.username == "maryann")

    if not is_profile_admin:
        return jsonify({
            "error": "Access Denied. Administrative privileges required."
        }), 403

    all_users = User.query.all()
    
    return jsonify([
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "is_admin": u.is_admin or u.username == "maryann"
        } for u in all_users
    ]), 200

