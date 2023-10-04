import React, { useEffect ,useState} from 'react'
import Layout from "../components/Layout";
import "../styles/estadisticas.css";
import { getAllPatient, getAllTurn } from '../api/auth';

export const Estadisticas = () => {
  const prof_id = localStorage.getItem("prof_id");
  const [allTurn, setAllTurn] = useState();
  const [allPatient,setAllPatient] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const turnData = await getAllTurn(prof_id);
        const patientData = await getAllPatient(prof_id);
        setAllPatient(patientData.data[0].count);
        setAllTurn(turnData.data[0].count);

       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

 
  return (
    <Layout>
        <section>
        <div className='main-container'>
          <div className='graph-container'>
            <h1>Aqui debería ir el gráfico</h1>
          </div>
          <div className='stats-container'>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <h3 className="titulo">Total turnos dados</h3>
                  <p className="numero-grande"> {allTurn}</p>
                </div>
                <div className="col-md-1">
                 
                  <div className="vertical-line">
                     {/* Línea vertical */}
                  </div>
                </div>
                <div className="col-md-5">
                  <h3 className="titulo">Total pacientes atendidos</h3>
                  <p className="numero-grande">{allPatient}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
    </Layout>
  )
}
