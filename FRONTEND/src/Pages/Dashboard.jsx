import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import menuItems from "../Assets/menuItems";
import "../styles/dashboard.css";
import FileInput from "../components/FileInput";
import Loader from "../components/Loader";

const Dashboard = ({ isClosed }) => {
  return (
    <div
      className={`${!isClosed ? "main-container-hide" : "main-container-show"}
  `}
    >
      <aside
        //     className={`${isClosed ? "asideHide" : "asideShow"}
        // `}
        className={`${isClosed ? "sidebar sidebarShow" : "sidebarClose"}
      `}
      >
        <Sidebar isClosed={isClosed} />
      </aside>
      <div className="main">
        {/* <Loader /> */}
        {/* <pre>{JSON.stringify(menuItems, null, 2)}</pre> */}
        <FileInput />
      </div>
    </div>
  );
};

export default Dashboard;
