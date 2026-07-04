from server.app.extensions import db


class CollectionGame(db.Model):
    __tablename__ = "collection_games"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    genre = db.Column(db.String(80))
    platform = db.Column(db.String(120))
    release_date = db.Column(db.String(20))
    image_url = db.Column(db.String(500))
    rating = db.Column(db.Float)
    description = db.Column(db.Text)

    def to_game_dict(self):
        return {
            "id": self.id,
            "name": self.title,
            "title": self.title,
            "genre": self.genre,
            "platform": self.platform,
            "released": self.release_date,
            "release_date": self.release_date,
            "background_image": self.image_url,
            "image_url": self.image_url,
            "rating": self.rating,
            "description": self.description,
        }