from flask import Blueprint, request, jsonify
from app.models.review import Review
from app.extensions import db

# Define the blueprint. URL prefix will handle the /api part
reviews_bp = Blueprint('reviews', __name__, url_prefix='/api')

@reviews_bp.route('/games/<game_id>/reviews', methods=['GET'])
def get_game_reviews(game_id):
    # Fetch all reviews for this specific game, newest first
    reviews = Review.query.filter_by(game_id=str(game_id)).order_by(Review.created_at.desc()).all()
    
    result = []
    for review in reviews:
        result.append({
            "id": review.id,
            "rating": review.rating,
            "comment": review.comment,
            "user": review.user.username if review.user else "Anonymous Gamer",
            "date": review.created_at.isoformat()
        })
        
    return jsonify(result), 200

@reviews_bp.route('/games/<game_id>/reviews', methods=['POST'])
def add_game_review(game_id):
    data = request.get_json()
    
    if not data or not data.get('rating') or not data.get('comment'):
        return jsonify({"error": "Rating and comment are required"}), 400

    new_review = Review(
        game_id=str(game_id),
        rating=data.get('rating'),
        comment=data.get('comment')
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({
        "id": new_review.id,
        "rating": new_review.rating,
        "comment": new_review.comment,
        "user": "Anonymous Gamer", # Update this once user auth is passed in headers
        "date": new_review.created_at.isoformat()
    }), 201