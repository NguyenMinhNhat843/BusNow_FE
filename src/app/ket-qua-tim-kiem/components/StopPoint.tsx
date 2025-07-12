import { setFrom, setTo, setTripInfo } from "@/redux/slice/bookingSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface StopPointInterface {
  name: string;
  address: string;
  city: {
    name: string;
    id: string;
  };
}

const DetailInfo = ({
  stopPoints,
  fromId,
  toId,
  fromName,
  toName,
  departTime,
  arriveTime,
  tripId,
}: {
  stopPoints: any[];
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
  departTime: string;
  arriveTime: string;
  tripId: string;
}) => {
  // common
  const dispatch = useDispatch();
  // state
  const [spSelected, setSpSelected] = useState<{
    pickup: StopPointInterface | null;
    dropoff: StopPointInterface | null;
  }>({
    pickup: null,
    dropoff: null,
  });

  const bookingInfo = useSelector((state: RootState) => state.booking);

  // Khi stopPoints thay đổi, set mặc định
  useEffect(() => {
    if (stopPoints.length > 0) {
      const pickupDefault = stopPoints.find((sp) => sp.city.id === fromId);
      const dropoffDefault = stopPoints.find((sp) => sp.city.id === toId);

      setSpSelected({
        pickup: pickupDefault || null,
        dropoff: dropoffDefault || null,
      });

      if (pickupDefault) {
        dispatch(
          setFrom({
            name: fromName,
            stopPoint: pickupDefault.name,
            time: departTime,
          })
        );
      }

      if (dropoffDefault) {
        dispatch(
          setTo({
            name: toName,
            stopPoint: dropoffDefault.name,
            time: arriveTime,
          })
        );
      }
    }
  }, [stopPoints, fromId, toId]);

  const handleSelectSP = (type: "pickup" | "dropoff", sp: any) => {
    setSpSelected((prev) => ({ ...prev, [type]: sp }));
  };

  return (
    <div className="flex justify-between gap-8 border p-4 rounded-lg shadow-sm bg-white">
      {/* Cột điểm đón */}
      <div className="w-1/2">
        <h3 className="font-semibold text-blue-600 pb-2 border-b">Điểm đón</h3>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {stopPoints.length > 0 &&
            stopPoints
              .filter((sp) => sp.city.id === fromId)
              .map((sp) => (
                <li key={sp.id} className="flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 text-blue-600"
                    name="pickup"
                    checked={spSelected.pickup?.name === sp.name}
                    onChange={() => handleSelectSP("pickup", sp)}
                  />
                  <label
                    htmlFor={`pickup-${sp.id}`}
                    className="ml-2 cursor-pointer"
                    title={sp.address}
                  >
                    {sp.name}
                  </label>
                </li>
              ))}
        </ul>
      </div>

      {/* Cột điểm trả */}
      <div className="w-1/2">
        <h3 className="font-semibold text-green-600 pb-2 border-b">Điểm trả</h3>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {stopPoints.length > 0 &&
            stopPoints
              .filter((sp) => sp.city.id === toId)
              .map((sp) => (
                <li key={sp.id} className="flex items-center">
                  <input
                    id={`dropoff-${sp.id}`}
                    type="radio"
                    className="w-5 h-5 text-blue-600"
                    name="dropoff"
                    checked={spSelected.dropoff?.name === sp.name}
                    onChange={() => handleSelectSP("dropoff", sp)}
                  />
                  <label
                    htmlFor={`dropoff-${sp.id}`}
                    className="ml-2 cursor-pointer"
                    title={sp.address}
                  >
                    {sp.name}
                  </label>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailInfo;
