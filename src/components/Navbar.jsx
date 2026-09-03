import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* LOGO */}
      <Link to="/" className="logo">
        <span className="logo-paw">✦</span>
        Paw<span>Care</span>
      </Link>

      {/* NAVIGATION */}
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
          Emergency
        </Link>
      </div>
    </header>
  );
}