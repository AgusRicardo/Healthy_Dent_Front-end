import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'

export const Perfil = () => {
  const { isAuth } = useSelector((state) => state.authh)
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState()

  
  useEffect(() => {
    fetch(`http://localhost:4000/user/${isAuth.values.payload.id}`)
    // fetch(`https://healthydent-production.up.railway.app/user/${isAuth.values.payload.id}`)
    .then((response) => response.json())
    .then((res) => {
      setUser(res);
      setIsLoading(false); 
    });
  }, [isLoading]);
  
  if (isLoading) { 
    return (
      <Layout>
        <div>
          <h1>Cargando...</h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {isLoading ? (
        <Layout>
        <div>
          <h1>Cargando...</h1>
        </div>
      </Layout>
      ): (
        <div className='container' key={user.user_id} style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
          <div className="card" style={{width: '35rem'}}>
            <img src="https://enciclopedia.net/wp-content/uploads/2013/11/usuario.jpg" width="150px" className="" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{user.name} {user.last_name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><b>Email:</b> {user.email_user}</li>
              <li className="list-group-item"><b>DNI:</b> {user.dni}</li>
              <li className="list-group-item"><b>Fecha de nacimiento:</b> {(user.date_birth).slice(0, -14)}</li>
              <li className="list-group-item"><b>Dirección:</b> {user.address_user}</li>
              <li className="list-group-item"><b>Teléfono:</b> {user.telephone}</li>
            </ul>
          <button className="btn btn-outline-info">Editar</button>
          <button className="btn btn-outline-danger">Eliminar cuenta</button>
          </div>
        </div>
      )}
    </Layout>
  )
}
