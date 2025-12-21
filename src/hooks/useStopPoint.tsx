import { stopPointApi } from "@/api/stopPointApi";
import { StopPointType } from "@/type/stopPointType";
import { useEffect, useState } from "react";

interface useStopPointParams {
  locationId?: string;
}

export const useStopPoint = ({ locationId }: useStopPointParams) => {
  const [stopPoints, setStopPoints] = useState<StopPointType[]>([]);
  useEffect(() => {
    const loadStopPoints = async () => {
      if (locationId && locationId !== "") {
        try {
          const response = await stopPointApi.getStopPintBycityId(locationId);
          setStopPoints(response.data);
        } catch (error) {
          alert("Có lỗi: " + JSON.stringify(error));
        }
      } else {
        setStopPoints([]);
      }
    };

    loadStopPoints();
  }, [locationId]);

  return {
    stopPoints,
    setStopPoints,
  };
};
