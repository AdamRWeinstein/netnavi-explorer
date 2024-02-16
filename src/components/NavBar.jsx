import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-link acdc-town">ACDC Town</Link>
        <div className="nav-spacer"></div>
        <Link to="/folders" className="nav-link folder">Folder</Link>
      </div>
    </nav>
  );
};

export default NavBar;
