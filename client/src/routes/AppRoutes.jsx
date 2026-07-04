import { Routes, Route } from "react-router-dom";

import BrowseGames from "../pages/BrowseGames/BrowseGames";
import GameDetails from "../pages/GameDetails/GameDetails";
import About from "../pages/About/About";
feature/game-details
HEAD:src/routes/AppRoutes.jsx
import Favorites from "../pages/Favorites/Favorites";

import Favorites from "../pages/Favorites/Favorites";
 main
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
develop:client/src/routes/AppRoutes.jsx

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BrowseGames />} />
      <Route path="/games" element={<BrowseGames />} />
      <Route path="/games/:id" element={<GameDetails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes
