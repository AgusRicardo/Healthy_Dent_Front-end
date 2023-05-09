import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import NavbarLateral from "./NavbarLateral";

const Layout = ({ children }) => {
  const { isAuth } = useSelector((state) => state.authh);

  return (
    <div>
      <Navbar />
      {isAuth ? (
        <div className="d-flex flex-row">
          <NavbarLateral />
          <div
            className="container-fluid no-wrapper"
            style={{ backgroundColor: "#fafafa" }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          className="container-fluid no-wrapper"
          style={{ backgroundColor: "#fafafa" }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;
