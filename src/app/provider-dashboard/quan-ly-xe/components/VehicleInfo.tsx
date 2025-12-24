import { Badge, Card, Divider, Group, Text } from "@mantine/core";
import { FunctionComponent } from "react";

interface VehicleInfoProps {
  vehicle?: any;
  rightSectionHeader?: React.ReactNode;
}

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <Text size="sm" c="dimmed">
      {label}
    </Text>
    <Text fw={600}>{value}</Text>
  </div>
);

const VehicleInfo: FunctionComponent<VehicleInfoProps> = ({
  vehicle,
  rightSectionHeader,
}) => {
  if (!vehicle) return;
  return (
    <Card shadow="sm" radius="lg" withBorder>
      {/* Header */}
      <Group justify="space-between" align="center" mb="md">
        <Group gap="sm">
          <Text size="xl" fw={700} c="blue">
            {vehicle.code}
          </Text>

          <Badge
            color={vehicle.isActive ? "green" : "red"}
            variant="light"
            radius="sm"
          >
            {vehicle.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
          </Badge>
        </Group>
        {/*     
                <Button
                  variant="light"
                  leftSection={<IconBack size={16} />}
                  onClick={handleBackToManagerVehicle}
                >
                  Quay lại
                </Button> */}
        {rightSectionHeader}
      </Group>

      <Divider mb="md" />

      {/* Thông tin xe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <InfoItem label="Loại xe" value={vehicle.busType} />
        <InfoItem label="Tổng số ghế" value={vehicle.totalSeat} />
        <InfoItem label="Giờ khởi hành" value={vehicle.departHour} />
        <InfoItem
          label="Ngày tạo"
          value={new Date(vehicle.createdAt).toLocaleString()}
        />

        {vehicle.route && (
          <>
            <InfoItem
              label="Tuyến xe"
              value={`${vehicle.route.origin.name} → ${vehicle.route.destination.name}`}
            />
            <InfoItem
              label="Thời gian di chuyển"
              value={`${vehicle.route.duration} giờ`}
            />
            <InfoItem
              label="Nghỉ tại điểm đến"
              value={`${vehicle.route.restAtDestination} giờ`}
            />
            <InfoItem
              label="Chu kỳ lặp lại vé"
              value={`${vehicle.route.repeatsDay} ngày`}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default VehicleInfo;
