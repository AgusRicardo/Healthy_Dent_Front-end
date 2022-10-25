
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { onLogout } from "../api/auth";
import { deleteItem } from "../redux/slices/userSlice";
import logonav from "../img/logoynombre.png";
import "../styles/navbar.css";


const Navbar = () => {
  const { isAuth } = useSelector((state) => state.authh);

  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await onLogout();


      dispatch(unauthenticateUser());
      dispatch(deleteItem());
      localStorage.removeItem("isAuth");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("password");

    } catch (error) {
      console.log(error.response);
    }
  };
  const name = localStorage.getItem("name");
  const last_name = localStorage.getItem("last_name");

  return (
    <nav className="navbar fondonav">
      <div className="container-fluid shadow ">
        <div className="logohd">
          <div className="logonav ">
            <NavLink to="/">
              <img src={logonav} className="logonav"/>
            </NavLink>
          </div>
        </div>

        {isAuth ? (
          <div className="navbar">
            <NavLink to="/register/professional" className="mx-3 regprof ">
              <a className="text_navbar">
                <i className="fa-solid fa-user-doctor icon_navbar"></i>
                Registrate como profesional
                </a>
            </NavLink>
            <NavLink to="/search" className="mx-3 searchprof">
              <a className="text_navbar">
                <i className="fa-solid fa-magnifying-glass icon_navbar"></i>
                Buscar profesional
                </a>
            </NavLink>
            <div className="btn-group" role="group">
                <a className="nav-link dropdown-toggle text_navbar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-circle-user icon_navbar"></i>
                {name} {last_name}
                </a>
              <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <li>
                  <NavLink to="/profile" style={{ textDecoration: "none" }}>
                    <button className="dropdown-item">Perfil</button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/list/turn" style={{ textDecoration: "none" }}>
                    <button className="dropdown-item">
                      Mis turnos
                    </button>
                  </NavLink>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => logout()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <NavLink to='/login'>
              <button type="button" className="btn btn-primary bn logbutton">
                    Iniciar sesion
              </button>
            </NavLink>

            <NavLink to='/register'>
              <button type="button" className="btn btn-primary bn regbutton">
                  Registrate
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
