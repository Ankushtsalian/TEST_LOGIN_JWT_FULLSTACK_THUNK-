import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import FileInput from "../components/FileInput";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { isClosed, isLoading } = useSelector((state) => state.product);

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
        <Sidebar />
      </aside>
      <div className="main">
        <FileInput />
      </div>
    </div>
  );
};

export default Dashboard;
