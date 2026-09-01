import { motion } from "framer-motion";
import {
  ArrowDown,
  MapPin
} from "lucide-react";

function Hero() {
  return (
    <section
      id="inicio"
      className="hero"
    >
      <div className="hero-overlay" />

      <div className="container hero-content">
        <motion.div
          initial={{
            opacity: 0,
            y: 35
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
        >
          <span className="eyebrow">
            MAR DEL PLATA · DESDE 2003
          </span>

          <h1>
            La panaderia de
            <br />
            <em>mar del plata
            </em>
          </h1>

          <p>
            Panadería artesanal marplatense y una
            nueva propuesta de pastas frescas
            elaboradas diariamente.
          </p>

          <div className="hero-actions">
            <a
              href="#sucursales"
              className="button button-primary"
            >
              <MapPin size={18} />
              Encontrá tu sucursal
            </a>

            <a
              href="#nosotros"
              className="button button-secondary"
            >
              Conocenos
            </a>
          </div>
        </motion.div>
      </div>

      <a
        href="#nosotros"
        className="scroll-indicator"
        aria-label="Conocer más"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}

export default Hero;