import React from "react";

const SubMenu = ({ item, subMenu }) => {
  return (
    <>
      {item?.items?.map((i, idx) => (
        <li key={i}>{i}</li>
      ))}
    </>
  );
};

export default SubMenu;
