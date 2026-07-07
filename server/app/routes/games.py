import json
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import urlopen

from flask import Blueprint, current_app, jsonify, request

games_bp = Blueprint("games", __name__, url_prefix="/api/games")

RAWG_BASE_URL = "https://api.rawg.io/api"

SAMPLE_GAMES = [
    {
        "id": 3498,
        "name": "Grand Theft Auto V",
        "background_image": None,
        "rating": 4.47,
        "released": "2013-09-17",
        "genres": [{"slug": "action", "name": "Action"}],
        "platforms": [{"platform": {"id": 4, "name": "PC"}}],
        "description": "<p>An open-world crime epic with heists, driving, and chaos.</p>",
    },
    {
        "id": 3328,
        "name": "The Witcher 3: Wild Hunt",
        "background_image": None,
        "rating": 4.66,
        "released": "2015-05-18",
        "genres": [{"slug": "role-playing-games-rpg", "name": "RPG"}],
        "platforms": [{"platform": {"id": 4, "name": "PC"}}],
        "description": "<p>A story-rich fantasy RPG about contracts, choices, and consequences.</p>",
    },
    {
        "id": 4200,
        "name": "Portal 2",
        "background_image": None,
        "rating": 4.62,
        "released": "2011-04-18",
        "genres": [{"slug": "puzzle", "name": "Puzzle"}],
        "platforms": [{"platform": {"id": 4, "name": "PC"}}],
        "description": "<p>A first-person puzzle game built around portals and sharp writing.</p>",
    },
]


def rawg_request(path, params):
    api_key = current_app.config.get("RAWG_API_KEY")

    if not api_key:
        return None

    query = urlencode({**params, "key": api_key})
    url = f"{RAWG_BASE_URL}{path}?{query}"

    try:
        with urlopen(url, timeout=8) as response:
            return json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError):
        return None


def fallback_games(params):
    games = SAMPLE_GAMES
    search = params.get("search", "").lower()
    genre = params.get("genres")
    platform = params.get("platforms")
    ordering = params.get("ordering")

    if search:
        games = [game for game in games if search in game["name"].lower()]

    if genre:
        games = [
            game
            for game in games
            if any(item.get("slug") == genre for item in game.get("genres", []))
        ]

    if platform:
        games = [
            game
            for game in games
            if any(
                str(item.get("platform", {}).get("id")) == str(platform)
                for item in game.get("platforms", [])
            )
        ]

    if ordering in {"rating", "-rating", "released", "-released"}:
        reverse = ordering.startswith("-")
        key = ordering.removeprefix("-")
        games = sorted(games, key=lambda game: game.get(key) or "", reverse=reverse)

    return {
        "count": len(games),
        "next": None,
        "previous": None,
        "results": games,
    }


@games_bp.route("", methods=["GET"])
def list_games():
    params = {
        "search": request.args.get("search", ""),
        "genres": request.args.get("genre", ""),
        "platforms": request.args.get("platform", ""),
        "ordering": request.args.get("sort_by", ""),
        "page": request.args.get("page", "1"),
        "page_size": request.args.get("page_size", "20"),
    }
    params = {key: value for key, value in params.items() if value}
    data = rawg_request("/games", params) or fallback_games(params)

    return jsonify({
        "games": data.get("results", []),
        "count": data.get("count", 0),
        "next": data.get("next"),
        "previous": data.get("previous"),
    }), 200


@games_bp.route("/<int:game_id>", methods=["GET"])
def get_game(game_id):
    data = rawg_request(f"/games/{game_id}", {})

    if not data:
        data = next(
            (game for game in SAMPLE_GAMES if game["id"] == game_id),
            {
                "id": game_id,
                "name": f"Game #{game_id}",
                "background_image": None,
                "rating": None,
                "released": None,
                "description": "<p>No details are available for this game yet.</p>",
            },
        )

    return jsonify(data), 200


@games_bp.route("/<int:game_id>/screenshots", methods=["GET"])
def get_game_screenshots(game_id):
    data = rawg_request(f"/games/{game_id}/screenshots", {})

    if not data:
        data = {"count": 0, "results": []}

    return jsonify(data), 200
