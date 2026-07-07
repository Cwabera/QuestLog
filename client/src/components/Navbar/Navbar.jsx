import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">QuestLog</Link>
      </div>

      <div className="navbar-links">
        <NavLink to="/">Browse</NavLink>
        {isAuthenticated && <NavLink to="/favorites">Favorites</NavLink>}
        <NavLink to="/about">About</NavLink>
      </div>

      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            <span>{user?.username}</span>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register" className="navbar-auth__primary">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
