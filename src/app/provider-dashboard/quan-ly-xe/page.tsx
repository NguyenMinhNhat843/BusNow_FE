"use client";

import { useState, useEffect } from "react";

const VehicleTypeEnum = ["BUS", "TRAIN", "PLANE"];
const VehicleTypeBusEnum = ["VIP", "LIMOUSINE", "STANDARD"];

type Vehicle = {
  id: string;
  code: string;
  totalSeat: number;
  type: string;
  subType?: string;
};

const PER_PAGE = 5;

export default function ManagerBus() {
  const [formData, setFormData] = useState({
    totalSeat: "",
    code: "",
    type: "",
    subType: "",
  });

  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      code: formData.code,
      totalSeat: Number(formData.totalSeat),
      type: formData.type,
      subType: formData.type === "BUS" ? formData.subType : undefined,
    };

    setVehicleList((prev) => [newVehicle, ...prev]); // Thêm xe mới vào đầu danh sách
    setFormData({ totalSeat: "", code: "", type: "", subType: "" });
    setCurrentPage(1); // Reset về trang 1 khi có xe mới
  };

  // Simulate load data ban đầu
  useEffect(() => {
    const dummy = Array.from({ length: 12 }, (_, i) => ({
      id: String(i + 1),
      code: `${10 + i}A-12${i}.${i < 10 ? "0" + i : i}`,
      totalSeat: 20 + i,
      type: i % 3 === 0 ? "BUS" : i % 3 === 1 ? "TRAIN" : "PLANE",
      subType: i % 3 === 0 ? VehicleTypeBusEnum[i % 3] : undefined,
    }));
    setVehicleList(dummy);
  }, []);

  const totalPage = Math.ceil(vehicleList.length / PER_PAGE);
  const paginated = vehicleList.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Thêm xe mới</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Số ghế</label>
            <input
              type="number"
              name="totalSeat"
              value={formData.totalSeat}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Biển số xe</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="VD: 29A-123.45"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Loại phương tiện</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">-- Chọn loại --</option>
              {VehicleTypeEnum.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {formData.type === "BUS" && (
            <div>
              <label className="block mb-1 font-medium">Loại xe Bus</label>
              <select
                name="subType"
                value={formData.subType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">-- Chọn loại --</option>
                {VehicleTypeBusEnum.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tuyến dường chạy */}
          <div>
            <p>
              Tuyến đường: <span>Sài Gòn - Nha Trang</span>
            </p>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Thêm xe
            </button>
          </div>
        </form>
      </div>

      {/* Danh sách xe */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Danh sách xe</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Biển số</th>
                <th className="p-3 border">Số ghế</th>
                <th className="p-3 border">Loại</th>
                <th className="p-3 border">Loại xe Bus</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((v, index) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="p-3 border text-center">
                    {(currentPage - 1) * PER_PAGE + index + 1}
                  </td>
                  <td className="p-3 border">{v.code}</td>
                  <td className="p-3 border">{v.totalSeat}</td>
                  <td className="p-3 border">{v.type}</td>
                  <td className="p-3 border">{v.subType || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
