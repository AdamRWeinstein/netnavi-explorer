import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Link to the main page */}
        <Link to="/" className="nav-link acdc-town">ACDC Town</Link>

        {/* Spacer to push the next link to the right */}
        <div className="nav-spacer"></div>

        {/* Link to the PET page */}
        <Link to="/pet" className="nav-link pet">PET</Link>
      </div>
    </nav>
  );
};

export default NavBar;
