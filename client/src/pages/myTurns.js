import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../api/auth";
import Layout from "../components/Layout";
import { Loading } from "../components/Loading";
import { selectUser } from "../redux/slices/userSlice";
import "../styles/myturn.css";

export const MyTurns = () => {
  const item = useSelector(selectUser);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/list/turn/${item[0].id}`)
      .then((response) => response.json())
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="intro container tablaturn">
          <div className="titulomyturn">
            <h2>Próximos turnos</h2>
          </div>

          <div className="bg-image h-100 divtable ">
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body p-0">
                        <div
                          className="table-responsive table-scroll"
                          data-mdb-perfect-scrollbar="true"
                          style={{ position: "relative", height: "700px" }}
                        >
                          <table className="table table-striped mb-0">
                            <thead className="marcosuo">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Profesional</th>
                                <th scope="col">Tratamiento</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user === undefined ||
                              (user[0].date ||
                                user[0].hour ||
                                user[0].last_name ||
                                user[0].name) === null ? (
                                <div>Todavía no hay turnos</div>
                              ) : (
                                user.map((turn, index) => (
                                  <tr key={index}>
                                    <th scope="row" key={turn.user_id}>
                                      {index + 1}
                                    </th>
                                    <td>
                                      {turn.name} {turn.last_name}
                                    </td>
                                    <td>{turn.treatment}</td>
                                    <td>{turn.date.slice(0, -14)}</td>
                                    <td>{turn.hour}</td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
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
