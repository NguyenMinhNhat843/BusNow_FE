export default function RouteItem({ route }: { route: any }) {
  return (
    <div className="p-4 rounded-2xl bg-white shadow-md mb-6 border border-gray-200">
      {/* Header tuyến */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          {route.origin.name} → {route.destination.name}
        </h2>
        <p className="text-sm text-gray-600">
          ⏱️ Thời gian: {route.duration} giờ
        </p>
        <p className="text-sm text-gray-600">
          💤 Nghỉ tại điểm đến: {route.restAtDestination} giờ
        </p>
      </div>

      {/* Stop points */}
      <div className="grid grid-cols-2 gap-4 bg-slate-100 rounded-lg p-4">
        {/* Điểm đón */}
        <div>
          <p className="text-base font-medium text-blue-700 mb-2">
            🚏 Điểm đón
          </p>
          <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
            {route.stopPoints
              .filter(
                (sp: any) => sp.city.locationId === route.origin.locationId
              )
              .map((sp: any, index: number) => (
                <li key={index} title={sp.address}>
                  {sp.name}
                </li>
              ))}
          </ul>
        </div>

        {/* Điểm trả */}
        <div>
          <p className="text-base font-medium text-green-700 mb-2">
            📍 Điểm trả
          </p>
          <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
            {route.stopPoints
              .filter(
                (sp: any) => sp.city.locationId === route.destination.locationId
              )
              .map((sp: any, index: number) => (
                <li key={index} title={sp.address}>
                  {sp.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
