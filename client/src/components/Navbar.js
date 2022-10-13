
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { onLogout } from "../api/auth";
import { deleteItem, selectUser } from "../redux/slices/userSlice";
import logonav from "../img/logo.png";
import navcss from "..//styles/navbar.css";


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
      <div className="container-fluid">
        <div className="logohd">
          <div className="logonav ">
            <NavLink to="/">
              <img src={logonav} className="logonav" width={"140px"} />
            </NavLink>
          </div>
          <div className="nombremarca  s-auto">
            <h1>Healthy Dent</h1>
          </div>
        </div>

        {isAuth ? (
          <div className="navbar">
            <NavLink to="/register/professional" className="mx-3">
              <span>Registrate como profesional</span>
            </NavLink>
            <NavLink to="/search" className="mx-3">
              <span>Buscar profesional</span>
            </NavLink>
            <div className="btn-group" role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {name} {last_name}
              </button>
              <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <li>
                  <NavLink to="/profile" style={{ textDecoration: "none" }}>
                    <button className="dropdown-item">Perfil</button>
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
            <NavLink to='/login' style={{textDecoration: 'none', color: 'grey'}}>
              <span>Login</span>
            </NavLink>

            <NavLink to='/register' className='mx-3' style={{border: '1px solid black', borderRadius: '7px', padding: '5px', textDecoration: 'none', backgroundColor: 'white', color: 'black'}}>
              <span >Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
