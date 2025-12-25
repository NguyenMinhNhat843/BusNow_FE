"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { ticketApi } from "@/api/ticketApi";
import TicketItem from "./TicketItem";
import { useRouter } from "next/navigation";
import { useVehicle } from "@/hooks/useVehicle";
import { useTrip } from "@/hooks/useTrip";
import { IconBack } from "@/type/icon";
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Pagination,
  Stack,
  Text,
} from "@mantine/core";
import VehicleInfo from "./VehicleInfo";
import GenTripSection from "./GenTripConponent";

interface TicketItemProps {
  ticketId: string;
  status: string;
  createdAt: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  seatId: string;
  seatCode: number;
  paymentId: string;
  amount: number;
  paymentTime: string;
  paymentStatus: string;
}

interface DetailVehicleProps {
  vehicleId: string;
}

export default function DetailVehicle({ vehicleId }: DetailVehicleProps) {
  const router = useRouter();
  // state
  const [ticketsList, setTicketsList] = useState<TicketItemProps[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string>("");
  const { useGetVehicleById } = useVehicle();
  const { useFetchTrip } = useTrip();
  const { data: vehicle = {} } = useGetVehicleById(vehicleId);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: tripsResponse } = useFetchTrip(vehicleId, currentPage, 6);
  const trips = tripsResponse?.data;
  const totalPage = tripsResponse?.pagination?.totalPage;
  const routeFrom = vehicle?.route?.origin?.name;
  const routeTo = vehicle?.route?.destination?.name;

  const onClickTrip = async (tripId: string) => {
    try {
      const res = await ticketApi.findTicketByTrip(tripId);
      setSelectedTripId(tripId);
      if (res.status === "success") {
        setTicketsList(res.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleBackToManagerVehicle = () => {
    router.push(`?`);
  };

  const tripFields = [
    {
      label: "Ngày khởi hành",
      value: (trip: any) =>
        new Date(trip.departDate).toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      label: "Giá vé",
      value: (trip: any) => `${trip.price.toLocaleString("vi-VN")} đ`,
    },
    {
      label: "Ghế còn lại",
      value: (trip: any) => `${trip.availabelSeat} / ${vehicle.totalSeat}`,
    },
    {
      label: "Loại xe",
      value: (trip: any) => trip.vehicle.busType,
    },
    {
      label: "Giờ xuất phát",
      value: (trip: any) => trip.vehicle.departHour,
    },
  ];

  return (
    <div className="bg-white p-6 shadow-md space-y-6">
      <VehicleInfo
        vehicle={vehicle}
        rightSectionHeader={
          <Button
            variant="light"
            leftSection={<IconBack size={16} />}
            onClick={handleBackToManagerVehicle}
          >
            Quay lại
          </Button>
        }
      />

      <GenTripSection vehicleId={vehicleId} />

      <h2 className="text-lg font-semibold text-gray-800">
        Danh sách chuyến đi
      </h2>
      <Pagination
        total={totalPage}
        value={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex gap-6 ">
        {trips?.length > 0 && (
          <div className="space-y-4 min-w-[500px] max-w-[600px]">
            {trips.map((trip: any) => {
              const isSelected = selectedTripId === trip.tripId;
              const routeNameDispaly =
                trip.type === "go"
                  ? `${routeFrom} -> ${routeTo}`
                  : `${routeTo} -> ${routeFrom}`;

              return (
                <Card
                  key={trip.tripId}
                  withBorder
                  radius="xl"
                  padding="md"
                  shadow={isSelected ? "md" : "sm"}
                  onClick={() => onClickTrip(trip.tripId)}
                  bg={isSelected ? "yellow.3" : undefined}
                  style={{ cursor: "pointer" }}
                >
                  {/* Header */}
                  <Group justify="space-between" mb="xs">
                    <Text fw={700} c="blue">
                      {routeNameDispaly}
                    </Text>

                    <Badge
                      color={
                        trip.tripStatus === "PENDING"
                          ? "yellow"
                          : trip.tripStatus === "ACTIVE"
                          ? "green"
                          : "red"
                      }
                      variant="light"
                    >
                      {trip.tripStatus}
                    </Badge>
                  </Group>

                  {/* Body */}
                  <Grid gutter="xs">
                    {tripFields.map((field) => (
                      <Grid.Col key={field.label} span={{ base: 6, sm: 4 }}>
                        <Text size="xs" c="dimmed">
                          {field.label}
                        </Text>
                        <Text fw={500}>{field.value(trip)}</Text>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Card>
              );
            })}
          </div>
        )}

        {/* tickets list */}
        <div className="grow">
          <Card shadow="sm" radius="lg" withBorder className="h-full">
            {/* Header */}
            <Group justify="space-between" mb="md">
              <Text fw={700} size="lg">
                Danh sách vé
              </Text>

              <Badge variant="light" color="blue">
                {ticketsList.length} vé
              </Badge>
            </Group>

            <Divider mb="md" />

            {/* Empty state */}
            {ticketsList.length === 0 && (
              <div className="flex justify-center items-center h-[300px]">
                <Text size="lg" c="dimmed" fw={600}>
                  Không có vé nào
                </Text>
              </div>
            )}

            {/* Ticket list */}
            {ticketsList.length > 0 && (
              <Stack gap="sm">
                {ticketsList.map((t) => (
                  <TicketItem key={t.ticketId} ticket={t} />
                ))}
              </Stack>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
