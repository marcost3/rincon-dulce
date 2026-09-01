import {
  MessageCircle
} from "lucide-react";

function WhatsAppButton() {
  const whatsappNumber =
    "1111111111";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={22} />

      <span>
        WhatsApp
      </span>
    </a>
  );
}

export default WhatsAppButton;