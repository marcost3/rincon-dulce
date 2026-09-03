import { Instagram } from "lucide-react";

function InstagramButton() {
  return (
    <a
      href="https://www.instagram.com/rincondulcemdp/"
      target="_blank"
      rel="noreferrer"
      className="floating-instagram"
      aria-label="Visitar Instagram de Rincón Dulce"
    >
      <Instagram size={22} />
      <span>Instagram</span>
    </a>
  );
}

export default InstagramButton;