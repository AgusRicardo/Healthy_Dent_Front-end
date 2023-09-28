import { React, useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/Layout";
import "../styles/register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { ToastSuccess } from "../components/ToastSuccess";
import { ToastError } from "../components/ToastError";

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
  const [inputError, setInputError] = useState(false);
  const [prepaid, setPrepaid] = useState(false)
  const [telephoneSuccess, setTelephoneSuccess] = useState(false)
  const [addressSuccess, setAddressSuccess] = useState(false)
  const navigate = useNavigate()


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if ((values.name).trim() === "" || (values.last_name).trim() === "" || (values.address_user).trim() === "" || (values.password).trim() === "") {
      setInputError(true);
      return;
    }
    if (values.prepaid_id === "DEFAULT" || values.prepaid_id === "") {
      setPrepaid(true);
      return;
    }
    if (values.dni.length < 7 || values.dni.length > 8) {
      setInputError(true);
      return;
    }
    if (values.telephone.length < 10 || values.telephone.length > 15) {
      setTelephoneSuccess(true);
      return;
    }
    if (values.address_user.length < 3 || values.address_user.length > 50) {
      setAddressSuccess(true)
      return;
    }

    try {
      setAddressSuccess(false);
      setTelephoneSuccess(false);
      setInputError(false);
      setPrepaid(false);
      values.name = capitalizeFirstLetter(values.name);
      values.last_name = capitalizeFirstLetter(values.last_name);
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data && true)
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
      setTimeout(() => {
        navigate('/login')
      }, 2100);
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
            <div className="formfirstreg">
              <h5 className="subtitleform">Información personal</h5>
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
                    Contraseña
                  </label>
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="number"
                      value={values.dni}
                      className="form-control inputreg"
                      id="dni"
                      name="dni"
                      placeholder="DNI"
                      autoComplete="off"
                      pattern=".{7,8}"
                      title="El rango requerido es entre 7 y 8 caracteres"
                      required
                      min="0"
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
                      required
                    >
                      <option defaultValue value="DEFAULT" disabled>
                        Seleccione su obra social ...
                      </option>
                      <option value="1">Particular</option>
                      <option value="2">Iapos</option>
                      <option value="3">Omint</option>
                      <option value="4">Medicina Esencial</option>
                      <option value="5">Oschoca</option>
                      <option value="6">Osprera</option>
                      <option value="7">Ospe</option>
                      <option value="8">Unión Personal</option>
                      <option value="9">Femeba</option>
                      <option value="10">Osmedica</option>
                    </select>
                    <label htmlFor="floatingSelectGrid">Obra social</label>
                  </div>
                  <span className="error-text">
                    {prepaid && "Seleccione una opción válida"}
                  </span>
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
                        Dirección
                      </label>
                    </div>
                    <span className="error-text">
                      {addressSuccess && "La longitud debe ser entre 3 y 50 caracteres."}
                    </span>
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
                        min="0"
                        required
                      />
                      <label className="form-label" htmlFor="floatingSelectGrid">
                        Teléfono
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <span className="error-text">
              {inputError && "Un campo ingresado es inválido"}
            </span>
            <span className="error-text">
              {telephoneSuccess && "La longitud del teléfono debe ser entre 10 y 15 caracteres."}
            </span>
            {error && (
              <ToastError titulo='Hubo un error' descripcion={error} />
            )}
            {success && (
              <>
                <ToastSuccess titulo='¡Se ha registrado con éxito!' />
              </>
            )}
            <div>
              <p>
                Al registrarse, está aceptando nuestros{" "}
                <a href="#" style={{ color: "#00c1fc" }}>
                  Términos y Condiciones
                </a>{" "}
                
              </p>
            </div>
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
