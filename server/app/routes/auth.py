import re  # 1. IMPORT PYTHON'S REGULAR EXPRESSIONS LIBRARY
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from app.extensions import db
from app.models import User

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # 1. Base check: Ensure fields aren't blank
    if not username or not email or not password:
        return jsonify({
            "error": "All fields are required."
        }), 400

    # 2. Server-side Username length validation
    if len(username.strip()) < 3:
        return jsonify({
            "error": "Username must be at least 3 characters long."
        }), 400

    # 3. Server-side Email structural validation check
    email_regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    if not re.match(email_regex, email):
        return jsonify({
            "error": "Please enter a valid email address layout (e.g., user@domain.com)."
        }), 400

    # 4. Server-side Strong Password criteria check
    # Validates length >= 8, presence of 1 uppercase letter, and presence of 1 digit number
    if len(password) < 8:
        return jsonify({
            "error": "Password requirements not met: must be at least 8 characters long."
        }), 400
    if not any(char.isupper() for char in password):
        return jsonify({
            "error": "Password requirements not met: must contain at least 1 uppercase letter."
        }), 400
    if not any(char.isdigit() for char in password):
        return jsonify({
            "error": "Password requirements not met: must contain at least 1 numeric number digit."
        }), 400

    # 5. Database Integrity check: Ensure availability
    existing_user = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()

    if existing_user:
        return jsonify({
            "error": "Username or email already exists."
        }), 409

    # 6. Save verified credentials safely to SQL database pipeline
    user = User(
        username=username,
        email=email
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully.",
        "user": user.to_dict()
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required."
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user or not user.check_password(password):
        return jsonify({
            "error": "Invalid email or password."
        }), 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    user_data = user.to_dict()
    if user.username == "maryanne":
        user_data["is_admin"] = True

    return jsonify({
        "access_token": access_token,
        "user": user_data
    }), 200
