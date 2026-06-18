import { Routes, Route } from "react-router-dom";
import BrowseGames from "../pages/BrowseGames/BrowseGames";

<Route path="/games" element={<BrowseGames />} />


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/games" element={<h1>Games</h1>} />
      <Route path="/games/:id" element={<h1>Game Details</h1>} />
      <Route path="/favorites" element={<h1>Favorites</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    </Routes>
  );
}

export default AppRoutes;