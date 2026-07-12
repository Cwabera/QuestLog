import { useFavourites } from "../../context/FavouritesContext";
import GameCard from "../../components/GameCard/GameCard";

function Favorites() {
  const { favourites } = useFavourites();

  return (
    <main>
      <h1>My Favorites</h1>

      {favourites.length === 0 ? (
        <p>No favorite games yet.</p>
      ) : (
        <div className="games-grid">
          {favourites.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
