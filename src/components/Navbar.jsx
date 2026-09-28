import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Care", path: "/search" },
    { name: "My Animals", path: "/animals" },
    { name: "Health Records", path: "/health" },
    { name: "AI Health", path: "/ai-health" },
    { name: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-paw">✦</span>
          Paw<span>Care</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path ? "active" : ""
              }
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="nav-actions">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <Link to="/login" className="login-nav-btn">
              Log in
            </Link>
          )}

          <Link to="/emergency" className="emergency-nav">
            <span>✦</span>
            Emergency
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <nav className="mobile-nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={
                location.pathname === item.path ? "active" : ""
              }
            >
              <span>{item.name}</span>
              <span className="mobile-arrow">→</span>
            </Link>
          ))}
        </nav>

        <div className="mobile-actions">
          <Link
            to="/emergency"
            className="mobile-emergency"
            onClick={closeMenu}
          >
            ✦ Emergency
          </Link>

          {isLoggedIn ? (
            <button
              className="mobile-logout"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="mobile-login"
              onClick={closeMenu}
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}