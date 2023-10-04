import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import "../styles/misPacientes.css"
import { url } from '../api/auth';
import { Loading } from "../components/Loading";
import {  useState } from "react";



export const MisPacientes = () => {
  const prof_id = localStorage.getItem("prof_id");
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState()
  const [pacientes, setPaciente] = useState();
  const [searchName, setSearchName] = useState("") 

  useEffect(() => {
    fetch(`${url}/mypatient/${prof_id}`)
      .then((response) => response.json())
      .then((res) => {
        setPaciente(res);
        setState(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
      
  }, [isLoading]);

  const onChangeName = (e) => {
    setSearchName(e.target.value)
    filtrarName(e.target.value)
  };

  const filtrarName=(terminoBusqueda)=>{
    var resultadosBusqueda=state.filter((elemento) =>{
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }else if (elemento.dni.includes(terminoBusqueda)) {
        return elemento;
      }
    });
    setPaciente(resultadosBusqueda);
  };

  return (
      <Layout>
        {isLoading ? (
        <Loading />
      ) : (
        <>
        <div className="container-misPacientes container">
          <div className="container-general">
            <div className="container-row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className='row-title'>Paciente</th>
                    <th scope="col" className='row-title'>DNI</th>
                    <th scope="col" className='col-4'>
                      <div className="input-search input-group-sm">
                        <input type="search" className="form-control search-paciente" placeholder="Buscar paciente" aria-describedby="button-addon2" value={searchName} onChange={(e) => onChangeName(e)} />
                        <span className="input-group-text search-paciente" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Todos los pacientes */}
                  {pacientes && pacientes.map((paciente) => (
                    <tr key={paciente.id}>
                      <td>{paciente.name}</td>
                      <td>{paciente.dni}</td>
                      <td><i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content  ">
              <div className="modal-header info_paciente_header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body box-modal container_body_modal">
                <div className="container_info_foto">
                  <div className="container_info_paciente">
                    <div className="container_nombre_paciente">
                      <p className='row-title'>Paciente</p>
                      <p>nombre apellido</p>
                    </div>
                    <div className="container_dni_paciente">
                      <p className='row-title'>DNI</p>
                      <p>400000000</p>
                    </div>
                    <div className="container_email_paciente">
                      <p className='row-title'>Email</p>
                      <p>nombreapellido@gmail.com</p>
                    </div>
                    <div className="container_telefono_paciente">
                      <p className='row-title'>Teléfono</p>
                      <p>121231231</p>
                    </div>
                    <div className="container_domicilio_paciente">
                      <p className='row-title'>Domicilio</p>
                      <p>calle falsa 123</p>
                    </div>
                  </div>
                  <div className="container_foto_paciente">
                    <div className='cont_foto_pac'>
                      <i className='fa-solid fa-circle-user icono_modal_paciente'></i>
                    </div>
                  </div>
                </div>

                <div className="container_seguimiento_paciente">
                  <p className="row-title">Seguimiento Clínico</p>
                  <div className='container_historial_p'>
                    <div className="motivo">motivo visita</div>
                    <div className="fecha_visita">fecha</div>
                    <div className="prox_modal"><i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#motivoVisita"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="motivoVisita" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog sin-padding modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content sin-padding">
              <div className="modal-header info_paciente_header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body box-modal container_body_modal">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                    <p className='row-title'>Paciente</p>
                      <p>nombre apellido</p>
                    </div>
                    <div className="col-sm-3">
                    <p className='row-title'>DNI</p>
                      <p>14494926</p>
                    </div>
                    <div className="col-sm-3">
                    <p className='row-title'>Fecha</p>
                      <p>27/09/2023</p>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                  <p className='row-title'>Motivo de visita</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel metus sit amet nulla tincidunt posuere in eget quam. Fusce eu metus sed turpis suscipit bibendum. Vivamus id ultrices nulla, quis iaculis eros. Nullam id magna vel purus elementum facilisis. Sed feugiat erat eu justo tincidunt, sed mattis nunc condimentum. Nullam quis dictum lectus, eu bibendum metus. Sed id est euismod, viverra orci at, tempor felis. Curabitur ac tincidunt ligula. Pellentesque efficitur odio in est dictum, quis fringilla orci dictum. Vivamus volut

                      </p>
                  </div>
                </div>
                
                  <div className="row" >
                  <input type="text" id="comentario" name="comentario" placeholder="Agregar comentario ..." style={{ border: 'none' , textAlign: 'left' }} ></input>
                  </div>
                
                  <div className="row">
                  <p className='row-title'>Adjuntos</p>
                  <a href='#' style={{ color: "#00c1fc" }} >Orden.png</a>
                  </div>
                  <div clas="row" >
                  <input type="text" id="comentario" name="comentario" placeholder="Agregar adjunto ..." style={{ border: 'none' , textAlign: 'left' }} ></input>
                  </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
      </Layout>
    
  );
};
