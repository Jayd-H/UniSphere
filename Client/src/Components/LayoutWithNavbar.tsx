import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Scrollbars } from "react-custom-scrollbars-2";

const LayoutWithNavbar: React.FC = () => {
  return (
    <Scrollbars style={{ width: "100%", height: "100vh" }}>
      <Navbar />
      <div id="scrollableDiv" className="mt-16 bg-white">
        <Outlet /> {/* Render child routes */}
      </div>
    </Scrollbars>
  );
};

export default LayoutWithNavbar;
