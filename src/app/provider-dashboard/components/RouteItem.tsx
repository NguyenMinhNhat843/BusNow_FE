export default function RouteItem({ route }: { route: any }) {
  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white shadow-lg border border-gray-200 space-y-5 mb-4 max-w-2xl h-[20em]">
      {/* Header tuyến */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-blue-700">
          {route.origin.name} → {route.destination.name}
        </h2>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span>⏱️ {route.duration} giờ</span>
          <span>• 💤 Nghỉ tại điểm đến: {route.restAtDestination} giờ</span>
        </div>
        <div className="text-sm text-gray-600">
          ♻️ Chu kỳ vé: mỗi {route.repeatsDay} ngày
        </div>
      </div>

      {/* Stop Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grow">
        {/* Điểm đón */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
          <h3 className="text-base font-semibold text-blue-600 mb-2 flex items-center gap-1">
            🚏 Điểm đón
          </h3>
          {route.stopPoints.filter(
            (sp: any) => sp.city.locationId === route.origin.locationId
          ).length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
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
          ) : (
            <p className="text-sm text-gray-400 italic">Không có điểm đón</p>
          )}
        </div>

        {/* Điểm trả */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
          <h3 className="text-base font-semibold text-green-600 mb-2 flex items-center gap-1">
            📍 Điểm trả
          </h3>
          {route.stopPoints.filter(
            (sp: any) => sp.city.locationId === route.destination.locationId
          ).length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {route.stopPoints
                .filter(
                  (sp: any) =>
                    sp.city.locationId === route.destination.locationId
                )
                .map((sp: any, index: number) => (
                  <li key={index} title={sp.address}>
                    {sp.name}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">Không có điểm trả</p>
          )}
        </div>
      </div>
    </div>
  );
}
