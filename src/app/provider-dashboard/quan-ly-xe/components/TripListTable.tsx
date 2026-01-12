import RouteText from "@/component/RouteText";
import TripTypeBadge from "@/component/TripTypebadge";
import { useTicket } from "@/hooks/useTicket";
import { IconEye } from "@/type/icon";
import format from "@/utils/format";
import { Modal, Table, TableData } from "@mantine/core";
import { FunctionComponent, useState } from "react";
import TicketList from "./TicketList";

interface TripListProps {
  trips: any;
  vehicle: any;
}

const TripTable: FunctionComponent<TripListProps> = ({ trips, vehicle }) => {
  const routeFrom = vehicle?.route?.origin?.name;
  const routeTo = vehicle?.route?.destination?.name;
  const [tripIdActive, setTripIdActive] = useState<string | undefined>();
  const { useGetTicketByTrip } = useTicket();
  const { data: ticketsResponse } = useGetTicketByTrip(tripIdActive);
  const tickets = ticketsResponse?.data;
  const tableData: TableData = {
    head: [
      "#",
      "type",
      "Tuyến đường",
      "Giá",
      "Ghế còn lại",
      "Loại xe",
      "Giờ xuất phát",
      "trạng thái",
    ],
    body: trips?.map((trip: any) => {
      const routeNameDisplay =
        trip.type === "go" ? (
          <RouteText from={routeFrom} to={routeTo} />
        ) : (
          <RouteText from={routeTo} to={routeFrom} />
        );

      return [
        <IconEye
          key={trip.tripId}
          size={20}
          color="blue"
          className="cursor-pointer"
          onClick={() => {
            handleClickTripOne(trip.tripId);
          }}
        />,
        <TripTypeBadge key={trip.tripId} type={trip.type} />,
        routeNameDisplay,
        format.formatMoneyVND(trip.price),
        `${trip.availabelSeat} / ${vehicle.totalSeat}`,
        trip.vehicle.busType,
        format.formatDate(trip.departDate),
        trip.tripStatus,
      ];
    }),
  };

  const handleClickTripOne = (tripId: string | undefined) => {
    setTripIdActive(tripId);
  };

  return (
    <div>
      <Table data={tableData} />
      <Modal
        opened={!!tripIdActive}
        onClose={() => setTripIdActive(undefined)}
        title="Danh sách vé"
        // size={"xl"}
        fullScreen
        centered
      >
        {tripIdActive && <TicketList tickets={tickets} />}
      </Modal>
    </div>
  );
};

export default TripTable;
