import React, { useState } from 'react';
import '../styles/inicio.css';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';
import { getAttachment } from "../api/auth";

export const Inicio = () => {
  const tipo = localStorage.getItem('tipo');
  const last_name = localStorage.getItem('last_name');
  const [value, setValue] = useState();

  const toggleClick = async () => {
    if (tipo === 'Paciente') {
      const userManual = 2;
      try {
        const { data } = await getAttachment(userManual);
        setValue(data[0].url);
        window.open(`${data[0].url}`, '_blank');
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    } else {
      const professionalManual = 1; 
      try {
        const { data } = await getAttachment(professionalManual);
        setValue(data[0].url);
        window.open(`${data[0].url}`, '_blank');
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
  }

  return (
    <>
    {
      tipo === 'Profesional' ? ( // MENÚ PROFESIONAL
        <div>
          <Navbar />
          <div className='container'>
            <div className='prof-title'>
              <i className='fa-solid fa-circle-user icono-perfil'></i>
            </div>
            <div className='prof-title'>
              <h1 className='welcome'>Bienvenido {last_name}</h1>
            </div>
              <div className='prof-title'>
                <ul className='nav nav-tabs nav-tabs-home'>
                  <li>
                    <NavLink to='/calendar' className='nav-text'>
                      <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                        <i className='fa-solid fa-calendar size-font'></i>
                        Agenda
                      </a>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/perfilProfessional' className='nav-text'>
                    <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                      <i className='fa-solid fa-user size-font'></i>
                      Mi Perfil
                    </a>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/estadisticas' className='nav-text'>
                    <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                      <i className='fa-solid fa-chart-line size-font'></i>
                      Estadísticas
                    </a>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/misPacientes' className='nav-text'>
                      <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                        <i className='fa-solid fa-users size-font'></i>
                        Mis Pacientes
                      </a>
                    </NavLink>
                  </li>
                  <li>
                    <a rel="noreferrer" onClick={toggleClick} className='button-extra-one nav-link cursor active text1 nav-link-home'>
                      <i className='fa-solid fa-circle-info size-font'></i>
                      Ayuda
                    </a>
                  </li>
                  <div className='container square squareProf'>
                    <div className="novedades-titulo">Novedades</div>
                    <div className="novedades">
                      <p>Update v1.2.0</p>
                      <h6>Nuevo:</h6>
                      <ul class="fa-ul">
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Aplicación accesible para usuarios Profesionales.
                        </li>
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Nuevo login.
                        </li>
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Implementación del módulo Inicio.
                        </li>
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Módulo Agenda, que incluye un calendario y un panel para visualizar los próximos 5 turnos, así como la posibilidad de desplegar un pop-up para ver todos los turnos de hoy.
                        </li>
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Módulo Mi perfil, compuesto por toda la información del profesional y la posibilidad de editar campos seleccionados.
                        </li>
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Módulo Mis pacientes, apartado orientado a la búsqueda de pacientes del profesional.
                        </li>
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Módulo Estadísticas.
                        </li>
                        <li className='item-list'><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>
                        Módulo Ayuda.
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </div>
          </div>
        </div>
      ) : ( // MENÚ PACIENTE
      <div>
      <Navbar />
      <div className='container'>
        <div className='prof-title'>
          <i className='fa-solid fa-circle-user icono-perfil'></i>
        </div>
        <div className='prof-title'>
          <h1 className='welcome'>Bienvenido {last_name}</h1>
        </div>
          <div className='prof-title'>
            <ul className='nav nav-tabs nav-tabs-home'>
              <li>
                <NavLink to='/search' className='nav-text'>
                  <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                  <i class="fa-solid fa-magnifying-glass size-font"></i>
                    Buscar Profesional
                  </a>
                </NavLink>
              </li>
              <li>
                <NavLink to='/profile' className='nav-text'>
                <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                  <i className='fa-solid fa-user size-font'></i>
                  Mi Perfil
                </a>
                </NavLink>
              </li>
              <li>
                <NavLink to='/list/turn' className='nav-text'>
                <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                  <i class="fa-solid fa-notes-medical size-font"></i>
                  Próximos Turnos
                </a>
                </NavLink>
              </li>
              <li>
                <a rel="noreferrer" onClick={toggleClick} className='button-extra-one nav-link cursor active text1 nav-link-home'>
                  <i className='fa-solid fa-circle-info size-font'></i>
                  Ayuda
                </a>
              </li>
              <div className='container square'></div>
            </ul>
          </div>
      </div>
    </div>
      )
    }
    </>
  );
};
