import { useMemo } from "react";

import {
  Navigation,
  Search
} from "lucide-react";

import { motion } from "framer-motion";

import { branches } from "../data/branches";

import BranchCard from "./BranchCard";

import { useGeolocation } from "../hooks/useGeolocation";

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const earthRadius = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadius * c;
}

function Branches() {
  const {
    location,
    loading,
    error,
    getLocation
  } = useGeolocation();

  const sortedBranches = useMemo(() => {
    if (!location) {
      return branches;
    }

    return [...branches].sort(
      (a, b) => {

        if (
          !a.coordinates.lat ||
          !a.coordinates.lng
        ) {
          return 0;
        }

        if (
          !b.coordinates.lat ||
          !b.coordinates.lng
        ) {
          return 0;
        }

        const distanceA =
          calculateDistance(
            location.latitude,
            location.longitude,
            a.coordinates.lat,
            a.coordinates.lng
          );

        const distanceB =
          calculateDistance(
            location.latitude,
            location.longitude,
            b.coordinates.lat,
            b.coordinates.lng
          );

        return distanceA - distanceB;
      }
    );
  }, [location]);

  return (
    <section
      id="sucursales"
      className="section branches-section"
    >
      <div className="container">

        <div className="branches-header">

          <div>
            <span className="eyebrow">
              ENCONTRÁ TU SUCURSAL
            </span>

            <h2>
              Estamos cerca
              <br />
              tuyo.
            </h2>
          </div>

          <button
            className="location-button"
            onClick={getLocation}
            disabled={loading}
          >
            {loading ? (
              "Buscando..."
            ) : (
              <>
                <Navigation size={18} />

                Encontrar la más cercana
              </>
            )}
          </button>

        </div>

        {location && (
          <motion.div
            className="location-message"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <Navigation size={16} />

            Sucursales ordenadas según
            tu ubicación.
          </motion.div>
        )}

        {error && (
          <div className="location-error">
            <Search size={16} />

            {error}
          </div>
        )}

        <div className="branches-list">

          {sortedBranches.map(
            (branch, index) => (
              <motion.div
                key={branch.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  amount: 0.15
                }}
                transition={{
                  delay: index * 0.08
                }}
              >
                <BranchCard
                  branch={branch}
                />
              </motion.div>
            )
          )}

        </div>

      </div>
    </section>
  );
}

export default Branches;