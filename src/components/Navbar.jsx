import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Care", path: "/search" },
    { name: "My Animal", path: "/animals" },
    { name: "Health Record", path: "/health" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

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
            className={
              location.pathname === item.path ? "active" : ""
            }
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-[#176f6a] text-white"
          >
            Login
          </Link>
        )}

        <Link to="/emergency" className="emergency-nav">
          Emergency
        </Link>
      </div>
    </header>
  );
}