"use client";

import { useState } from "react";
import VehicleItem from "../components/VehicleItem";
import DetailVehicle from "./components/DetailVehicle";
import { TabCurrentEnum } from "./enum/TabCurrentEnum";
import { Input, LoadingOverlay, Select, Text } from "@mantine/core";
import { useRoute } from "@/hooks/useRoute";
import { useVehicle } from "@/hooks/useVehicle";
import { TimeInput } from "@mantine/dates";
import ModalClean from "./components/ModalClean";
import { useTrip } from "@/hooks/useTrip";

export default function ManagerBus() {
  // common
  const { routes } = useRoute();
  const { vehicles, addVehicle, loading } = useVehicle();
  const { handleDeleteTripsBeforeNow } = useTrip();
  // state
  const [formData, setFormData] = useState({
    totalSeat: "",
    code: "",
    busType: "",
    routeId: "",
    departHour: "",
  });
  const [tabCurrent, setTabCurrent] = useState<TabCurrentEnum>(
    TabCurrentEnum.VEHICLE
  );
  const [vehicleSelectedId, setVehicleSelectedId] = useState<string>("");

  // handle onClick a vehicleItem - navigate to detail vehicle tab
  const handleOnClickVehicleItem = (vehicleId: string) => {
    setTabCurrent(TabCurrentEnum.DETAIL_VEHICLE);
    setVehicleSelectedId(vehicleId);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      code: formData.code,
      totalSeat: Number(formData.totalSeat),
      busType: formData.busType, // tùy cách backend xử lý
      routeId: formData.routeId,
      departHour: formData.departHour,
    };

    addVehicle(body);
  };

  return (
    <div>
      {tabCurrent === TabCurrentEnum.VEHICLE ? (
        <div className="">
          <div className="bg-white p-6 mb-8">
            <Text size="lg" fw={700}>
              Thêm xe mới
            </Text>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <Input.Wrapper label="Số ghế">
                <Input
                  type="number"
                  placeholder="Số ghế"
                  value={formData.totalSeat}
                  onChange={(e) =>
                    handleChange("totalSeat", e.currentTarget.value)
                  }
                />
              </Input.Wrapper>
              <Input.Wrapper label="Biển số xe">
                <Input
                  type="text"
                  placeholder="VD: 29A-125.45"
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.currentTarget.value)}
                />
              </Input.Wrapper>
              <Select
                label="Loại xe"
                name="type"
                clearable
                value={formData.busType}
                data={[
                  {
                    label: "Vip",
                    value: "VIP",
                  },
                  {
                    label: "LIMOUSINE",
                    value: "LIMOUSINE",
                  },
                  {
                    label: "STANDARD",
                    value: "STANDARD",
                  },
                ]}
                onChange={(value) => {
                  return handleChange("busType", String(value));
                }}
              />
              <Input.Wrapper label="Giờ khởi hành">
                <TimeInput
                  value={formData.departHour}
                  onChange={(e) => {
                    return handleChange("departHour", e.currentTarget.value);
                  }}
                />
              </Input.Wrapper>

              <Input.Wrapper label="Tuyến đường">
                <Select
                  value={formData.routeId}
                  data={routes.map((route: any) => ({
                    label: `${route.origin.name} - ${route.destination.name}`,
                    value: route.routeId,
                  }))}
                  onChange={(value) => handleChange("routeId", String(value))}
                />
              </Input.Wrapper>

              <div className="col-span-3 flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 mx-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Thêm xe
                </button>
              </div>
            </form>
          </div>

          {/* Danh sách xe */}
          <div className="relative p-4">
            <LoadingOverlay
              visible={loading}
              zIndex={100}
              overlayProps={{ radius: "sm", blur: 2 }}
            />

            <div className="flex gap-4 items-center justify-between pb-4">
              <Text size="lg" fw={700}>
                Danh sách xe ({vehicles.length})
              </Text>

              <ModalClean onSubmit={handleDeleteTripsBeforeNow} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.vehicleId}
                  className="mb-4 cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                  onClick={() => handleOnClickVehicleItem(vehicle.vehicleId)}
                >
                  <VehicleItem vehicle={vehicle} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <DetailVehicle
          vehicleId={vehicleSelectedId}
          setTabCurrent={setTabCurrent}
        />
      )}
    </div>
  );
}
