from flask import Flask

from app.config import Config
from app.extensions import db, migrate, bcrypt, jwt, cors


def create_app():
    app = Flask(__name__)

<<<<<<< Updated upstream
    app.config.from_object(Config)

=======
>>>>>>> Stashed changes
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
<<<<<<< Updated upstream
    cors.init_app(app)

    # Import models
    from app.models import User
=======
    migrate.init_app(app, db)
    CORS(app)

    # Import models
    from app.models import (
        User,
        Collection,
        CollectionGame,
        Favourite,
        Review,
    )
>>>>>>> Stashed changes

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.users import users_bp
<<<<<<< Updated upstream
    from app.routes.favourites import favourites_bp
    from app.routes.reviews import reviews_bp
    from app.routes.collections import collections_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(favourites_bp, url_prefix="/api/favourites")
    app.register_blueprint(reviews_bp, url_prefix="/api/reviews")
    app.register_blueprint(collections_bp, url_prefix="/api/collections")

    @app.route("/")
    def home():
        return {
            "message": "Welcome to the QuestLog API!"
        }
=======
    from app.routes.collections import collections_bp
    from app.routes.favourites import favourites_bp
    from app.routes.reviews import reviews_bp
    from app.routes.games import games_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(collections_bp, url_prefix="/api/collections")
    app.register_blueprint(favourites_bp, url_prefix="/api/favourites")
    app.register_blueprint(reviews_bp, url_prefix="/api/reviews")
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
>>>>>>> Stashed changes

    return app
