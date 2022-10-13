import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Loading } from "../components/Loading";
import { selectUser } from "../redux/slices/userSlice";

export const MyTurns = () => {
  const item = useSelector(selectUser);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://healthy-dent-back-end.fly.dev/list/turn/${item[0].id}`)
    // fetch(`http://localhost:4000/list/turn/${item[0].id}`)
      .then((response) => response.json())
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      });
  }, [isLoading]);


  if ((user === undefined) || ((user.date || user.hour || user.last_name || user.name) === null)) {
    return (
      <section className="container">
          <h2>Mis turnos</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Profesional</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </section>
    )
  }

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="container">
          <h2>Mis turnos</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Profesional</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
              </tr>
            </thead>
            <tbody>
              {
                (user === undefined) || ((user.date || user.hour || user.last_name || user.name) === null) ? (
                  user.map((turn, index) => (
                  <tr >
                    <th scope="row" key={turn.user_id}>{index + 1}</th>
                    <td>{turn.name} {turn.last_name}</td>
                    <td>{(turn.date).slice(0, -14)}</td>
                    <td>{turn.hour}</td>
                  </tr>
                  ))
                ) : (
                  <div>Todavía no hay turnos</div>
                )}
            </tbody>
          </table>
        </section>
      )}
    </Layout>
  );
};
