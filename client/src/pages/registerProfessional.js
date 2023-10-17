import React, { useEffect, useState } from "react";
import { getSpecialization, registerProfessional, url } from "../api/auth";
import Layout from "../components/Layout";
import "../styles/registerProfessional.css";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { ToastSuccess } from "../components/ToastSuccess";
import { getAttachment } from "../api/auth";

const RegisterProfessional = () => {
  const [inputError, setInputError] = useState(false);
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matriculaSuccess, setMatriculaSuccess] = useState(false);
  const [noSpecialization, setNoSpecialization] = useState(false)
  const [specializations, setSpecializations] = useState([]);
  const [value, setValue] = useState();
  useEffect(() => {
    fetch(`${url}/lastUserId`)
      .then((response) => response.json())
      .then((res) => {
        setId(res[0].user_id);
        setValues({ ...values, user_id: `${res[0].user_id}` });
        setIsLoading(false);
      });
      const fetchData = async () => {
        try {
          const { data } = await getSpecialization();
          setSpecializations(data);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
    
      fetchData();
  }, [isLoading]);
  
  const toggleClick = async () =>{
    const manual=3;
    try {
      const { data } = await getAttachment(manual);
      setValue(data[0].url);
      window.open(`${data[0].url}`, '_blank');
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  const postValueSpecialization = (e)=>{
    const foundElement = specializations.find((element) => element.description === e);
    return foundElement ? foundElement.spe_id : null;
  }

  const [values, setValues] = useState({
    n_matric: "",
    specialization: "",

  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const selectSpeId =  postValueSpecialization(values.specialization)
    values.specialization = selectSpeId
    if (values.n_matric.length < 6 || values.n_matric.length > 7) {
      setMatriculaSuccess(true);
      return;
    }

    if (!values.specialization) {
      setNoSpecialization(true);
      return;
    }

    try {
      setInputError(false);
      setMatriculaSuccess(false);
      setNoSpecialization(false);
      const { data } = await registerProfessional(values);
      setError("");
      setSuccess(data && true);
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };
  return (
    <Layout>
      {
        isLoading ? (
          <Loading/>
        ):(
        <div className="container  containerprof" id="container">
          <div className="form-prof">
            <form
              onSubmit={(e) => onSubmit(e)}
              className="container"
            >
              <br />
              <h1 className="regtitle rounded-3">Registrarse como profesional</h1>
              <br />
              <div className="formfirst">
                <h5 className="subtitleform">Datos profesionales</h5>
                <hr className="separador sepreg"></hr>
                <div className=" mb-3">
                  <div className="">
                    <div className="form-floating">
                      <input
                        onChange={(e) => onChange(e)}
                        type="number"
                        value={values.n_matric}
                        className="form-control"
                        id="n_matric"
                        name="n_matric"
                        placeholder="n_matric"
                        autoComplete="off"
                        title="La longitud de la matricula debe ser entre 6 y 7 caracteres."
                        min={0}
                        required
                      />
                      <label className="form-label" htmlFor="floatingInputGrid">
                        Nro de matrícula
                      </label>
                    </div>
                  </div>
                  <br></br>
                  <div className="col-md">
                  <div className="form-floating">
                      <select
                        onChange={(e) => onChange(e)}
            
                        value={values.specialization || ""}
                        className="form-select"
                        id="specialization"
                        name="specialization"
                        required
                      >
                        <option  value="" disabled>
                        Seleccione su especialidad...
                      </option>
                        {specializations.map((specialization) => (
                          <option value={specialization.description} key={specialization.spe_id}>
                            {specialization.description}
                          </option>
                        ))}
                      </select>
                      <label className="form-label" htmlFor="floatingInputGrid">
                        Especialización
                      </label>
                    </div>
                      <span className="error-text">
                        {inputError && "El campo ingresado es inválido"}
                      </span>
                  </div>
                </div>
                <h5>Datos de ubicación</h5>
                <hr className="separador sepreg"></hr>
                <div className="mb-3">
                  <div className="form-floating">
                    <input 
                        value="Grupo Oroño"
                        disabled
                        type="text"
                        className="form-control"
                        placeholder="Lugar de atencion"
                        autoComplete="off"
                        maxLength="45">
                    </input>
                    <label className="form-label" htmlFor="floatingInputGrid">
                      Lugar de atención
                    </label>
                  </div>
                </div>
              </div>
              {error && (
                <div
                  className="alert alert-danger"
                  role="alert"
                  style={{ color: "red", margin: "8px 0", fontSize: "16px" }}
                >
                  {error}
                </div>
              )}
              {success && (
                <ToastSuccess titulo='¡Registro exitoso!' descripcion='Se ha registrado como profesional'/>
              )}
              <span className="error-text">
              {matriculaSuccess && "La longitud de la matrícula debe ser entre 6 y 7 caracteres."}
              </span>
              <div>
              <p>
                Al registrarse, está aceptando nuestros{" "}
                <a onClick={toggleClick} style={{ color: "#00c1fc", cursor: "pointer"  }}>
                  Términos y Condiciones
                </a>{" "}
                
              </p>
            </div>
              <div className="containerbuttonregprof">
              <button type="submit" className="btn btn-primary regprofbutton">
                Registrarse
              </button>
              </div>
            </form>
          </div>
        </div>
        )
      }
    </Layout>
  );
};

export default RegisterProfessional;
