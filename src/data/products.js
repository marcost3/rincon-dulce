import panImg from '../assets/images/pan.jpg';
import pastaImg from '../assets/images/pasta.jpg';
import pasta2Img from '../assets/images/pasta2.jpg';
import masitas from '../assets/images/masita.jpg';

export const products = [
  {
    id: 1,
    category: "PANADERÍA",
    title: "Panadería",
    description:
      "Productos elaborados artesanalmente para acompañar todos los momentos del día.",
    image: panImg
  },

  {
    id: 2,
    category: "PASTAS",
    title: "Pastas frescas",
    description:
      "Producción diaria de pastas frescas artesanales para disfrutar en casa.",
    image: pastaImg
  },

  {
    id: 3,
    category: "PASTAS",
    title: "Pastas rellenas",
    description:
      "Variedad de pastas rellenas elaboradas artesanalmente.",
    image: pasta2Img
  },

  {
    id: 4,
    category: "CONFITERIA",
    title: "Masas secas",
    description:
      "Exquisita variedad artesanal, elaboradas con ingredientes seleccionados para endulzar tus momentos especiales.",
    image: masitas
  }
];