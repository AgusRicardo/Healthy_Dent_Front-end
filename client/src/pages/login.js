import { React, useState } from "react";
import { onLogin } from "../api/auth";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { addItem } from "../redux/slices/userSlice";
import { Loading } from "../components/Loading";
import "../styles/login.css";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const [values, setValues] = useState({
    email_user: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
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
  return (
    <Layout>
      <div className="container-login container" id="container">
        <div className="form-container sign-in-container">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="form_login"
            autocomplete="off"
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
            <NavLink to="/loginProfessional" className="loginProfessional">
              <a className="a_icon">¿Sos profesional? Iniciá sesión aquí</a>
            </NavLink>
            <a className="a_icon">Olvidaste tu contraseña?</a>
            <button className="button_signIn">Iniciar</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="h1_login">Bienvenido!</h1>
              <p className="p_login_text">
                Ingresa tus datos o registrate para empezar este viaje...
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
