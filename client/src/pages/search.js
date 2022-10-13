import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout'



export const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState()
  
  useEffect(() => {
    //fetch("http://localhost:4000/search")
    fetch('https://healthy-dent-back-end.fly.dev/search')
      .then((response) => response.json())
      .then((res) => {
        setState(res); 
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
  const handleSendProps = (id) =>{
    console.log(id);
  }
  return (
      <Layout className="container">
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <div className="input-group-lg" style={{margin: '10px', padding: '10px'}}>
            <input type="search" className="form-control" placeholder="Especialidad" aria-label="Recipient's username" aria-describedby="button-addon2"/>
          </div>
          <div className="input-group-lg" style={{margin: '10px', padding: '10px'}}>
            <input type="search" className="form-control" placeholder="Nombre del profesional" aria-label="Recipient's username" aria-describedby="button-addon2"/>
          </div>
          <div className="input-group-lg" style={{margin: '10px', padding: '10px'}}>
            <input type="search" className="form-control" placeholder="Obra social" aria-label="Recipient's username" aria-describedby="button-addon2"/>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <button className="btn btn-primary" type="button" style={{padding: '12px 40px'}}>Buscar</button>
          </div>
        </div>
        <section style={{display: "flex", flexDirection: 'row'}}>
          <ul className="nav flex-column">
            <h5>Filtrar</h5>
            <li className="nav-item">
              <p className="nav-link" aria-current="page">Filtro 1</p>
            </li>
            <li className="nav-item">
              <p className="nav-link">Filtro 2</p>
            </li>
            <li className="nav-item">
              <p className="nav-link">Filtro 3</p>
            </li>
          </ul>
          <div style={{display: "flex", flexDirection: 'column'}}>
            {
              state.map(prof => (
                <div key={prof.prof_id} style={{padding: "0px 50px 0px 50px", marginTop: "30px"}}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-3">
                      <img src="https://m9p8e5u6.rocketcdn.me/wp-content/uploads/2019/04/shutterstock_Nestor-Rizhniak.jpg" className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{prof.name} {prof.last_name}</h5>
                        <p className="card-title">Mat. {prof.n_matric}</p>
                        <p className="card-title">{prof.specialization}</p>
                        <p className="card-text">HORARIOS</p>
                        <NavLink to='/turn' style={{textDecoration: 'none'}}>
                            <button className='btn btn-primary' onClick={() => handleSendProps(prof.prof_id)}>
                              Solicitar Turno
                              </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          } 
          </div>
          </section>
      </Layout>
  )
}

