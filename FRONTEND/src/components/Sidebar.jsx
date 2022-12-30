import React from "react";
import menuItems from "../Assets/menuItems";
import "../styles/sidebar.css";
import NavMenu from "./NavMenu";
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <ul>
        {menuItems.map((item, i) => (
          <li key={i}>
            <NavMenu item={item} i={i} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
