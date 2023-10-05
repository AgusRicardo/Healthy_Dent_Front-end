import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout'
import { addTurn } from '../redux/slices/turnSlice';
import { Loading } from '../components/Loading';
import '../styles/search.css'
import dentist from  "../img/dentist.png"
import { getSpecialization, url } from '../api/auth';


export const Search = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState()
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [searchName, setSearchName] = useState("")
  const [searchSpec, setSearchSpec] = useState("")
  const [especialidad, setEspecialidad] = useState([]);  

  useEffect(() => {
    fetch(`${url}/search`)
      .then((response) => response.json())
      .then((res) => {
        setState(res); 
        setTablaUsuarios(res); 
        setIsLoading(false); 
        res.forEach((element) => {
          setEspecialidad((prevEspecialidad) => [
            ...prevEspecialidad,
            {
              "spe_id": element.spe_id,
              "description": element.description
            }
          ]);
        });
      });
    }, []);
    let espeNoDuplicidad = especialidad;

    function eliminarDuplicadosPorPropiedad(array, propiedad) {
      const uniqueMap = new Map();
      const uniqueArray = [];
      array.forEach((element) => {
        if (!uniqueMap.has(element[propiedad])) {
          uniqueMap.set(element[propiedad], true);
          uniqueArray.push(element);
        }
      });
      return uniqueArray;
    }
    const resSinDuplicados = eliminarDuplicadosPorPropiedad(espeNoDuplicidad, 'spe_id');

  const onChangeName = (e) => {
    setSearchName(e.target.value)
    filtrarName(e.target.value)
  }

  const onChangeSpec = async (e) => {
    if (e.target.value === 'DEFAULT') {
      setSearchSpec("")
      filtrarSpec("")
    }else {
      setSearchSpec(e.target.value)
      filtrarSpec(e.target.value)
    }
  }
  
  const filtrarName=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento) =>{
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    });
    setState(resultadosBusqueda);
  }

  const filtrarSpec = (terminoBusqueda) => {
    if (terminoBusqueda !== "") {
      const resultSpec = tablaUsuarios.filter((elemento) => {
        return elemento.spe_id == terminoBusqueda
      }
      );
      setState(resultSpec);
    }else {
      setState(tablaUsuarios);
    }
  };
  
  if (isLoading) { 
    return (
      <Layout>
        <Loading/>
      </Layout>
    );
  }
  const handleSendProps = (id) =>{
    dispatch(addTurn(id))
  }
  return (
      <Layout className="container" style={{backgroundColor: '#fafafa'}}>
          <div style={{display: 'flex',marginLeft: '48vh' ,flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fafafa'}} className="container">
            <div className="input-group input-group-md" style={{margin: '10px', padding: '10px'}}>
              <input type="search" className="form-control" placeholder="Nombre del profesional" aria-label="Recipient's username" value={searchName} onChange={(e) => onChangeName(e)}aria-describedby="button-addon2"/>
              <span className="input-group-text" id="basic-addon2"><i className="fa-solid fa-magnifying-glass "></i></span>
            </div>
            <div className="input-group input-group-md" style={{margin: '10px', padding: '10px'}}>
              <select defaultValue={"DEFAULT"} className="form-select" aria-label="Especialidad" onChange={(e) => onChangeSpec(e)}>
                <option defaultValue value="DEFAULT">Selecciona una especialidad</option>
                {
                  resSinDuplicados != [] ?
                  resSinDuplicados.map((opt, index) => (
                    <option key={index} value={opt.spe_id}>{opt.description}</option>
                  ))
                  :
                  <p>Cargando...</p>
                } 
              </select>
            </div>
          </div>
        <section style={{display: "flex", flexDirection: 'row',  backgroundColor: '#fafafa'}} className="container">
          <div style={{display: "flex", flexDirection: 'column', width: '100%', marginLeft: '28vh'}}>
            {
              state.map(prof => (
                <div key={prof.prof_id} style={{padding: "0px 50px 0px 50px", marginTop: "15px"}}>
                <div className="card mb-3 bg-light card_container">
                  <div className="row g-0">
                    <div className="col-md-3" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <img src={dentist} className="img-fluid rounded-start imgdentist" alt="..." style={{borderRadius:"50%"}}/>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body" style={{display: "flex", justifyContent: "space-between" ,flexFlow: "row wrap", textAlign:"start"}}>
                        <div className='column_card'>
                          <h4 className="card-title">Dr. {prof.name}</h4>
                          <p className="card-title">Mat. {prof.n_matric}</p>
                          <div>
                            <h5 className='h5_specialization'>Especialidad </h5>
                            <span className="card-title card_specialization">{prof.description}</span>
                          </div>
                          <div className='items_card'>
                            <i className="fa-solid fa-phone color_items items_pointer"></i>
                            <i className="fa-regular fa-heart color_items items_pointer"></i>
                            <i className="fa-brands fa-linkedin color_items items_pointer"></i>
                          </div>
                        </div>
                        <div className='column_card'>
                          <p className="card-text"><i className="fa-regular fa-clock color_items"></i>Horarios</p>
                        </div>

                      </div>
                        <div className='btn_turn'>
                          <NavLink to='/turn'>
                              <button className='btn btn-primary turnbutton' onClick={() => handleSendProps(prof.prof_id)}>
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

