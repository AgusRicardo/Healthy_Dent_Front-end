import React, { useEffect, useState } from 'react';
import '../styles/inicio.css';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';

export const Inicio = () => {

  const tipo = localStorage.getItem('tipo');
  const last_name = localStorage.getItem('last_name');

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
                    <NavLink
                      to="/calendar"
                      className=""
                    >
                      <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                        <i className='fa-solid fa-calendar size-font'></i>
                        Agenda
                      </a>
                    </NavLink>
                  </li>
                  <li>
                    <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                      <i className='fa-solid fa-user size-font'></i>
                      Mi perfil
                    </a>
                  </li>
                  <li>
                    <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                      <i className='fa-solid fa-chart-line size-font'></i>
                      Estadisticas
                    </a>
                  </li>
                  <li>
                    <a className='button-extra-one nav-link cursor active text1 nav-link-home'>
                      <i className='fa-solid fa-users size-font'></i>
                      Mis Pacientes
                    </a>
                  </li>
                  <li>
                    <a href='https://collectednotes.com/' className='button-extra-one nav-link cursor active text1 nav-link-home'>
                      <i className='fa-solid fa-circle-info size-font'></i>
                      Ayuda
                    </a>
                  </li>
                </ul>
              </div>
            <div className='container square'></div>
          </div>
        </div>
      ) : ( // MENÚ PACIENTE
        <h1>Próximamente paciente</h1>
      )
    }
    </>
  );
};
