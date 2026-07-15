from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config
from app.extensions import db, migrate, bcrypt, jwt, cors
from app.routes.auth import auth_bp
import os


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    database_url = app.config.get('SQLALCHEMY_DATABASE_URI')
    if database_url and database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    with app.app_context():
        db.create_all()

    # Import models
    from app.models import (
        User,
        Collection,
        CollectionGame,
        Favourite,
        Review,
    )

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.users import users_bp
    from app.routes.collections import collections_bp
    from app.routes.favourites import favourites_bp
    from app.routes.reviews import reviews_bp
    from app.routes.games import games_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(collections_bp, url_prefix="/api/collections")
    app.register_blueprint(favourites_bp, url_prefix="/api/favourites")
    app.register_blueprint(reviews_bp, url_prefix="/api")
    app.register_blueprint(games_bp, url_prefix="/api/games")

    @app.route("/")
    def home():
        return jsonify({
            "message": "Welcome to the QuestLog API!"
        })

    @app.route("/api/health")
    def health_check():
        return jsonify({
            "status": "ok"
        }), 200

    return app
