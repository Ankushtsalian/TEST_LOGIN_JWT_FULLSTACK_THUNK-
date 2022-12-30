import Logout from "../Pages/Logout";
import "../styles/navbar.css";
import Hamburger from "./Hamburger";
import chevron from "../Assets/chevron.svg";
import Profile from "./Profile";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isClosed } = useSelector((state) => state.product);

  return (
    <nav className="navbar">
      <Hamburger isClosed={isClosed} />
      <button className="button">Home</button>
      <div className="dropdowns">
        <div className="dropdown">
          <button className="button">
            Services
            <img src={chevron} alt="chevron" />
          </button>
          <div className="dropdown-menu">
            <button>UX/UI Design</button>
            <button>Web Applications</button>
            <button>SEO Advice</button>
          </div>
        </div>
        <div className="dropdown">
          <button className="button">
            Products
            <img src={chevron} alt="chevron" />
          </button>
          <div className="dropdown-menu">
            <button>Learn CSS Ebook</button>
            <button>Security Course</button>
            <button>Masterclass Bundle</button>
          </div>
        </div>
        <div className="dropdown">
          <button className="button">
            Support
            <img src={chevron} alt="chevron" />
          </button>
          <div className="dropdown-menu">
            <button>Live Chat</button>
            <button>Send Email</button>
            <button>Request Help</button>
          </div>
        </div>
      </div>
      <Profile />
      <Logout />
    </nav>
  );
};

export default Navbar;
