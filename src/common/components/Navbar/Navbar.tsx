import "./Navbar.css";
interface NavbarProps {
  // Add any props you need, like navigation links
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar shadow-box-shadow">
      {/* Your navigation content goes here */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/about">
            About
          </a>
        </li>
        {/* More links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
