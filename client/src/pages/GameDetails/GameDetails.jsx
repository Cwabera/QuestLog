import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameById, getGameScreenshots } from "../../services/rawgApi";
import { getGameReviews, submitGameReview } from "../../services/reviewsApi";
import "./GameDetails.css";

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // States
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form States
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [gameData, screenshotsData, backendReviews] = await Promise.all([
          getGameById(id),
          getGameScreenshots(id),
          getGameReviews(id)
        ]);
        
        setGame(gameData);
        setScreenshots(screenshotsData?.results || []);
        setReviews(backendReviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const newReview = await submitGameReview(id, {
        rating: Number(userRating),
        comment: reviewText
      });

      setReviews((prev) => [newReview, ...prev]);
      setReviewText("");
      setUserRating(5);
    } catch (err) {
      setSubmitError("Could not post review. Ensure your backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading game details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!game) return <div className="not-found">Game not found.</div>;

  return (
    <div className="game-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back
      </button>

      <header className="game-header">
        <h1>{game.name}</h1>
        {game.background_image && (
          <img src={game.background_image} alt={game.name} className="hero-image" />
        )}
      </header>

      <div className="game-content">
        <section className="game-info-main">
          <h2>About</h2>
          <div className="description" dangerouslySetInnerHTML={{ __html: game.description }} />
        </section>

        <aside className="game-meta">
          <div className="meta-item">
            <h3>Release Date</h3>
            <p>{game.released ? new Date(game.released).toLocaleDateString() : "TBA"}</p>
          </div>
          <div className="meta-item">
            <h3>Rating</h3>
            <p>⭐ {game.rating} / 5</p>
          </div>
        </aside>
      </div>

      {screenshots.length > 0 && (
        <section className="game-gallery">
          <h2>Screenshots</h2>
          <div className="gallery-grid">
            {screenshots.map((shot) => (
              <img key={shot.id} src={shot.image} alt="screenshot" className="screenshot-image" loading="lazy" />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Player Reviews</h2>
        
        <form onSubmit={handleReviewSubmit} className="review-form">
          <h3>Leave a Review</h3>
          {submitError && <p className="error-text">{submitError}</p>}
          
          <div className="form-group">
            <label>Rating:</label>
            <select value={userRating} onChange={(e) => setUserRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <textarea 
              placeholder="What did you think?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required rows="4"
            />
          </div>
          
          <button type="submit" disabled={isSubmitting || !reviewText.trim()}>
            {isSubmitting ? "Posting..." : "Submit Review"}
          </button>
        </form>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <strong>{review.user}</strong>
                  <span>{"⭐".repeat(review.rating)}</span>
                </div>
                <p>{review.comment}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default GameDetails;