"use client";

import { useLocations } from "@/hooks/useLocations";
import { Card, ScrollArea, Stack, Text } from "@mantine/core";
import CreateLocationForm from "./FormTinhThanh";
import { IconDelete } from "@/type/icon";

const Tab_TinhThanh = () => {
  const { locations } = useLocations();

  return (
    <div className=" mt-4">
      <Text size="lg" fw={700}>
        Danh sách điểm dừng
      </Text>
      <div className="mt-2 mb-4">
        <CreateLocationForm />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {locations?.map((location: any) => (
          <Card
            key={location.locationId}
            withBorder
            radius="lg"
            p="md"
            shadow="sm"
          >
            <div className="flex justify-between mb-2">
              <Text fw={600} size="lg" c="blue.7">
                {location.name}
              </Text>

              <div
                className="bg-red-100 p-2 rounded-full inline-flex cursor-pointer"
                // onClick={() => handleDelete(route.routeId)}
              >
                <IconDelete
                  size={20}
                  color="red"
                  className="hover:scale-120 transition-all"
                />
              </div>
            </div>

            {location?.stopPoints?.length > 0 ? (
              <ScrollArea h={300}>
                <Stack gap={6}>
                  {location.stopPoints.map((sp) => (
                    <Card key={sp.id} withBorder radius="md" p="xs" bg="gray.0">
                      <Stack gap={2}>
                        <Text fw={500}>{sp.name}</Text>
                        <Text size="xs" c="dimmed">
                          {sp.address}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </ScrollArea>
            ) : (
              <Text size="sm" c="dimmed" fs="italic">
                Không có điểm đón
              </Text>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tab_TinhThanh;
