import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar_lateral.css";

const NavbarLateral = () => {
  const tipo = localStorage.getItem("tipo");

  return (
    <>
    {
      tipo === "Profesional" ? ( // MENÚ PROFESIONAL
        <div className="col-auto col-sm-3 min-vh-100 nav_content">
        <div className="">
          <div className="nav_title">
            <a className="text-decoration-none d-flex align-items-center text-sm-start text-white d-none d-sm-inline">
              <span className="fs-4">Profesional</span>
            </a>
          </div>
          <hr className="text-white d-none d-sm-block nav_line" />
          <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink
                to="/statistics"
                className="ms-2 d-none d-sm-inline bottonnav-item"
              >
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className="fa-solid fa-magnifying-glass icon_navbar"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    AGENDA PRUEBA
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink 
              //to="/list/turn" 
              className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className="fa-solid fa-list icon_navbar"></i>
                  <span className="ms-2 d-none d-sm-inline">Opcion 2</span>
                </a>
              </NavLink>
            </li>

            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <NavLink 
              //to="/profile" 
              className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className="fa-solid fa-address-card icon_navbar"></i>
                  <span className="ms-2 d-none d-sm-inline">Opcion 3</span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
                href="https://collectednotes.com/"
                target="_blank"
              >
                <i className="fa-solid fa-circle-info icon_navbar"></i>
                <span className="ms-2 d-none d-sm-inline">Ayuda</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      ) : ( // MENÚ PACIENTE
        <div className="col-auto col-sm-3 min-vh-100 nav_content">
        <div className="">
          <div className="nav_title">
            <a className="text-decoration-none d-flex align-items-center text-sm-start text-white d-none d-sm-inline">
              <span className="fs-4">Paciente</span>
            </a>
          </div>
          <hr className="text-white d-none d-sm-block nav_line" />
          <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink
                to="/search"
                className="ms-2 d-none d-sm-inline bottonnav-item"
              >
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className="fa-solid fa-magnifying-glass icon_navbar"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Buscar profesional
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink to="/list/turn" className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className="fa-solid fa-list icon_navbar"></i>
                  <span className="ms-2 d-none d-sm-inline">Turnos</span>
                </a>
              </NavLink>
            </li>

            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <NavLink to="/profile" className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className="fa-solid fa-address-card icon_navbar"></i>
                  <span className="ms-2 d-none d-sm-inline">Perfil</span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
                href="https://collectednotes.com/"
                target="_blank"
              >
                <i className="fa-solid fa-circle-info icon_navbar"></i>
                <span className="ms-2 d-none d-sm-inline">Ayuda</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      )
    }
    </>
  );
};

export default NavbarLateral;
