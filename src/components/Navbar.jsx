import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Care", path: "/search" },
    { name: "My Animal", path: "/pet" },
    { name: "Health Record", path: "/health" },
  ];

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-paw">✦</span>
        Paw<span>Care</span>
      </Link>

      <nav className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Link to="/emergency" className="emergency-nav">
        Emergency
      </Link>
    </header>
  );
}