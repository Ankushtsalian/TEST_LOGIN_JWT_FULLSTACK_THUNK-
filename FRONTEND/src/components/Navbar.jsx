import Logout from "../Pages/Logout";
import "../styles/navbar.css";
import Hamburger from "./Hamburger";
import chevron from "../Assets/chevron.svg";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { handleFormInputProduct } from "../Redux";
import { useRef } from "react";
import {
  ClearAllProductSearchInput,
  filteredProduct,
} from "../Redux/Product-store/Product-Slice";
import SearchDropdown from "./SearchDropdown";

const Navbar = () => {
  const { isClosed, search, productList, newProductList } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const currentValue = useRef("");

  const handleInput = (e) => {
    const { name, value } = currentValue.current;
    dispatch(handleFormInputProduct({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredProducts = productList.filter((product) =>
      product.name.includes(search.trim())
    );
    dispatch(filteredProduct(filteredProducts));
    dispatch(ClearAllProductSearchInput());
  };
  return (
    <nav className="navbar">
      <Hamburger isClosed={isClosed} />
      <button className="button">Home</button>
      <div className="search-bar">
        <input
          autoComplete="off"
          ref={currentValue}
          className="input"
          type="text"
          value={search}
          name="search"
          onChange={handleInput}
          maxLength="25"
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
        {search && <SearchDropdown />}
      </div>
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
