"use client";

import VehicleItem from "../components/VehicleItem";
import DetailVehicle from "./components/DetailVehicle";
import { Button, Input, LoadingOverlay, Select, Text } from "@mantine/core";
import { useRoute } from "@/hooks/useRoute";
import { useVehicle } from "@/hooks/useVehicle";
import { TimeInput } from "@mantine/dates";
import ModalClean from "./components/ModalClean";
import { useTrip } from "@/hooks/useTrip";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";

export default function ManagerBus() {
  const router = useRouter();
  const searchParmas = useSearchParams();
  const vehicleIdFromParams = searchParmas.get("vehicleId");

  // common
  const { routes } = useRoute();
  const { useGetVehicles, useAddVehicle } = useVehicle();
  const { mutate: addVehicle, isPending: isPendingAddVehicle } =
    useAddVehicle();
  const { data: vehicles, isLoading: isLoadingGetVehicles } = useGetVehicles();
  const { useDeleteTripsBeforeNow } = useTrip();
  const { mutate: cleanTrip } = useDeleteTripsBeforeNow();

  // state
  const form = useForm({
    initialValues: {
      totalSeat: "",
      code: "",
      busType: "",
      routeId: "",
      departHour: "",
    },

    validate: {
      totalSeat: (v) => (!v ? "Vui lòng nhập số ghế" : null),
      code: (v) => (!v ? "Vui lòng nhập biển số xe" : null),
      busType: (v) => (!v ? "Chọn loại xe" : null),
      routeId: (v) => (!v ? "Chọn tuyến đường" : null),
      departHour: (v) => (!v ? "Chọn giờ khởi hành" : null),
    },
  });

  const handleOnClickVehicleItem = (vehicleId: string) => {
    router.push(`?vehicleId=${vehicleId}`);
  };

  const handleSubmit = (values: typeof form.values) => {
    const body = {
      code: values.code,
      totalSeat: Number(values.totalSeat),
      busType: values.busType,
      routeId: values.routeId,
      departHour: values.departHour,
    };

    addVehicle(body, {
      onSuccess: () => {
        alert("✅ Thêm xe thành công");
        form.reset();
      },
    });
  };

  return (
    <div>
      {!vehicleIdFromParams ? (
        <div className="">
          <div className="bg-white p-6 mb-8">
            <Text size="lg" fw={700}>
              Thêm xe mới
            </Text>
            <form
              onSubmit={form.onSubmit(handleSubmit)}
              className="grid grid-cols-3 gap-4"
            >
              <Input.Wrapper label="Số ghế">
                <Input
                  type="number"
                  placeholder="Số ghế"
                  {...form.getInputProps("totalSeat")}
                />
              </Input.Wrapper>

              <Input.Wrapper label="Biển số xe">
                <Input
                  placeholder="VD: 29A-125.45"
                  {...form.getInputProps("code")}
                />
              </Input.Wrapper>

              <Select
                label="Loại xe"
                clearable
                data={[
                  { label: "VIP", value: "VIP" },
                  { label: "LIMOUSINE", value: "LIMOUSINE" },
                  { label: "STANDARD", value: "STANDARD" },
                ]}
                {...form.getInputProps("busType")}
              />

              <Input.Wrapper label="Giờ khởi hành">
                <TimeInput {...form.getInputProps("departHour")} />
              </Input.Wrapper>

              <Input.Wrapper label="Tuyến đường">
                <Select
                  data={routes?.data?.map((route: any) => ({
                    label: `${route.origin.name} - ${route.destination.name}`,
                    value: route.routeId,
                  }))}
                  {...form.getInputProps("routeId")}
                />
              </Input.Wrapper>

              <div className="col-span-3 flex justify-center">
                <Button
                  type="submit"
                  className="w-1/2"
                  loading={isPendingAddVehicle}
                >
                  Thêm xe
                </Button>
              </div>
            </form>
          </div>

          {/* Danh sách xe */}
          <div className="relative p-4">
            <LoadingOverlay
              visible={isLoadingGetVehicles || isPendingAddVehicle}
              zIndex={100}
              overlayProps={{ radius: "sm", blur: 2 }}
            />

            <div className="flex gap-4 items-center justify-between pb-4">
              <Text size="lg" fw={700}>
                Danh sách xe ({vehicles?.data?.length})
              </Text>

              <ModalClean onSubmit={cleanTrip} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {vehicles?.data?.map((vehicle: any) => (
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
        <DetailVehicle vehicleId={vehicleIdFromParams} />
      )}
    </div>
  );
}
