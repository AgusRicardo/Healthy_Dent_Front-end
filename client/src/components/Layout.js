import React from "react";
import Navbar from "./Navbar";


const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid no-wrapper" style={{backgroundColor: '#fafafa'}}>{children}</div>
    </div>
  );
};

export default Layout;
