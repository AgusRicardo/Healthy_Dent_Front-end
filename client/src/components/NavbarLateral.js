import React from "react";
import "../styles/navbar_lateral.css";

const NavbarLateral = () => {
  return (
    /* Mas adelante realizar el menú propio de cada tipo de usuario */
    <>
      <div className="col-auto col-sm-3 min-vh-100 nav_content">
        <div className="nav_content_title">
          <div className="nav_title">
            <a className="text-decoration-none d-flex align-items-center text-sm-start text-white d-none d-sm-inline">
              <span className="fs-4">Paciente</span>
            </a>
          </div>
          <hr className="text-white d-none d-sm-block nav_line" />
          <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
            <li className="nav-item text-white my-1 py-2 py-sm-2">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
              >
                <i className="fa-solid fa-house icon_navbar"></i>
                <span className="ms-2 d-none d-sm-inline">Item 1</span>
              </a>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
              >
                <i className="fa-solid fa-magnifying-glass icon_navbar"></i>
                <span className="ms-2 d-none d-sm-inline">
                  asdasdasdasdasdasdasdasdas
                </span>
              </a>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
              >
                <i className="fa-solid fa-list icon_navbar"></i>
                <span className="ms-2 d-none d-sm-inline">Item 3</span>
              </a>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
              >
                <i className="fa-solid fa-address-card icon_navbar"></i>
                <span className="ms-2 d-none d-sm-inline">Item 3</span>
              </a>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
              >
                <i className="fa-solid fa-circle-info icon_navbar"></i>
                <span className="ms-2 d-none d-sm-inline">Ayuda</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarLateral;
