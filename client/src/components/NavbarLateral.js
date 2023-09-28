import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAttachment, url } from "../api/auth";
import "../styles/navbar_lateral.css";

const NavbarLateral = () => {
  const tipo = localStorage.getItem("tipo");
  
  const [value, setValue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (tipo === 'Paciente') {
        const userManual = 2;
        try {
          const { data } = await getAttachment(userManual);
          setValue(data[0].url);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      } else {
        const professionalManual = 1; 
        try {
          const { data } = await getAttachment(professionalManual);
          setValue(data[0].url);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      }
    };
  
    fetchData();
  
  }, []);

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
            <li className="nav-item text-white my-1 py-2 py-sm-2" >
              <NavLink
                to="/inicio"
                className="bottonnav-item"
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
                className="bottonnav-item"
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
                  <span className="ms-2 d-none d-sm-inline">Mi Perfil</span>
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
                  <span className="ms-2 d-none d-sm-inline">Mis Pacientes</span>
                </a>
              </NavLink>
            </li>
            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
                href={value}
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
            <li className="nav-item text-white my-1 py-2 py-sm-2">
            <NavLink
                to="/inicio"
                className="bottonnav-item"
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
                className="bottonnav-item"
              >
                <a
                  className="nav-link text-center text-sm-start"
                  aria-current="page"
                >
                  <i class="fa-solid fa-magnifying-glass size-font"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Buscar Profesional
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
                  <span className="ms-2 d-none d-sm-inline">Próximos Turnos</span>
                </a>
              </NavLink>
            </li>

            
            <li className="nav-item text-white my-1 py-2 py-sm-2 bottonnav-item">
              <a
                className="nav-link text-center text-sm-start"
                aria-current="page"
                href={value}
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
