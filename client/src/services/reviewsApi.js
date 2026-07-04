const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export async function getGameReviews(gameId) {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}/reviews`);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return []; // Return empty array so the page doesn't break if the backend is down
  }
}

export async function submitGameReview(gameId, reviewData) {
  const response = await fetch(`${BASE_URL}/games/${gameId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });
  
  if (!response.ok) throw new Error("Failed to submit review");
  return await response.json();
}