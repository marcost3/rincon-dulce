import { motion } from "framer-motion";

function About() {
  return (
    <section
      id="nosotros"
      className="section about-section"
    >
      <div className="container">

        <div className="section-grid">

          <motion.div
            className="about-heading"
            initial={{
              opacity: 0,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.3
            }}
          >
            <span className="eyebrow">
              NUESTRA HISTORIA
            </span>

            <h2>
              Una historia que
              <br />
              sigue creciendo.
            </h2>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{
              opacity: 0,
              x: 30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              amount: 0.3
            }}
          >
            <p className="lead">
              Rincón Dulce es una marca marplatense
              fundada en 2003, reconocida por su
              calidad artesanal y su presencia local.
            </p>

            <p>
              Durante años, la panadería fue parte
              fundamental de nuestra identidad.
              En 2025 incorporamos una nueva
              propuesta: pastas frescas artesanales,
              elaboradas diariamente y ofrecidas
              directamente al público.
            </p>

            <p>
              La propuesta incluye pastas frescas,
              pastas rellenas y distintos complementos
              para acompañar cada comida.
            </p>

            <div className="about-highlight">
              <strong>2003</strong>

              <span>
                El comienzo de una historia
                marplatense.
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;