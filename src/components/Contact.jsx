import {
  Mail,
  MessageCircle
} from "lucide-react";

function Contact() {
  return (
    <section
      id="contacto"
      className="contact-section"
    >
      <div className="container">

        <div className="contact-card">

          <div>
            <span className="eyebrow">
              ¿TENÉS UNA CONSULTA?
            </span>

            <h2>
              Estamos para
              <br />
              ayudarte.
            </h2>

            <p>
              Para consultas generales,
              podés comunicarte con
              Rincón Dulce a través de
              los canales oficiales.
            </p>
          </div>

          <div className="contact-actions">

            <a
              href="mailto:EMAIL-A-COMPLETAR"
              className="button button-light"
            >
              <Mail size={18} />

              Enviar email
            </a>

            <a
              href="#sucursales"
              className="button button-outline-light"
            >
              <MessageCircle size={18} />

              Contactar una sucursal
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;