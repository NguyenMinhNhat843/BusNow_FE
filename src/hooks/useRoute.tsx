import { routeApi } from "@/api/routeApi";
import { useEffect, useState } from "react";

export const useRoute = () => {
  const [routes, setRoutes] = useState<any>([]);
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await routeApi.getRoutes(1, 10);
        setRoutes(response.data);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    };
    fetchRoutes();
  }, []);

  return { routes, setRoutes };
};
