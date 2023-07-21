import React from 'react'
import Layout from "../components/Layout";
import "../styles/estadisticas.css";

export const Estadisticas = () => {
  return (
    <Layout>
        <section>
        <div className='main-container'>
        <div className='graph-container'>
            <h1>Aqui deberia ir el grafico</h1>
        </div>
        <div className='stats-container'>
            <h1>Aqui va a ir tablas relacionado con las estadisticas</h1>
        </div>
        </div>
        </section>
    </Layout>
  )
}
