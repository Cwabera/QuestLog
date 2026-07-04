import { useFavorites } from "../../context/FavouritesContext";
import GameCard from "../../components/GameCard/GameCard";
import "./Favorites.css";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <p>Your saved games collection</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No Favorites Yet</h2>
          <p>Browse games and add some to your favorites collection.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;