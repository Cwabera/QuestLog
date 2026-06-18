import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<h1>Games</h1>} />
      <Route path="/games/:id" element={<h1>Game Details</h1>} />
      <Route path="/favorites" element={<h1>Favorites</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    </Routes>
  );
}

export default AppRoutes;