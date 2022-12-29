import React from "react";
import { useState } from "react";
import menuItems from "../Assets/menuItems";
import "../styles/sidebar.css";
import NavMenu from "./NavMenu";
const Sidebar = ({ isClosed }) => {
  return (
    <div
      className="sidebar-container"
      // className={`${isClosed ? "sidebar sidebarShow" : "sidebar  sidebarClose"}
      // `}
    >
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
