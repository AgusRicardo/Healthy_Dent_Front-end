import React from "react";
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const Footer = () => {
  return (
    <section className="footer no-wrapper">
      <div className="container-fluid no-wrapper">
        <span>Terminos y condiciones</span><span>Politica de privacidad</span>
        <p>Version 1.0.0</p>
      </div>
      <div>
      <FontAwesomeIcon icon="fa-brands fa-instagram" />
      </div>
    </section>
  );
};
