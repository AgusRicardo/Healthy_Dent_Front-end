import React from "react";
import "../styles/footer.css";
import LogoCurcuma from "../img/Curcuma_1.png";
import Logo from "../img/logoynombre.png";

export const Footer = () => {
  return (
    <section className="footer no-wrapper">
      <div className="container-fluid no-wrapper">
        <div className="container text-center footer_text">
          <div className="row">
            <div className="col">
            <img src={Logo}  width="170px"/>
            </div>
            <div className="col">
              <div>
                <h4><b>Sobre nosotros</b></h4>
                <p className="footer_text_row"><a className="a_footer" href="#">Home</a></p>
                <p className="footer_text_row"><a className="a_footer" href="https://github.com/AgusRicardo/Healthy_Dent_Front-end" target="_blank">Github repo Frontend</a></p>
                <p className="footer_text_row"><a className="a_footer" href="https://github.com/AgusRicardo/Healthy_Dent_Back-end" target="_blank">Github repo Backend</a></p>
              </div>
            </div>
            <div className="col">
              <h4><b>Partners</b></h4>
              <a href="https://curcuma.vercel.app" target="_blank">
                <img src={LogoCurcuma} alt="" width="150px" className="logoCurcuma" />
              </a>
            </div>
            <div className="col">
              <h4><b>Redes sociales</b></h4>
              <div className="row">
                <p>Para estar al tanto de cualquier novededad, seguínos en todas nuestras redes sociales</p>
                <div className="container_icons_footer">
                  <i class="fa-brands fa-twitter icon_footer"></i>
                  <i class="fa-brands fa-facebook icon_footer"></i>
                  <i class="fa-brands fa-instagram icon_footer"></i>
                  <i class="fa-brands fa-linkedin icon_footer"></i>
                  <i class="fa-brands fa-github icon_footer"></i>
                </div>
              </div>
                <div className="location_footer">
                  <div className="icon_location_footer">
                    <i class="fa-solid fa-globe"></i>
                  </div>
                  <div>
                    <p>Rosario, Santa Fe</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_hr">
        <hr />
      </div>
      <div className="row">
        <p>Copyrigth<i class="fa-regular fa-copyright"></i>by Healthy Dent. All rigth reserved.</p>
        <span>v.1.3.0</span>
      </div>
    </section>
  );
};
