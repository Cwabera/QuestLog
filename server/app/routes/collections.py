from flask import Blueprint, request

from server.app.models.collection_game import CollectionGame

collections_bp = Blueprint("collections", __name__)


@collections_bp.get("/games")
def search_collection_games():
    search = request.args.get("search", "").strip()

    query = CollectionGame.query

    if search:
        query = query.filter(CollectionGame.title.ilike(f"%{search}%"))

    games = query.order_by(CollectionGame.title.asc()).limit(20).all()

    return {
        "games": [game.to_game_dict() for game in games],
        "count": len(games),
        "search": search,
    }