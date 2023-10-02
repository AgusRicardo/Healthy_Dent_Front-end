import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { getProfesionalUserId, onLogout, url } from "../api/auth";
import { deleteItem } from "../redux/slices/userSlice";
import logonav from "../img/logoynombre.png";
import "../styles/navbar.css";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.authh);
  const [visibleLogin, setVisibleLogin] = useState(true);
  const [visibleRegister, setVisibleRegister] = useState(true);
  const [isProfessional, setIsProfessional] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const name = localStorage.getItem("name");
  const last_name = localStorage.getItem("last_name");
  const tipo = localStorage.getItem("tipo");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (location.pathname === "/login") {
      setVisibleLogin(false);
    }
    if (location.pathname === "/register") {
      setVisibleRegister(false);
    }
  }, [])

  const toggleDropdown = async () => {
    if (isAuth) {
      const { data } = await getProfesionalUserId(user_id);
      console.log(data);
      if (data.length > 0) {
        setIsProfessional(true);
        console.log(data);
      }
    }
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      dispatch(deleteItem());
      localStorage.removeItem("isAuth");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("tipo");
      localStorage.removeItem("user_id");
      localStorage.removeItem("prof_id");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <nav className="navbar fondonav">
        <div className="container-fluid shadow ">
          <div className="logohd">
            <div className="logonav ">
              {!isAuth ? (
                <NavLink to="/">
                  <img
                    src={logonav}
                    className="logonav"
                    alt="Logo de Healthy-Dent"
                  />
                </NavLink>
              ) : (
                <img
                  src={logonav}
                  className="logonav"
                  alt="Logo de Healthy-Dent"
                />
              )}
            </div>
          </div>

          {isAuth ? (
            <div className="navbar">
              <div className="btn-group" role="group">
                <a
                  className="nav-link dropdown-toggle text_navbar btn_navbar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={toggleDropdown}
                >
                  <i className="fa-solid fa-circle-user  iconnav-user"></i>
                  {name} {last_name}
                </a>
                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="btnGroupDrop1">
                  {
                    tipo === 'Paciente' && isProfessional === false ? (
                    <li>
                      <NavLink to="/register/professional"
                        className="regist-prof"
                      >
                        <button className="dropdown-item">
                          Registro profesional
                        </button>
                      </NavLink>
                    </li>
                    )
                    :
                    (
                      null
                    )
                  }
                  <li>
                    <button className="dropdown-item" onClick={() => logout()}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              {
                visibleLogin &&
                <NavLink to="/login">
                  <button type="button" className="btn btn-primary bn logbutton">
                    Iniciar sesión
                  </button>
                </NavLink>
              }
              {
                visibleRegister &&
                <NavLink to="/register">
                  <button type="button" className="btn btn-primary bn regbutton">
                    Registrarse
                  </button>
                </NavLink>
              }
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
