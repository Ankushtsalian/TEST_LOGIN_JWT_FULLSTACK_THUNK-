import React, { useState } from "react";
import SubMenu from "./SubMenu";

import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
const NavMenu = ({ item, i }) => {
  const [subMenu, setSubmenu] = useState(false);

  const handleSubmenu = () => {
    setSubmenu(!subMenu);
  };
  return (
    <>
      <span className="submenu-button">
        {item.name}
        {item.items && (
          <span className="svg">
            <button onClick={handleSubmenu}>
              {!subMenu ? <MdOutlineExpandMore /> : <MdOutlineExpandLess />}
            </button>
          </span>
        )}
      </span>

      <ul
        className={`${
          subMenu ? "subMenu subMenuShow" : "subMenu subMenuClose"
        }`}
      >
        <SubMenu item={item} handleSubmenu={handleSubmenu} subMenu={subMenu} />
      </ul>
    </>
  );
};

export default NavMenu;
