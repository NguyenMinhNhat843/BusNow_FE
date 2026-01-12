"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useVehicle } from "@/hooks/useVehicle";
import { useTrip } from "@/hooks/useTrip";
import { IconBack } from "@/type/icon";
import { Button, Pagination } from "@mantine/core";
import VehicleInfo from "./VehicleInfo";
import GenTripSection from "./GenTripConponent";
import TripTable from "./TripListTable";

interface DetailVehicleProps {
  vehicleId: string;
}

export default function DetailVehicle({ vehicleId }: DetailVehicleProps) {
  const router = useRouter();
  // state
  const { useGetVehicleById } = useVehicle();
  const { useFetchTrip } = useTrip();
  const { data: vehicle = {} } = useGetVehicleById(vehicleId);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: tripsResponse } = useFetchTrip(vehicleId, currentPage, 6);
  const trips = tripsResponse?.data;
  const totalPage = tripsResponse?.pagination?.totalPage;

  const handleBackToManagerVehicle = () => {
    router.push(`?`);
  };

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

      <TripTable trips={trips} vehicle={vehicle} />
      <div className="flex justify-center">
        <Pagination
          total={totalPage}
          value={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
