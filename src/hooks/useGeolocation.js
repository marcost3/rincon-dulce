import { useState } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Tu navegador no permite utilizar la ubicación."
      );

      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        setLoading(false);
      },
      () => {
        setError(
          "No pudimos acceder a tu ubicación. Podés buscar la sucursal manualmente."
        );

        setLoading(false);
      }
    );
  };

  return {
    location,
    loading,
    error,
    getLocation
  };
}