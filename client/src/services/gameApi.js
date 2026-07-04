const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function searchGames(query) {
  const response = await fetch(
    `${API_BASE_URL}/collections/games?search=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search games.");
  }

  const data = await response.json();
  return data.games || [];
}