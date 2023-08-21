import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../api/auth";
import Layout from "../components/Layout";
import { Loading } from "../components/Loading";
import { selectUser } from "../redux/slices/userSlice";
import "../styles/perfil.css";

export const Perfil = () => {
  const item = useSelector(selectUser);

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingPrepaid, setIsLoadingPrepaid] = useState(true);
  const [user, setUser] = useState();
  const [prepaid, setPrepaid] = useState();

  useEffect(() => {
    fetch(`${url}/user/${item[0].id}`)
      .then((response) => response.json())
      .then((res) => {
        setUser(res);
        setIsLoadingUser(false);
      });
    fetch(`${url}/user/prepaid/${item[0].id}`)
      .then((response) => response.json())
      .then((res) => {
        setPrepaid(res);
        setIsLoadingPrepaid(false);
      });
  }, []);

  return (
    <Layout>
      {isLoadingUser || isLoadingPrepaid ? (
        <Loading />
      ) : (
        <section className="">
          <div className="">
            <div className="d-flex justify-content-center align-items-center container_profile ">
              <div className="col col-lg-6 mb-4 mb-lg-0 ">
                <div className="card mb-3 profile">
                  <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center text-white">
                      <img
                        src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
                        alt="Avatar"
                        className="img-fluid my-5"
                      />
                      <h4>
                        {user.name} {user.last_name}
                      </h4>
                      <i className="far fa-edit mb-5 btn_edit_profile"></i>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h5>Información</h5>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Nombre y Apellido</h6>
                            <p className="text-muted">
                              {user.name} {user.last_name}
                            </p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>DNI</h6>
                            <p className="text-muted">{user.dni}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Fecha de nacimiento</h6>
                            <p className="text-muted">
                              {user.date_birth.slice(0, -14)}
                            </p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Obra Social</h6>
                            <p className="text-muted">{prepaid.detail}</p>
                          </div>
                        </div>
                        <h5>Contacto</h5>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Teléfono</h6>
                            <p className="text-muted">{user.telephone}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{user.email_user}</p>
                          </div>
                        </div>
                        <div className="d-grid gap-2 d-md-block">
                          <button className="btn btn-warning me-md-2 btn_edit_profile" type="button">
                            Editar
                          </button>
                          <button className="btn btn-outline-danger" type="button">
                            Eliminar cuenta
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};
