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
                  <td>44.232.252</td>
                  <td><i className="fa-solid fa-eye"></i></td>
                </tr>
                <tr>
                  <td>apellido2, nombre2</td>
                  <td>4.552.268</td>
                  <td><i className="fa-solid fa-eye"></i></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
