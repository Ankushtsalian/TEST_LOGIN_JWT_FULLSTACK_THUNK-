import React from "react";
import { Squash } from "hamburger-react";

const Hamburger = ({ isClosed, setIsClosed }) => {
  const toggleClosed = () => setIsClosed(!isClosed);

  return (
    <button onClick={toggleClosed}>
      <Squash isClosed={isClosed} />
    </button>
  );
};

export default Hamburger;
