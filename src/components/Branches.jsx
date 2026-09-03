import { useMemo } from "react";

import {
  Navigation,
  Search,
  MapPin
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

function formatDistance(distance) {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance
    .toFixed(1)
    .replace(".", ",")} km`;
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
      return branches.map((branch) => ({
        ...branch,
        distance: null
      }));
    }

    return branches
      .map((branch) => {
        if (
          !branch.coordinates?.lat ||
          !branch.coordinates?.lng
        ) {
          return {
            ...branch,
            distance: null
          };
        }

        const distance =
          calculateDistance(
            location.latitude,
            location.longitude,
            branch.coordinates.lat,
            branch.coordinates.lng
          );

        return {
          ...branch,
          distance
        };
      })
      .sort((a, b) => {
        // Las sucursales que no tienen
        // coordenadas quedan al final.
        if (
          a.distance === null &&
          b.distance === null
        ) {
          return 0;
        }

        if (a.distance === null) {
          return 1;
        }

        if (b.distance === null) {
          return -1;
        }

        return a.distance - b.distance;
      });
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
              de vos.
            </h2>
          </div>

          <button
            className="location-button"
            onClick={getLocation}
            disabled={loading}
          >
            {loading ? (
              <>
                <Navigation size={18} />

                Buscando ubicación...
              </>
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

            Sucursales ordenadas de la más
            cercana a la más lejana.
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
                  distance={
                    branch.distance !== null
                      ? formatDistance(
                          branch.distance
                        )
                      : null
                  }
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