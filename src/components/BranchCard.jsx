import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  ChevronDown,
  ExternalLink
} from "lucide-react";

/* =========================================
   FUNCIONES PARA HORARIOS
========================================= */

/*
  Elimina tildes y normaliza el texto.

  Ejemplo:
  "Sáb" → "sab"
  "Mié" → "mie"
*/
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .trim();
}

/* =========================================
   DÍA ACTUAL
========================================= */

function getCurrentDay() {
  const formatter = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "short"
  });

  return normalizeText(
    formatter.format(new Date())
  );
}

/* =========================================
   HORA ACTUAL
========================================= */

function getCurrentMinutes() {
  const formatter = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(
    new Date()
  );

  const hour = Number(
    parts.find(
      (part) => part.type === "hour"
    )?.value
  );

  const minute = Number(
    parts.find(
      (part) => part.type === "minute"
    )?.value
  );

  return hour * 60 + minute;
}

/* =========================================
   DÍAS DE UN RANGO
========================================= */

function getDaysFromText(dayText) {
  const days = [
    "lun",
    "mar",
    "mie",
    "jue",
    "vie",
    "sab",
    "dom"
  ];

  const normalized = normalizeText(
    dayText
  );

  /*
    Ejemplo:

    "Lun a Sab"

    devuelve:

    ["lun", "mar", "mie", "jue", "vie", "sab"]
  */

  if (normalized.includes(" a ")) {
    const [from, to] = normalized
      .split(" a ")
      .map((day) => day.trim());

    const fromIndex = days.indexOf(from);
    const toIndex = days.indexOf(to);

    if (
      fromIndex === -1 ||
      toIndex === -1
    ) {
      return [];
    }

    if (fromIndex <= toIndex) {
      return days.slice(
        fromIndex,
        toIndex + 1
      );
    }

    return [
      ...days.slice(fromIndex),
      ...days.slice(0, toIndex + 1)
    ];
  }

  /*
    Ejemplo:

    "Sab y Dom"

    devuelve:

    ["sab", "dom"]
  */

  if (normalized.includes(" y ")) {
    return normalized
      .split(" y ")
      .map((day) => day.trim())
      .filter((day) =>
        days.includes(day)
      );
  }

  /*
    Ejemplo:

    "Dom"
  */

  return days.includes(normalized)
    ? [normalized]
    : [];
}

/* =========================================
   ESTADO DE LA SUCURSAL
========================================= */

function getBranchStatus(schedule) {
  if (!schedule) {
    return {
      isOpen: null,
      text: "Horario no disponible"
    };
  }

  const currentDay = getCurrentDay();
  const currentMinutes =
    getCurrentMinutes();

  /*
    Ejemplo:

    Lun a Sab 07:00 a 21:00 - Dom 07:00 a 20:30
  */

  const scheduleParts = schedule
    .split(" - ")
    .map((part) => part.trim());

  for (const part of scheduleParts) {

    /*
      Buscamos:

      07:00 a 21:00
    */

    const timeMatch = part.match(
      /(\d{1,2}:\d{2})\s*a\s*(\d{1,2}:\d{2})/
    );

    if (!timeMatch) {
      continue;
    }

    const openingTime = timeMatch[1];
    const closingTime = timeMatch[2];

    /*
      Eliminamos el horario y nos
      quedamos con los días.

      "Lun a Sab"
    */

    const dayText = part
      .replace(timeMatch[0], "")
      .trim();

    const availableDays =
      getDaysFromText(dayText);

    /*
      Si hoy no corresponde a este
      período, seguimos buscando.
    */

    if (
      !availableDays.includes(
        currentDay
      )
    ) {
      continue;
    }

    const [openHour, openMinute] =
      openingTime
        .split(":")
        .map(Number);

    const [closeHour, closeMinute] =
      closingTime
        .split(":")
        .map(Number);

    const openingMinutes =
      openHour * 60 + openMinute;

    const closingMinutes =
      closeHour * 60 + closeMinute;

    const isOpen =
      currentMinutes >=
        openingMinutes &&
      currentMinutes <
        closingMinutes;

    return {
      isOpen,
      text: isOpen
        ? "Abierta"
        : "Cerrada"
    };
  }

  return {
    isOpen: false,
    text: "Cerrada"
  };
}

/* =========================================
   COMPONENTE
========================================= */

function BranchCard({
  branch,
  distance
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [status, setStatus] =
    useState(() =>
      getBranchStatus(
        branch.schedule
      )
    );

  const phoneNumber =
    branch.phone.replace(
      /\D/g,
      ""
    );

  /*
    Actualizamos el estado cada minuto
    para que cambie automáticamente
    cuando abre o cierra.
  */

  useEffect(() => {
    const updateStatus = () => {
      setStatus(
        getBranchStatus(
          branch.schedule
        )
      );
    };

    const interval = setInterval(
      updateStatus,
      60000
    );

    return () =>
      clearInterval(interval);
  }, [branch.schedule]);

  return (
    <motion.article
      className="branch-card"
      layout
    >

      {/* =====================================
          INFORMACIÓN PRINCIPAL
      ====================================== */}

      <div className="branch-main">

        <div className="branch-number">
          {String(branch.id).padStart(
            2,
            "0"
          )}
        </div>

        <div className="branch-info">

          {/* HORARIO + ESTADO */}

          <div className="branch-schedule-row">

            <span className="branch-label">
              {branch.schedule ||
                "Horario no disponible"}
            </span>

            {status.isOpen !== null && (
              <span
                className={`branch-status ${
                  status.isOpen
                    ? "open"
                    : "closed"
                }`}
              >
                <span className="status-dot" />

                {status.text}
              </span>
            )}

          </div>

          <h3>
            {branch.name}
          </h3>

          <p>
            <MapPin size={16} />

            {branch.address}
          </p>

        </div>

        {/* =====================================
            DISTANCIA + BOTÓN
        ====================================== */}

        <div className="branch-right">

          {distance && (
            <div className="branch-distance">

              <MapPin size={15} />

              <strong>
                {distance}
              </strong>

            </div>
          )}

          <button
            className={`branch-toggle ${
              menuOpen
                ? "active"
                : ""
            }`}
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            aria-label={
              menuOpen
                ? "Ocultar productos"
                : "Ver productos"
            }
            aria-expanded={
              menuOpen
            }
          >
            <ChevronDown size={22} />
          </button>

        </div>

      </div>

      {/* =====================================
          ACCIONES
      ====================================== */}

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
            if (
              branch.mapsUrl === "#"
            ) {
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

      </div>

      {/* =====================================
          PRODUCTOS
      ====================================== */}

      <AnimatePresence
        initial={false}
      >

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
              branch.products.length >
                0 ? (
                <ul>
                  {branch.products.map(
                    (
                      product,
                      index
                    ) => (
                      <li
                        key={index}
                      >
                        {product}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>
                  Información de
                  productos a
                  completar.
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