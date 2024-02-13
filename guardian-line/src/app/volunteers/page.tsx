"use client";
import { useState, useEffect } from "react";

const GeolocationButton: React.FC = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const handleGetLocation = async () => {
    try {
      const position = await navigator.geolocation.getCurrentPosition(
        // Provide the success callback function
        (position) => {
          setLocation(position.coords);
        },
        // Optional error callback (handle errors gracefully)
        (error) => {
          setError(error.message);
          console.error(`Geolocation error: ${error.message}`);
        }
      );
    } catch (error: any) {
      // Access error properties safely:
      setError(error.message);
      console.error(`Geolocation error: ${error.message}`);
    }
  };

  const handleGetAddress = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=YOUR_API_KEY`
      );
      const data = await response.json();

      if (data.status === "OK") {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress(null);
        console.error(`Geocoding error: ${data.error_message}`);
      }
    } catch (error: any) {
      setAddress(null);
      console.error(`Geocoding error: ${error.message}`);
    }
  };

  useEffect(() => {
    // Empty dependency array to run effect only once on mount
  }, []);

  return (
    <div>
      <button onClick={handleGetLocation}>
        {error ? "Geolocation Error" : "Get Location"}
      </button>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy} meters</p>
        </div>
      )}

      <button onClick={handleGetAddress}>
        Get Address
      </button>
      {address && <p>Address: {address}</p>}
    </div>
  );
};

export default GeolocationButton;
