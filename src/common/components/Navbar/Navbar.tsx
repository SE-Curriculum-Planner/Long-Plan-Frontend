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
            <img src="src/assets/Home_p.png" alt="" style={{ width: "50px" }} />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user">
            Profile
          </a>
        </li>
        {/* More links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
