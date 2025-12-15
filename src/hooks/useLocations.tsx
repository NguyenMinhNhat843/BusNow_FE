import { locationApi } from "@/api/locationApi";
import { LocationType } from "@/type/location";
import { useEffect, useState } from "react";

export const useLocations = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationApi.getAllLocation();
        setLocations(response);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    };

    fetchLocations();
  }, []);

  return { locations, setLocations };
};
