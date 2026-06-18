import { useEffect, useState } from "react";

import GameCard from "../../components/GameCard/GameCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import {
  getGames,
  searchGames,
  getFilteredGames,
} from "../../services/rawgApi";

function BrowseGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    if (genre || platform || sortBy) {
      applyFilters();
    }
  }, [genre, platform, sortBy]);

  const loadGames = async () => {
    try {
      setLoading(true);

      const data = await getGames();

      setGames(data.results || []);
      setError("");
    } catch (err) {
      setError("Failed to load games.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchTerm(query);

    if (!query.trim()) {
      loadGames();
      return;
    }

    try {
      setLoading(true);

      const data = await searchGames(query);

      setGames(data.results || []);
    } catch (err) {
      setError("Failed to search games.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      setLoading(true);

      const data = await getFilteredGames({
        genre,
        platform,
        sortBy,
      });

      setGames(data.results || []);
    } catch (err) {
      setError("Failed to filter games.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="browse-games">
      <h1>Browse Games</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
      />

      <Filters
        genre={genre}
        platform={platform}
        sortBy={sortBy}
        onGenreChange={setGenre}
        onPlatformChange={setPlatform}
        onSortChange={setSortBy}
      />

      {error && <p>{error}</p>}

      <div className="games-grid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}
      </div>
    </main>
  );
}

export default BrowseGames;