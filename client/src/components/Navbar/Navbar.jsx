import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🎮 QuestLog</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/games">Browse Games</Link>
        <Link to="/about">About</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {/* SECURED LINK BLOCKS: Protected from launching for unlogged guests */}
            <Link to="/favorites">Favorites</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/profile">My Profile</Link>
            
            <span style={{ marginLeft: "0.5rem", color: "var(--color-text-accent)" }}>
              Hi, {user?.username}
            </span>
            
            <button
              type="button"
              onClick={logout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
