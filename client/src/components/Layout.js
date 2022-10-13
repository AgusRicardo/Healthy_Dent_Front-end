import React from "react";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid no-wrapper" style={{backgroundColor: '#fafafa'}}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
