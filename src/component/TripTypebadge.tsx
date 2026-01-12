import { Badge } from "@mantine/core";
import { FunctionComponent } from "react";

interface TripTypeBadgeProps {
  type: "go" | "return";
}

const TripTypeBadge: FunctionComponent<TripTypeBadgeProps> = ({ type }) => {
  return type === "go" ? (
    <Badge color="green" variant="light">
      Chuyến đi
    </Badge>
  ) : (
    <Badge color="blue" variant="light">
      Chuyến về
    </Badge>
  );
};

export default TripTypeBadge;
