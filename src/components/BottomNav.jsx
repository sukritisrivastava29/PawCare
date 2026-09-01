import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link
        className={location.pathname === "/" ? "active" : ""}
        to="/"
      >
        <span>⌂</span>
        Home
      </Link>

      <Link
        className={location.pathname === "/search" ? "active" : ""}
        to="/search"
      >
        <span>⌕</span>
        Search
      </Link>

      <Link
        className={location.pathname === "/pet" ? "active" : ""}
        to="/pet"
      >
        <span>🐾</span>
        My Pet
      </Link>

      <Link
        className={
          location.pathname === "/health-record" ? "active" : ""
        }
        to="/health-record"
      >
        <span>▤</span>
        Records
      </Link>
    </div>
  );
}

export default BottomNav;