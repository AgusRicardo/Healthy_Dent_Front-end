import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar_lateral.css";

const NavbarLateral = () => {
  const tipo = localStorage.getItem("tipo");

  return (
    <>
    {
      tipo === "Profesional" ? ( // MENÚ PROFESIONAL
        <div className="col-auto fijar-nav col-sm-3 menu-lateral nav_content">
        <div className="">
          <div className="nav-title ">
            <a className="text-decoration-none d-flex align-items-center text-sm-start text-white d-none d-sm-inline">
              <span className="fs-4 title-user">Profesional</span>
            </a>
          </div>
          <hr className="text-white d-none d-sm-block nav_line" />
          <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
            <li className="nav-item text-white my-1 py-2 py-sm-2 inicio-menu " >
              <NavLink

                to="/inicio"
                className="ms-2 d-none d-sm-inline bottonnav-item"
              >
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className="fa-solid fa-house size-font"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Inicio 
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink
                to="/calendar"
                className="ms-2 d-none d-sm-inline bottonnav-item"
              >
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className='fa-solid fa-calendar size-font'></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Agenda
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink 
              to='/perfilProfessional'
              className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                 <i className='fa-solid fa-user size-font'></i>
                  <span className="ms-2 d-none d-sm-inline">Mi perfil</span>
                </a>
              </NavLink>
            </li>

            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <NavLink 
              to='/estadisticas'
              className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className='fa-solid fa-chart-line size-font'></i>
                  <span className="ms-2 d-none d-sm-inline">Estadisticas</span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink 
              to='/misPacientes'
              className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className='fa-solid fa-users size-font'></i>
                  <span className="ms-2 d-none d-sm-inline">Mis pacientes</span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
                href="https://collectednotes.com/"
                target="_blank" rel="noreferrer"
              >
                <i className='fa-solid fa-circle-info size-font'></i>
                <span className="ms-2 d-none d-sm-inline">Ayuda</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      ) : ( // MENÚ PACIENTE
        <div className="col-auto col-sm-3 menu-lateral fijar-nav nav_content">
        <div className="">
          <div className="nav-title">
            <a className="text-decoration-none d-flex align-items-center text-sm-start text-white d-none d-sm-inline">
              <span className="fs-4 title-user">Paciente</span>
            </a>
          </div>
          <hr className="text-white d-none d-sm-block nav_line" />
          <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
            <li className="nav-item text-white my-1 py-2 py-sm-2 inicio-menu ">
            <NavLink
                to="/inicio"
                className="ms-2 d-none d-sm-inline bottonnav-item"
              >
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i class="fa-solid fa-house size-font"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Inicio
                  </span>
                </a>
            </NavLink>
            </li>
              <li className="nav-item text-white my-1 py-2 py-sm-2 "> 
              <NavLink
                to="/search"
                className="ms-2 d-none d-sm-inline bottonnav-item"
              >
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i class="fa-solid fa-magnifying-glass size-font"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Buscar profesional
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <NavLink to="/profile" className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i className='fa-solid fa-user size-font'></i>
                  <span className="ms-2 d-none d-sm-inline">Mi Perfil</span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 ">
              <NavLink to="/list/turn" className="bottonnav-item">
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i class="fa-solid fa-notes-medical size-font"></i>
                  <span className="ms-2 d-none d-sm-inline">Próximos turnos</span>
                </a>
              </NavLink>
            </li>

            
            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
                href="https://collectednotes.com/"
                target="_blank" rel="noreferrer"
              >
                <i className='fa-solid fa-circle-info size-font'></i>
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
