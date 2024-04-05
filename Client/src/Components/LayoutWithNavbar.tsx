import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomDock from "./BottomDock";
import { Scrollbars } from "react-custom-scrollbars-2";

const LayoutWithNavbar: React.FC = () => {
  return (
    <Scrollbars style={{ width: "100%", height: "100vh" }}>
      <div className="hidden sm:block">
        <Navbar />
      </div>
      <div id="scrollableDiv" className="mt-16 sm:mt-18 bg-white">
        <Outlet /> {/* Render child routes */}
      </div>
      <div className="sm:hidden">
        <BottomDock />
      </div>
    </Scrollbars>
  );
};

export default LayoutWithNavbar;
