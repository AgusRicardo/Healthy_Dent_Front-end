import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { Loading } from '../components/Loading'
import { selectUser } from '../redux/slices/userSlice'


export const Perfil = () => {
  const item = useSelector(selectUser)

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingPrepaid, setIsLoadingPrepaid] = useState(true);
  const [user, setUser] = useState()
  const [prepaid, setPrepaid] = useState()

  
  useEffect(() => {
    fetch(`https://healthy-dent-back-end.fly.dev/user/${item[0].id}`)
    //fetch(`http://localhost:4000/user/${item[0].id}`)
    .then((response) => response.json())
    .then((res) => {
      setUser(res);
      setIsLoadingUser(false); 
    });
    
    fetch(`https://healthy-dent-back-end.fly.dev/user/prepaid/${item[0].id}`)
    //fetch(`http://localhost:4000/user/prepaid/${item[0].id}`)
    .then((response) => response.json())
    .then((res) => {
      setPrepaid(res);
      setIsLoadingPrepaid(false); 
    });
  }, []);
  
  
  return (
    <Layout>
      {isLoadingUser || isLoadingPrepaid  ? (
          <Loading/>
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
              <li className="list-group-item"><b>Obra Social:</b> {prepaid.detail}</li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}
