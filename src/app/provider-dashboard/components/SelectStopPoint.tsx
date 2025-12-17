import { routeApi } from "@/api/routeApi";
import { useLocations } from "@/hooks/useLocations";
import { useStopPoint } from "@/hooks/useStopPoint";
import { Input, Paper, ScrollArea, Select, Text } from "@mantine/core";
import { useState } from "react";

export default function CreateRouteForm() {
  const { locations } = useLocations();
  const [formData, setFormData] = useState({
    origin: {
      name: "",
      id: "",
    },
    destination: {
      name: "",
      id: "",
    },
    duration: 0,
    restAtDestination: 0,
    repeatsDay: 0,
  });
  const { stopPoints: originSP } = useStopPoint({
    locationId: formData.origin.id,
  });
  const { stopPoints: destinationSP } = useStopPoint({
    locationId: formData.destination.id,
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit create
  const handleCreateRouteApi = async (e) => {
    e.preventDefault();
    const stopPointIds = [...originSP, ...destinationSP].map((sp) => sp.id);

    const body = {
      originId: formData.origin.id,
      destinationId: formData.destination.id,
      duration: Number(formData.duration),
      restAtDestination: Number(formData.restAtDestination),
      stopPointIds,
    };

    try {
      await routeApi.createRoute(body);

      // reset nếu muốn
      setFormData({
        origin: {
          id: "",
          name: "",
        },
        destination: {
          id: "",
          name: "",
        },
        duration: 0,
        restAtDestination: 0,
        repeatsDay: 0,
      });
    } catch (error: any) {
      alert("Có lỗi xảy ra: " + JSON.stringify(error));
    }
  };

  const locationsConfig = [
    {
      key: "origin",
      label: "Điểm đi",
      value: formData.origin.id,
      stopPoints: originSP,
    },
    {
      key: "destination",
      label: "Điểm đến",
      value: formData.destination.id,
      stopPoints: destinationSP,
    },
  ] as const;

  return (
    <form className="p-4 rounded-2xl bg-white shadow-md mb-6 border border-gray-200 mx-auto">
      <Text fw={700} size="lg">
        Tạo tuyến đường
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locationsConfig.map((config) => {
          return (
            <div key={config.key}>
              <Input.Wrapper label={config.label}>
                <Select
                  data={locations.map((location) => ({
                    label: location.name,
                    value: location.locationId,
                  }))}
                  clearable
                  value={config.value}
                  onChange={(value, option) =>
                    handleInputChange(config.key, {
                      name: option?.label,
                      id: option?.value,
                    })
                  }
                />
              </Input.Wrapper>

              {config.value && (
                <Input.Wrapper label="Danh sách điểm dừng" className="mt-2">
                  <ScrollArea h={250} scrollbars="y">
                    <div className="space-y-2">
                      {config.stopPoints.map((sp) => (
                        <Paper
                          key={sp.id}
                          withBorder
                          radius="md"
                          className="p-3 hover:bg-gray-50 cursor-pointer transition"
                        >
                          <Text fw={500} size="md">
                            {sp.name}
                          </Text>
                          <Text fw={400} size="sm" color="gray">
                            {sp.address}
                          </Text>
                        </Paper>
                      ))}
                    </div>
                  </ScrollArea>
                </Input.Wrapper>
              )}
            </div>
          );
        })}
      </div>

      <hr className="my-4 border-dashed" />

      {/* Thời gian và nghỉ */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Input.Wrapper label="Thời gian di chuyển">
          <Input
            type="number"
            placeholder="VD: 7"
            rightSection={
              <span className="text-sm text-gray-500 pr-1">giờ</span>
            }
            value={formData.duration}
            onChange={(e) =>
              handleInputChange("duration", e.currentTarget.value)
            }
          />
        </Input.Wrapper>
        <Input.Wrapper label="Thời gian nghỉ">
          <Input
            type="number"
            placeholder="VD: 4"
            rightSection={
              <span className="text-sm text-gray-500 pr-1">giờ</span>
            }
            value={formData.restAtDestination}
            onChange={(e) =>
              handleInputChange("restAtDestination", e.currentTarget.value)
            }
          />
        </Input.Wrapper>
        <Input.Wrapper label="Lặp lại sau">
          <Input
            type="number"
            name="repeatsDay"
            rightSection={
              <span className="text-sm text-gray-500 pr-1">ngày</span>
            }
            value={Math.ceil(
              ((Number(formData.duration) || 0) * 2 +
                (Number(formData.restAtDestination) || 0)) /
                8
            )}
            disabled
          />
        </Input.Wrapper>
      </div>

      <div className="mt-6 text-right">
        <button
          type="submit"
          className="bg-yellow-500 text-white font-medium px-6 py-2 rounded-md hover:bg-yellow-600"
          onClick={handleCreateRouteApi}
        >
          ✅ Tạo tuyến đường
        </button>
      </div>
    </form>
  );
}
