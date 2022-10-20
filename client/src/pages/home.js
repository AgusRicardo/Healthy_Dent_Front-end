import React from "react";
import Layout from "../components/Layout";
import "../styles/home.css";
import img from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import logo from "../img/logo.png"
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <Layout>
      <section className="intro">
      <div class="row gx-5 align-items-center">
                    <div class="col-lg-6">
                        <div class="mb-5 mb-lg-0  firstcolumintro">
                            <h1 class=" titlemarca display-1 lh-1 mb-3">Healthy Dent</h1>
                            <p class="descripmarca lead fw-normal text-muted mb-5">Un lugar donde pacientes y odontologos tienen todo</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                      <img src={logo}></img>
                    </div>
                </div>
      </section>
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
                Somos una empresa con la misión de facilitar la búsqueda y
                confirmación de turnos entre pacientes y profesionales de la
                salud bucal.
              </p>
            </div>
          </div>
          <div className="card info2">
            <div className="card-body ">
              <h2 className="card-title title-acercade">¿Qué hacemos?</h2>
              <p className="card-text">
                Nos centramos en agilizar una búsqueda personalizada más simple
                y práctica que se adapte a los intereses y comodidades de los
                pacientes. Al mismo tiempo, asistimos a los profesionales con la
                organización de sus turnos a través de una interfaz intuitiva y
                más cómoda.
              </p>
            </div>
          </div>
          <div className="card info3">
            <div className="card-body ">
              <h2 className="card-title title-acercade">
                ¿Por qué nos necesitas?
              </h2>
              <p className="card-text">
                Muchas veces nos encontramos con el problema de no encontrar un
                profesional acorde a nuestras necesidades específicas
                (odontopediatría, prótesis, implantes, ortodoncista, etc) o a
                nuestra ubicación. HealthyDent simplifica todos estos problemas
                a partir de filtros de búsqueda que ayuden acordes a tus
                necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </Layout>
  );
};
