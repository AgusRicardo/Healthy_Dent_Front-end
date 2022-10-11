import React from "react";
import { Footer } from "../components/Footer";
import Layout from "../components/Layout";
import '../styles/home.css'

export const Home = () => {
  return (
    <Layout>
      <section className="carousel">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/QPGXNPZS5VF7BONGXXBD5ZNELY.JPG"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2022/06/10/16548689505890.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.minutouno.com/p/a7eccb52057765763b52768a438f1c33/adjuntos/150/imagenes/040/209/0040209965/rosario-central-defensa-y-justicia.jpg"
                className="d-block w-100"
                alt="..."
              />
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
      <section className="acercaDe">
        <div className="card-group container acercaDe_home">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">¿Quienes somos?</h2>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">¿Qué hacemos?</h2>
              <p className="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">¿Por qué nos necesitas?</h2>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="footer">
        <Footer/>
      </section>
    </Layout>
  );
};
