import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-mark">P</span>
          PawCare
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Find Care</Link>
          <Link to="/pet">My Pet</Link>
          <Link to="/health-record">Health Record</Link>
        </nav>

        <Link to="/emergency" className="emergency-btn">
          Emergency
        </Link>
      </div>
    </header>
  );
}

export default Navbar;