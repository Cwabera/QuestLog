const BASE_URL = "http://127.0.0.1:5000/api";

const handleResponse = async (response, errorMessage) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || errorMessage);
  }

  return data;
};

export const getGames = async () => {
  const response = await fetch(`${BASE_URL}/games`);

  const data = await handleResponse(
    response,
    "Failed to fetch games"
  );

  return {
    results: data.games,
    count: data.count,
  };
};

export const searchGames = async (query) => {
  const response = await fetch(
    `${BASE_URL}/games?search=${encodeURIComponent(query)}`
  );

  const data = await handleResponse(
    response,
    "Failed to search games"
  );

  return {
    results: data.games,
    count: data.count,
  };
};

export const getFilteredGames = async ({ platform }) => {
  let url = `${BASE_URL}/games`;

  if (platform) {
    url += `?platforms=${platform}`;
  }

  const response = await fetch(url);

  const data = await handleResponse(
    response,
    "Failed to fetch filtered games"
  );

  return {
    results: data.games,
    count: data.count,
  };
};

export const getGameById = async (id) => {
  throw new Error("Endpoint not implemented in backend yet.");
};

export const getGameScreenshots = async (id) => {
  throw new Error("Endpoint not implemented in backend yet.");
};
