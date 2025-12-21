import { useDeleteRoute } from "@/hooks/useRoute";
import { IconDelete } from "@/type/icon";
import {
  Card,
  Divider,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Timeline,
  Tooltip,
} from "@mantine/core";

export default function RouteItem({ route }: { route: any }) {
  const { deleteRoute } = useDeleteRoute();
  const routesConfig = [
    {
      label: "🚏 Điểm đón",
      stopPoints: route.stopPoints.filter(
        (sp) => sp.city.locationId === route.origin.locationId
      ),
    },
    {
      label: "📍 Điểm trả",
      stopPoints: route.stopPoints.filter(
        (sp) => sp.city.locationId === route.destination.locationId
      ),
    },
  ];

  const handleDelete = async (routeId?: string) => {
    if (!routeId) return;
    deleteRoute({
      routeId,
    });
  };

  return (
    <Card radius="xl" withBorder shadow="lg" h="20em">
      <Stack h="100%" justify="space-between">
        {/* Header tuyến */}
        <Stack gap={4}>
          <div className="flex justify-between items-center">
            <Text fw={700} size="xl" c="blue.7">
              {route.origin.name} ↔ {route.destination.name}
            </Text>

            <div
              className="bg-red-100 p-2 rounded-full inline-flex cursor-pointer"
              onClick={() => handleDelete(route.routeId)}
            >
              <IconDelete
                size={20}
                color="red"
                className="hover:scale-120 transition-all"
              />
            </div>
          </div>

          <Group gap="md" c="dimmed" fz="sm">
            <Text>Thời gian chạy: {route.duration} giờ</Text>
            <Text>Nghỉ tại điểm đến: {route.restAtDestination} giờ</Text>
            <Text>Chu kỳ vé: {route.repeatsDay} ngày</Text>
          </Group>
        </Stack>

        <Divider />

        {/* Stop Points */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" style={{ flex: 1 }}>
          {routesConfig.map((config: any) => (
            <Card key={config.label} radius="lg" withBorder p="md" bg="gray.0">
              <Stack gap="xs">
                <Text fw={500} size="md" c="blue.6">
                  {config.label}
                </Text>

                {config.stopPoints.length > 0 ? (
                  <ScrollArea h={100}>
                    <Timeline lineWidth={1}>
                      {config.stopPoints.map((sp: any, index: number) => (
                        <Timeline.Item
                          key={index}
                          title={
                            <Tooltip label={sp.address}>
                              <span className="font-medium text-slate-500">
                                {sp.name}
                              </span>
                            </Tooltip>
                          }
                        ></Timeline.Item>
                      ))}
                    </Timeline>
                  </ScrollArea>
                ) : (
                  <Text fz="sm" c="gray.5" fs="italic">
                    Không có điểm đón
                  </Text>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  );
}
