import { React, useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/Layout";
import "../styles/register.css";
import { NavLink } from "react-router-dom";

export const Register = () => {
  const [values, setValues] = useState({
    dni: "",
    name: "",
    last_name: "",
    date_birth: "",
    address_user: "",
    email_user: "",
    telephone: "",
    password: "",
    prepaid_id: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({
        dni: "",
        name: "",
        last_name: "",
        date_birth: "",
        address_user: "",
        email_user: "",
        telephone: "",
        password: "",
        prepaid_id: "DEFAULT",
      });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <Layout>
      <div className="container-login container regcontainer" id="container">
        <div className="">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="container offset-md-12"
          >
            <br />
            <h1 className="regtitle rounded-3">Registro</h1>
            <br />
            <div className="formfirst">
              <h5 className="subtitleform">Personal</h5>
              <hr className="separador"></hr>
              <div className="row g-2 mb-3">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="text"
                      value={values.name}
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
                      onChange={(e) => onChange(e)}
                      type="text"
                      value={values.last_name}
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
              </div>

              <div className="mb-3">
                <div className="form-floating">
                  <input
                    onChange={(e) => onChange(e)}
                    type="email"
                    className="form-control inputreg"
                    id="email"
                    name="email_user"
                    value={values.email_user}
                    placeholder="test@gmail.com"
                    autoComplete="off"
                    required
                  />
                  <label className="form-label" htmlFor="floatingInputGrid">
                    Email
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-floating">
                  <input
                    onChange={(e) => onChange(e)}
                    type="password"
                    value={values.password}
                    className="form-control inputreg"
                    id="password"
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="floatingInputGrid" className="form-label">
                    Password
                  </label>
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="text"
                      value={values.dni}
                      className="form-control inputreg"
                      id="dni"
                      name="dni"
                      placeholder="DNI"
                      autoComplete="off"
                      pattern="[0-9]{7}"
                      title="Debe poner 7 números como mínimo"
                      required
                    />
                    <label htmlFor="floatingInputGrid" className="form-label">
                      DNI
                    </label>
                  </div>
                </div>

                <div className="col-md">
                  <div className="form-floating">
                    <select
                      defaultValue={"DEFAULT"}
                      className="form-select inputreg"
                      id="floatingSelectGrid"
                      aria-label="Floating label select example"
                      name="prepaid_id"
                      onChange={(e) => onChange(e)}
                    >
                      <option defaultValue value="DEFAULT" disabled>
                        Seleccione su obra social ...
                      </option>
                      <option value="1">Particular</option>
                      <option value="2">IAPOS</option>
                      <option value="3">OMINT</option>
                      <option value="4">MEDICINA ESENCIAL</option>
                      <option value="5">OSCHOCA</option>
                      <option value="6">OSPRERA</option>
                      <option value="7">OSPE</option>
                      <option value="8">Unión Personal</option>
                      <option value="9">FEMEBA</option>
                      <option value="10">OSMEDICA</option>
                    </select>
                    <label htmlFor="floatingSelectGrid">Obra social</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-floating">
                  <input
                    onChange={(e) => onChange(e)}
                    type="date"
                    value={values.date_birth}
                    className="form-control inputreg"
                    id="date_birth"
                    name="date_birth"
                    placeholder="date_birth"
                    autoComplete="off"
                    min="1920-01-01"
                    max="2004-01-01"
                    required
                  />
                  <label className="form-label" htmlFor="floatingSelectGrid">
                    Fecha de nacimiento
                  </label>
                </div>
              </div>
            </div>
            <br />
            <div className="secondform">
              <h5 className="subtitleform">Contacto</h5>
              <hr className="separador"></hr>
              <div className="row g-2 mb-3">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="text"
                      value={values.address_user}
                      className="form-control inputreg"
                      id="address_user"
                      name="address_user"
                      placeholder="address_user"
                      autoComplete="off"
                      required
                    />
                    <label className="form-label" htmlFor="floatingSelectGrid">
                      Direccion
                    </label>
                  </div>
                </div>

                <div className="col-md">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="number"
                      value={values.telephone}
                      className="form-control inputreg"
                      id="telephone"
                      name="telephone"
                      placeholder="telephone"
                      autoComplete="off"
                      required
                    />
                    <label className="form-label" htmlFor="floatingSelectGrid">
                      Telefono
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ color: "red", margin: "10px 0", fontSize: "18px" }}
              >
                {error}
              </div>
            )}
            {success && (
              <>
              <div>
                <NavLink to="/register/professional" className="registerBottom">
                <a>Registrate como profesional</a>  
                </NavLink>
              </div>
              <div
                className="alert alert-success"
                role="alert"
                style={{ color: "green", margin: "10px 0", fontSize: "18px" }}
              >
                {success}
            </div>
              </>
            )}
            <div className="containerbutreg">
            <button type="submit" className="btn btn-primary regbutton">
              Registrarse
            </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
