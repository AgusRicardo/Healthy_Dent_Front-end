import React from 'react';
import Layout from "../components/Layout";
import "../styles/perfilProfessional.css";

export const PerfilProfessional = () => {

  return (
    <Layout>
        <section className='container'>
            <div className='squaro'>
                <div className='container_img'>
                <div className="col-md">
                    <div className='perfilProff_img'>
                        <i className='fa-solid fa-circle-user icono-perfil'></i>
                    </div>
                    <div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control inputreg"
                            id="name"
                            name="name"
                            placeholder="name"
                            autoComplete="off"
                            required
                            />
                            <label className="form-label" htmlFor="floatingInputGrid">
                            Nombre
                            </label>
                        </div>
                        </div>
                        <div className="col-md">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control inputreg"
                            id="last_name"
                            name="last_name"
                            placeholder="last_name"
                            autoComplete="off"
                            required
                            />
                            <label className="form-label" htmlFor="floatingInputGrid">
                            Apellido
                            </label>
                        </div>
                        </div>
                        <div className="col-md">
                        <div className="form-floating">
                            <input
                            type="date"
                            className="form-control inputreg"
                            id="fecha"
                            name="fecha"
                            placeholder="fecha"
                            autoComplete="off"
                            min="1920-01-01"
                            max="2004-01-01"
                            required
                            />
                            <label className="form-label" htmlFor="floatingInputGrid">
                            Fecha de nacimiento
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                  
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control inputreg"
                      id="direccion"
                      name="direccion"
                      placeholder="direccion"
                      autoComplete="off"
                      required
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Direccion
                    </label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control inputreg"
                      id="telefono"
                      name="telefono"
                      placeholder="telefono"
                      autoComplete="off"
                      required
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Teléfono
                    </label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control inputreg"
                      id="email"
                      name="email"
                      placeholder="test@gmail.com"
                      autoComplete="off"
                      required
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Email
                    </label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control inputreg"
                      id="especializacion"
                      name="especializacion"
                      placeholder="especializacion"
                      autoComplete="off"
                      required
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Especializacion
                    </label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="n_matric"
                      name="n_matric"
                      placeholder="n_matric"
                      autoComplete="off"
                      maxLength="10"
                      required
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Nro matricula
                    </label>
                  </div>
                </div>
            </div>
        </section>
    </Layout>
  )
}
