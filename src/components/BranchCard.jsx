import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  ChevronDown,
  ExternalLink
} from "lucide-react";

function BranchCard({ branch, distance }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappNumber = branch.whatsapp.replace(/\D/g, "");
  const phoneNumber = branch.phone.replace(/\D/g, "");

  return (
    <motion.article className="branch-card" layout>
      <div className="branch-main">

        <div className="branch-number">
          {String(branch.id).padStart(2, "0")}
        </div>

        <div className="branch-info">
            <span className="branch-label">
                {branch.schedule || "Horario no disponible"}
            </span>

            <h3>{branch.name}</h3>

            <p>
                <MapPin size={16} />
                {branch.address}
            </p>
        </div>

        <div className="branch-right">
          {distance && (
            <div className="branch-distance">
              <MapPin size={15} />

              <strong>{distance}</strong>
            </div>
          )}

          <button
            className={`branch-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Ocultar productos"
                : "Ver productos"
            }
            aria-expanded={menuOpen}
          >
            <ChevronDown size={22} />
          </button>
        </div>
      </div>

      <div className="branch-actions">

        <a
          href={branch.mapsUrl}
          target={
            branch.mapsUrl === "#"
              ? undefined
              : "_blank"
          }
          rel="noreferrer"
          className="branch-action"
          onClick={(event) => {
            if (branch.mapsUrl === "#") {
              event.preventDefault();
            }
          }}
        >
          <MapPin size={18} />

          Ubicación

          <ExternalLink size={14} />
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className="branch-action"
        >
          <Phone size={18} />

          Llamar
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="branch-action"
        >
          <MessageCircle size={18} />

          WhatsApp
        </a>

      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            className="branch-menu"
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: "auto",
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="branch-menu-inner">

              <span className="branch-menu-title">
                DISPONIBLE EN ESTA SUCURSAL
              </span>

              {branch.products &&
              branch.products.length > 0 ? (
                <ul>
                  {branch.products.map(
                    (product, index) => (
                      <li key={index}>
                        {product}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>
                  Información de productos
                  a completar.
                </p>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default BranchCard;