import React, { useEffect, useState } from "react";
//import { useSelector } from "react-redux";
import { editProfile, url } from "../api/auth";
import Layout from "../components/Layout";
import "../styles/perfilProfessional.css";
import { Loading } from "../components/Loading";
import { ToastError } from "../components/ToastError";
import { ToastSuccess } from "../components/ToastSuccess";
//import { selectUser } from "../redux/slices/userSlice";

export const PerfilProfessional = () => {
  //const item = useSelector(selectUser);
  const user_id = localStorage.getItem("user_id");
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [direccionDisabled, setdireccionDisabled] = useState(true);
  const [telefonoDisabled, settelefonoDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState(false);
  const [send, setSend] = useState(true);
  const [values, setValues] = useState({
    "user_id": user_id,
  });

  const toggleInputCancelar = () => {
    setdireccionDisabled(true);
    settelefonoDisabled(true);
    setEmailDisabled(true);
    setIsLoading(true);
    setSuccess(false);
    setError(false);

    setValues({
      "user_id": user_id,
    });
  }

  const toggleEdit = (controlName) => {
    switch (controlName) {
      case "Direccion":
        setdireccionDisabled(!direccionDisabled);
        setVisibleButtons(true);
        settelefonoDisabled(true);
        setEmailDisabled(true);
        break;
      case "Telefono":
        settelefonoDisabled(!telefonoDisabled);
        setVisibleButtons(true);
        setdireccionDisabled(true);
        setEmailDisabled(true);
        break;
      case "Email":
        setEmailDisabled(!emailDisabled);
        setVisibleButtons(true);
        setdireccionDisabled(true);
        settelefonoDisabled(true);
        break;
      default:
        break;
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch(`${url}/professional/profile/${user_id}`)
      .then((response) => response.json())
      .then((res) => {
        setUser(res);
        setIsLoading(false);
        setVisibleButtons(false);
      });
  }, [isLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(values).length > 1) {
      for (const key in values) {
        if (values[key] === " ") {
          return setError('Hay campos inválidos');
        }
      }
    }
    try {
      const { data } = await editProfile(values);
      setError("");
      setSuccess(data.message);
      setValues({
        "user_id": user_id,
      });
      setVisibleButtons(false);
      setdireccionDisabled(true);
      settelefonoDisabled(true);
      setEmailDisabled(true);
      setTimeout(() => {
        setIsLoading(true);
      }, 2100);
    } catch (error) {
      setValues({
        "user_id": user_id,
      });
      setError(error.response.data.error);
      setSuccess("");
      setdireccionDisabled(true);
      settelefonoDisabled(true);
      setEmailDisabled(true);
      setTimeout(() => {
        setIsLoading(true);
      }, 2100);
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
      <section className='container'>
        <div className='squaro'>
          <div className='container_img'>
            <div>
              <div className="col-md fields">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control inputreg-prof"
                    id="name"
                    name="name"
                    placeholder="name"
                    autoComplete="off"
                    required
                    value={user[0].name}
                    disabled
                  />
                  <label className="form-label" htmlFor="floatingInputGrid">
                    Nombre:
                  </label>
                </div>
              </div>
              <div className="col-md fields">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control inputreg-prof"
                    id="last_name"
                    name="last_name"
                    placeholder="last_name"
                    autoComplete="off"
                    required
                    value={user[0].last_name}
                    disabled
                  />
                  <label className="form-label" htmlFor="floatingInputGrid">
                    Apellido
                  </label>
                </div>
              </div>
              <div className="col-md fields">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control inputreg-prof"
                    id="fecha"
                    name="fecha"
                    placeholder="fecha"
                    autoComplete="off"
                    min="1920-01-01"
                    max="2004-01-01"
                    required
                    value={(new Date(user[0].date_birth)).toISOString().split('T')[0]}
                    disabled
                  />
                  <label className="form-label" htmlFor="floatingInputGrid">
                    Fecha de nacimiento
                  </label>
                </div>
              </div>
            </div>
            <div className='perfilProff_img'>
              <i className='fa-solid fa-circle-user icono-perfil-prof'></i>
            </div>
          </div>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='container_img'>
              <div className='container_form'>
                <div className="col-md fields">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="text"
                      className={`form-control inputreg-prof ${!direccionDisabled ? 'btn_active': ''}`}
                      id="direccion"
                      name="address_user"
                      placeholder="direccion"
                      autoComplete="off"
                      required
                      defaultValue={user[0].address_user}
                      disabled={direccionDisabled}
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Dirección
                    </label>
                      <i className="fa-solid fa-pen-to-square icon_edit" onClick={() => toggleEdit("Direccion")}></i>
                  </div>
                </div>
                <div className="col-md fields">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="number"
                      className={`form-control inputreg-prof ${!telefonoDisabled ? 'btn_active': ''}`}
                      id="telefono"
                      name="telephone"
                      placeholder="telefono"
                      autoComplete="off"
                      required
                      min="0"
                      defaultValue={user[0].telephone}
                      disabled={telefonoDisabled}
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Teléfono
                    </label>
                      <i class="fa-solid fa-pen-to-square icon_edit" onClick={() => toggleEdit("Telefono")}></i>
                  </div>
                </div>
                <div className="col-md fields">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="email"
                      className={`form-control inputreg-prof ${!emailDisabled ? 'btn_active': ''}`}
                      id="email"
                      name="email_user"
                      placeholder="test@gmail.com"
                      autoComplete="off"
                      required
                      defaultValue={user[0].email_user}
                      disabled={emailDisabled}
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Email
                    </label>
                      <i className="fa-solid fa-pen-to-square icon_edit" onClick={() => toggleEdit("Email")}></i>
                  </div>
                </div>
                <div className="col-md fields">
                  <div className="form-floating">
                    <input
                      onChange={(e) => onChange(e)}
                      type="text"
                      className={`form-control inputreg-prof`}
                      id="especializacion"
                      name="specialization"
                      placeholder="especializacion"
                      autoComplete="off"
                      required
                      defaultValue={user[0].specialization}
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Especialización
                    </label>
                  </div>
                </div>
                <div className="col-md fields">
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
                      value={user[0].n_matric}
                      disabled
                    />
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Nro matrícula
                    </label>
                      <i className="fa-solid fa-pen-to-square icon_matricula"></i>
                  </div>
                </div>
              </div>
            </div>
              {
                visibleButtons && (
                  <div className="container_btns">
                    <button className="btn btn-danger Button-edit" onClick={toggleInputCancelar}>Cancelar</button>
                    <button className="btn btn-success Button-edit" type="submit">Guardar</button>
                  </div>
                )
              }
          </form>
          {error && (
              <ToastError titulo='Hubo un error' descripcion={error}/>
            )}
            {success && (
              <ToastSuccess titulo='Perfil modificado exitosamente' descripcion={success} />
            )}
        </div>
      </section>
      )}
      
    </Layout>
  )
}
