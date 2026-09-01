function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-content">

        <div>
          <a
            href="#inicio"
            className="footer-brand"
          >
            Rincón Dulce
          </a>

          <p>
            Panadería marplatense desde 2003.
          </p>
        </div>

        <div className="footer-links">
          <a href="#nosotros">
            Nosotros
          </a>

          <a href="#productos">
            Productos
          </a>

          <a href="#sucursales">
            Sucursales
          </a>

          <a href="#contacto">
            Contacto
          </a>
        </div>

      </div>

      <div className="container footer-bottom">

        <span>
          © {new Date().getFullYear()}
          {" "}
          Rincón Dulce
        </span>

        <span>
          Sitio web
        </span>

      </div>

    </footer>
  );
}

export default Footer;