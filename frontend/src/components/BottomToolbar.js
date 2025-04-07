import React from "react";
import { Link } from "react-router-dom";

function BottomToolbar() {
  return (
    <div className="bottom-toolbar">
      <Link to="/">
        <i className="fas fa-search"></i>
        <span>Explore</span>
      </Link>
      <Link to="/portfolio">
        <i className="fas fa-briefcase"></i>
        <span>Portfolio</span>
      </Link>
    </div>
  );
}

export default BottomToolbar;