import React from "react";
import { Squash } from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";
import { handleSidebarMenu } from "../Redux/Product-store/Product-Slice";

const Hamburger = () => {
  const { isClosed } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const toggleClosed = () => dispatch(handleSidebarMenu());
  return (
    <button onClick={toggleClosed}>
      <Squash isClosed={isClosed} />
    </button>
  );
};

export default Hamburger;
