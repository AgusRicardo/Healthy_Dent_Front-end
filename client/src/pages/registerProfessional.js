import React, { useEffect, useState } from "react";
import { registerProfessional, url } from "../api/auth";
import Layout from "../components/Layout";
import "../styles/registerProfessional.css";
import { Loading } from "../components/Loading";

const RegisterProfessional = () => {
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${url}/lastUserId`)
      .then((response) => response.json())
      .then((res) => {
        setId(res[0].user_id);
        setValues({ ...values, user_id: `${res[0].user_id}`})
        setIsLoading(false); 
      });
  }, [isLoading]);

  const [values, setValues] = useState({  
    n_matric: "",
    specialization: "",
  });
  console.log(values);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerProfessional(values);
      setError("");
      setSuccess(data.message);
      setValues({
        user_id: `${id[0].user_id}`,
        n_matric: "",
        specialization: "",
      });
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
        <div className="container-login container  contairegprof" id="container">
          <div className="">
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
                        value={values.email_user}
                        className="form-control"
                        id="n_matric"
                        name="n_matric"
                        placeholder="n_matric"
                        autoComplete="off"
                        maxLength="10"
                        required
                      />
                      <label className="form-label" htmlFor="floatingInputGrid">
                        Nro de matricula
                      </label>
                    </div>
                  </div>
                  <br></br>
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        value={values.password}
                        className="form-control"
                        id="specialization"
                        name="specialization"
                        placeholder="specialization"
                        autoComplete="off"
                        maxLength="45"
                        required
                      />
                      <label className="form-label" htmlFor="floatingInputGrid">
                        Especializacion
                      </label>
                    </div>
                  </div>
                </div>
                <h5>Datos de ubicacion</h5>
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
                      Lugar de atencion
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
                <div
                  className="alert alert-success"
                  role="alert"
                  style={{ color: "green", margin: "10px 0", fontSize: "18px" }}
                >
                  {success}
                </div>
              )}
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
