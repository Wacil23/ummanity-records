import React from "react";
import Welcome from "./welcome/Welcome";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 shadow-xs   ">
      <Welcome />
    </div>
  );
};

export default Header;
