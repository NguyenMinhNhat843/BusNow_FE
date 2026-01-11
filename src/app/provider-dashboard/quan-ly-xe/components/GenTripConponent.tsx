import { useTrip } from "@/hooks/useTrip";
import { Button, Card, Grid, Input, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FunctionComponent, useState } from "react";

interface GenTripSectionProps {
  vehicleId?: string;
}

const GenTripSection: FunctionComponent<GenTripSectionProps> = ({
  vehicleId,
}) => {
  const { useGenTrip } = useTrip();
  const { mutate: genTrip, isPending: isPendingGenTrip } = useGenTrip();

  const [price, setPrice] = useState<number | undefined>();
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState("");

  if (!vehicleId) return;
  return (
    <Card shadow="sm" radius="lg" withBorder>
      <Text size="xl" fw={700} c="blue" mb="md">
        Lên lịch cho các chuyến đi trong:
      </Text>

      <Grid align="end">
        {/* Từ ngày */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <DateInput
            label="Từ ngày"
            placeholder="Chọn ngày bắt đầu"
            value={startTime ? new Date(startTime) : null}
            onChange={(value) => {
              return setStartTime(value ? value.slice(0, 10) : "");
            }}
            valueFormat="DD/MM/YYYY"
            clearable
          />
        </Grid.Col>

        {/* Đến ngày */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <DateInput
            label="Đến ngày"
            placeholder="Chọn ngày kết thúc"
            value={endTime ? new Date(endTime) : null}
            onChange={(value) => setEndTime(value ? value.slice(0, 10) : "")}
            valueFormat="DD/MM/YYYY"
            minDate={startTime ? new Date(startTime) : undefined}
            clearable
          />
        </Grid.Col>

        {/* Giá tiền */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Input
            placeholder="Giá tiền"
            value={price}
            onChange={(e) => {
              const value = Number(e.currentTarget.value);

              if (Number.isNaN(value)) return;
              if (value > 0) return setPrice(value);
            }}
          />
        </Grid.Col>

        {/* Submit */}
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Button
            fullWidth
            loading={isPendingGenTrip}
            onClick={() =>
              genTrip(
                {
                  vehicleId,
                  startTime,
                  endTime,
                  price: price,
                },
                {
                  onSuccess: () => alert("Gen chuyến đi thành công"),
                  onError: () => alert("Có lỗi xảy ra"),
                }
              )
            }
          >
            Tạo chuyến
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default GenTripSection;
