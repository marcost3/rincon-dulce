import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence
} from "framer-motion";

const navItems = [
  {
    label: "Inicio",
    href: "#inicio"
  },
  {
    label: "Nosotros",
    href: "#nosotros"
  },
  {
    label: "Productos",
    href: "#productos"
  },
  {
    label: "Sucursales",
    href: "#sucursales"
  },
  {
    label: "Contacto",
    href: "#contacto"
  }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">

        <a
          href="#inicio"
          className="brand"
          onClick={closeMenu}
        >
          Rincón<span>Dulce</span>
        </a>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Abrir menú"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: "auto"
            }}
            exit={{
              opacity: 0,
              height: 0
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="mobile-nav-link"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;