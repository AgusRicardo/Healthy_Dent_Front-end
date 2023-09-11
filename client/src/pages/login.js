import { React, useState } from "react";
import { onLogin } from "../api/auth";
import { onLoginProfessional } from "../api/auth";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { addItem } from "../redux/slices/userSlice";
import { Loading } from "../components/Loading";
import "../styles/login.css";

export const Login = () => {
  const [values, setValues] = useState({
    email_user: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLogin, setBtnLogin] = useState(false);
  const [isActive, setIsActive] = useState(false);


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  // Esto envía el login del paciente
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onLogin(values);
      setIsLoading(true);
      dispatch(authenticateUser());
      dispatch(addItem(data.payload));
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("name", `${data.payload.name}`);
      localStorage.setItem("last_name", `${data.payload.last_name}`);
      localStorage.setItem("tipo", `${data.payload.tipo}`);
      localStorage.setItem("user_id", `${data.payload.id}`)
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  };

  // Esto envía el login del profesional
  const onSubmitProfessional = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onLoginProfessional(values);
      setIsLoading(true);
      dispatch(authenticateUser());
      dispatch(addItem(data.payload));
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("name", `${data.payload.name}`);
      localStorage.setItem("last_name", `${data.payload.last_name}`);
      localStorage.setItem("tipo", `${data.payload.tipo}`);
      localStorage.setItem("prof_id", `${data.payload.prof_id}`);
      localStorage.setItem("user_id", `${data.payload.id}`)
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  const btnChangeProfessional = () => {
    setBtnLogin(true)
    setIsActive(true)
  }

  const btnChangePatient = () => {
    setBtnLogin(false)
    setIsActive(false)
  }

  return (
    <Layout>
      <div className="container-wrapper">
        <div className="grid-container">
          <ul className="nav nav-tabs">
            <li>
              <a className={!isActive ? 'button-extra-one nav-link cursor active' : 'button-extra-one nav-link cursor'}  onClick={() => btnChangePatient()}>Paciente</a>
            </li>
            <li>
              <a className={isActive ? 'button-extra-two nav-link cursor active' : 'button-extra-two nav-link cursor'} onClick={() => btnChangeProfessional()}>Profesional</a>
            </li>
          </ul>
          { !btnLogin ? ( // ESTO ES EL LOGIN DEL PACIENTE
            <div className="container-login container" id="container">
            <div className="form-container sign-in-container">
              <form
                onSubmit={(e) => onSubmit(e)}
                className="form_login"
                autoComplete="off"
              >
                <h1 className="h1_login">Iniciar sesión</h1>
                <div className="social-container">
                  <a className="social a_icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="social a_icon">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a className="social a_icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => onChange(e)}
                  value={values.email_user}
                  className="form-control input_login"
                  id="email_user"
                  name="email_user"
                  autoComplete="off"
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => onChange(e)}
                  value={values.password}
                  className="form-control input_login"
                  id="password"
                  name="password"
                  autoComplete="off"
                  required
                />
                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ color: "red", margin: "8px 0", fontSize: "16px" }}
                  >
                    {error}
                  </div>
                )}
                <a className="a_icon">¿Olvidaste tu contraseña?</a>
                <button className="button_signIn">Iniciar</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                </div>
              </div>
            </div>
          </div>
            ) : ( // ESTO ES EL LOGIN DEL PROFESIONAL
              <div className="container-login container" id="container">
            <div className="form-container sign-in-container-prof">
              <form
                onSubmit={(e) => onSubmitProfessional(e)}
                className="form_login"
                autoComplete="off"
              >
                <h1 className="h1_login">Iniciar sesión</h1>
                <div className="social-container">
                  <a className="social a_icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="social a_icon">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a className="social a_icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>  
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => onChange(e)}
                  value={values.email_user}
                  className="form-control input_login"
                  id="email_user"
                  name="email_user"
                  autoComplete="off"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => onChange(e)}
                  value={values.password}
                  className="form-control input_login"
                  id="password"
                  name="password"
                  autoComplete="off"
                  required
                />
                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ color: "red", margin: "8px 0", fontSize: "16px" }}
                  >
                    {error}
                  </div>
                )}
                <a className="a_icon">¿Olvidaste tu contraseña?</a>
                <button className="button_signIn">Iniciar</button>
              </form>
            </div>
            <div className="overlay-container-prof">
              <div className="overlay">
                <div className="overlay-panel-prof overlay-right">
                </div>
              </div>
            </div>
          </div>
            )}
        </div>
      </div>
    </Layout>
  );
};
