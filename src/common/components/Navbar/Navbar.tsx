import useGlobalStore from "common/contexts/StoreContext";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <Link to="/home">
            <img
              src={isHome ? "/imgs/Home.png" : "/imgs/Home_p.svg"}
              alt=""
              style={{ width: "50px" }}
            />
          </Link>
        </li>
        <hr className="bg-gray-100 opacity-70 " />
        <li className="nav-item">
          <Link to="/create">
            <img
              src={isCreate ? "/imgs/Create_p.png" : "/imgs/Create.png"}
              alt=""
              style={{ width: "50px" }}
            />
            Create
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user">
            <img
              src={isProfile ? "/imgs/Profile_p.png" : "/imgs/Profile.png"}
              alt=""
              style={{ width: "50px" }}
            />
            Profile
          </Link>
        </li>
        <li className="nav-bot mb-2 cursor-pointer">
          <a className="nav-link" onClick={handleLogout}>
            <img src="/imgs/Logout.png" alt="" style={{ width: "48px" }} />
            Log out
          </a>
        </li>
        {/* More links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
