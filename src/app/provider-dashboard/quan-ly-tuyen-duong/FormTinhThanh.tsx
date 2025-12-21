"use client";

import { CreateLocationDto } from "@/apiGen/generated";
import { locationApi } from "@/apiGen/location.api";
import { IconAdd, IconClean } from "@/type/icon";
import { Button, Card, Group, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function CreateLocationForm() {
  const form = useForm<CreateLocationDto>({
    initialValues: {
      locationName: "",
      stopPoints: [],
    },
  });

  const addStopPoint = () => {
    form.insertListItem("stopPoints", {
      name: "",
      address: "",
    });
  };

  const removeStopPoint = (index: number) => {
    form.removeListItem("stopPoints", index);
  };

  const handleSubmit = async (values: CreateLocationDto) => {
    try {
      const res = await locationApi.locationControllerCreateLocation(values);
      if (res) alert("Thêm thành công");
    } catch (error) {
      alert("Có lỗi: " + JSON.stringify(error));
    }
  };

  return (
    <Card withBorder radius="xl" p="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Text fw={600} size="lg">
            Thêm tỉnh / thành
          </Text>

          <TextInput
            label="Tên tỉnh / thành 123"
            placeholder="Ví dụ: TP Hồ Chí Minh"
            required
            {...form.getInputProps("locationName")}
          />

          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={500}>Danh sách điểm dừng</Text>
              <Button
                size="sm"
                leftSection={<IconAdd size={20} />}
                onClick={addStopPoint}
              >
                Thêm điểm dừng
              </Button>
            </Group>

            {form.values.stopPoints.map((_, index) => (
              <Card key={index} withBorder radius="md" p="sm">
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text fw={500}>Điểm dừng #{index + 1}</Text>
                    <Button
                      color="red"
                      size="xs"
                      variant="subtle"
                      onClick={() => removeStopPoint(index)}
                    >
                      <IconClean size={14} />
                    </Button>
                  </Group>

                  <TextInput
                    label="Tên hiển thị"
                    placeholder="VP Phạm Ngũ Lão"
                    required
                    {...form.getInputProps(`stopPoints.${index}.name`)}
                  />

                  <TextInput
                    label="Địa chỉ cụ thể"
                    placeholder="123 Phạm Ngũ Lão, Q1, TP.HCM"
                    required
                    {...form.getInputProps(`stopPoints.${index}.address`)}
                  />
                </Stack>
              </Card>
            ))}
          </Stack>

          <Group justify="flex-end">
            <Button type="submit">Lưu</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
