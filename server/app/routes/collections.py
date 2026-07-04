from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models.collection import Collection
from app.schemas.collection_schema import (
    collection_schema,
    collections_schema,
)

collections_bp = Blueprint("collections", __name__)


@collections_bp.route("/", methods=["GET"])
def get_collections():
    collections = Collection.query.all()
    return collections_schema.dump(collections), 200


@collections_bp.route("/<int:id>", methods=["GET"])
def get_collection(id):
    collection = Collection.query.get_or_404(id)
    return collection_schema.dump(collection), 200


@collections_bp.route("/", methods=["POST"])
def create_collection():
    data = request.get_json()

    collection = Collection(
        name=data["name"],
        description=data.get("description"),
        user_id=data["user_id"],
    )

    db.session.add(collection)
    db.session.commit()

    return collection_schema.dump(collection), 201


@collections_bp.route("/<int:id>", methods=["PATCH"])
def update_collection(id):
    collection = Collection.query.get_or_404(id)

    data = request.get_json()

    collection.name = data.get("name", collection.name)
    collection.description = data.get(
        "description",
        collection.description,
    )

    db.session.commit()

    return collection_schema.dump(collection), 200


@collections_bp.route("/<int:id>", methods=["DELETE"])
def delete_collection(id):
    collection = Collection.query.get_or_404(id)

    db.session.delete(collection)
    db.session.commit()

    return jsonify({
        "message": "Collection deleted successfully."
    }), 200
