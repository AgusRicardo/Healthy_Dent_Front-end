import React from 'react'
import Layout from '../components/Layout'
import "../styles/misPacientes.css"

export const MisPacientes = () => {

  return (
    <>
      <Layout>
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
                      <input type="search" className="form-control search-paciente" placeholder="Buscar paciente" aria-describedby="button-addon2"/>
                      <span className="input-group-text search-paciente" id="basic-addon2"><i className="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Todos los pacientes */}
                <tr>
                  <td>apellido, nombre</td>
                  <td>44.232.256</td>
                  <td><i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
                </tr>
                <tr>
                  <td>apellido2, nombre2</td>
                  <td>4.552.268</td>
                  <td><i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog sin-padding modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content sin-padding">
                <div class="modal-header info_paciente_header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body box-modal container_body_modal">
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
                      <div className="prox_modal"><i className="fa-solid fa-eye"></i></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          </div>
      </Layout>
    </>
  )
}
