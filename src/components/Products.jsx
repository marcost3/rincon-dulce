import { motion } from "framer-motion";
import { products } from "../data/products";

function Products() {
  return (
    <section
      id="productos"
      className="section products-section"
    >
      <div className="container">

        <div className="section-header">
          <span className="eyebrow">
            NUESTRA PROPUESTA
          </span>

          <h2>
            Mucho más que
            <br />
            panadería.
          </h2>

          <p>
            Una propuesta que combina nuestra
            tradición con nuevas formas de
            disfrutar productos elaborados
            artesanalmente.
          </p>
        </div>

        <div className="products-grid">
          {products.map(
            (product, index) => (
              <motion.article
                className="product-card"
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 30
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  amount: 0.2
                }}
                transition={{
                  delay: index * 0.08
                }}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />
                </div>

                <div className="product-info">
                  <span>
                    {product.category}
                  </span>

                  <h3>
                    {product.title}
                  </h3>

                  <p>
                    {product.description}
                  </p>
                </div>
              </motion.article>
            )
          )}
        </div>

      </div>
    </section>
  );
}

export default Products;