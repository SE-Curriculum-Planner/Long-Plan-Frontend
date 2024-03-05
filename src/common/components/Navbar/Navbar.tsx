import useGlobalStore from "common/contexts/StoreContext";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogout } from "common/apis/logout";
import { ClientRouteKey, LocalStorageKey } from "common/constants/keys";
interface NavbarProps {
  // Add any props you need, like navigation links
}

const Navbar: React.FC<NavbarProps> = () => {
  const { setUserData } = useGlobalStore();
  const [isHome, setIsHome] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isProfile, setIsProfile] = useState(false); // Initialize state for profile image
  const navigate = useNavigate();
  const handleLogout = async () => {
    await getLogout();
    setUserData(null);
    localStorage.removeItem(LocalStorageKey.Auth);
    navigate(ClientRouteKey.Login);
  };

  useEffect(() => {
    if (location.pathname === "/user") {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
    if (location.pathname === "/create") {
      setIsCreate(true);
    } else {
      setIsCreate(false);
    }
  }, [location.pathname]);
  return (
    <nav className="navbar shadow-box-shadow">
      {/* Your navigation content goes here */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/home">
            <img
              src={isHome ? "src/assets/Home_p.png" : "src/assets/Home.png"}
              alt=""
              style={{ width: "50px" }}
            />
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/create">
            <img
              src={
                isCreate ? "src/assets/Create_p.png" : "src/assets/Create.png"
              }
              alt=""
              style={{ width: "50px" }}
            />
            Create
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/user">
            <img
              src={
                isProfile
                  ? "src/assets/Profile_p.png"
                  : "src/assets/Profile.png"
              }
              alt=""
              style={{ width: "50px" }}
            />
            Profile
          </a>
        </li>
        <li className="nav-bot">
          <div className="nav-link" onClick={handleLogout}>
            <img src="src/assets/Logout.png" alt="" style={{ width: "50px" }} />
            Log out
          </div>
        </li>
        {/* More links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
