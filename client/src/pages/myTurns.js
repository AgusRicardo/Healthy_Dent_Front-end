import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../api/auth";
import Layout from "../components/Layout";
import { Loading } from "../components/Loading";
import { selectUser } from "../redux/slices/userSlice";

export const MyTurns = () => {
  const item = useSelector(selectUser);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //fetch(`https://healthy-dent-back-end.fly.dev/list/turn/${item[0].id}`)
    fetch(`${url}/list/turn/${item[0].id}`)
      .then((response) => response.json())
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      });
  }, [isLoading]);

console.log(user)
  return (
    <Layout>
      {
      isLoading ? (
        <Loading />
      ) : (
        <section className="container">
          <h2>Mis turnos</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Profesional</th>
                <th scope="col">Tratamiento</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
              </tr>
            </thead>
            <tbody>
              {
                (user === undefined) || ((user[0].date || user[0].hour || user[0].last_name || user[0].name) === null) ? (
                  <div>Todavía no hay turnos</div>
                ) : (
                  user.map((turn, index) => (
                    <tr>
                      <th scope="row" key={turn.user_id}>{index + 1}</th>
                      <td>{turn.name} {turn.last_name}</td>
                      <td>{turn.treatment}</td>
                      <td>{(turn.date).slice(0, -14)}</td>
                      <td>{turn.hour}</td>
                    </tr>
                    ))
                )}
            </tbody>
          </table>
        </section>
      )}
    </Layout>
  );
};
