import React from "react";
import Layout from "../components/Layout";
import "../styles/home.css";
import img from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <Layout>
      <section className="carousel container-fluid no-wrapper">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">

            <div className="carousel-item active ">
              <img src={img} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="..." />

            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="acercaDe ">
        <div className="card-group acercaDe_home">
          <div className="card info1">
            <div className="card-body ">
              <h2 className="card-title title-acercade">¿Quienes somos?</h2>
              <p className="card-text">
                {/* Somos una empresa con la misión de facilitar la búsqueda y
                confirmación de turnos entre pacientes y profesionales de la
                salud bucal. */}
                Somos un grupo de personas que nos cansamos de encontrarnos con muchos enrollos para poder conseguir y concretar un turno con profesionales de una manera cómoda y práctica. El tipo de impracticidad con la que probablemente se ha encontrado también usted en más de una ocasión.
              </p>
            </div>
          </div>
          <div className="card info2">
            <div className="card-body ">
              <h2 className="card-title title-acercade">¿Qué hacemos?</h2>
              <p className="card-text">
                {/* Nos centramos en agilizar una búsqueda personalizada más simple
                y práctica que se adapte a los intereses y comodidades de los
                pacientes. Al mismo tiempo, asistimos a los profesionales con la
                organización de sus turnos a través de una interfaz intuitiva y
                más cómoda. */}
                Lo que hacemos es impulsar el objetivo de desarrollar la mejor plataforma de gestión que facilite y simplifique enormemente el incordio y el sorteo de las dificultades que pueden presentarse para contactar con los diferentes profesionales de Odontología y pactar turnos que se acomoden o acoplen a los horarios personales de cada usuario.
                A su ves, también queremos facilitar y ayudar a difundir la actividad de los diferentes profesionales para que su radio de alcance aumente, mientras le ofrecemos un grupo de herramientas de gestión que facilitan y complementen su actividad.
              </p>
            </div>
          </div>
          <div className="card info3">
            <div className="card-body ">
              <h2 className="card-title title-acercade">
                ¿Por qué nos necesitas?
              </h2>
              <p className="card-text">
                {/* Muchas veces nos encontramos con el problema de no encontrar un
                profesional acorde a nuestras necesidades específicas
                (odontopediatría, prótesis, implantes, ortodoncista, etc) o a
                nuestra ubicación. HealthyDent simplifica todos estos problemas
                a partir de filtros de búsqueda que ayuden acordes a tus
                necesidades. */}
                Porque con nuestra plataforma y su práctica interfaz de búsqueda que se puede personalizar según tus necesidades, preferencias y ubicación, podrás conseguir conectar con el profesional que mejor se adecue a ti. Además de que podrás realizar consultas directas con los diferentes especialistas con los que te atiendas y consultar costos aproximados de los tratamientos que desees o deba realizarse, ya sea por mensajería directa o con nuestra calculadora de costo estimados que esta a su disposición en nuestra plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </Layout>
  );
};
