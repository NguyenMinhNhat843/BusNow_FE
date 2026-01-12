import { IconRightDirection } from "@/type/icon";
import { Group, Text } from "@mantine/core";
import { FunctionComponent } from "react";

interface RouteTextProps {
  from: string;
  to: string;
}

const RouteText: FunctionComponent<RouteTextProps> = ({ from, to }) => {
  return (
    <Group gap={6} wrap="nowrap">
      <Text>{from}</Text>
      <IconRightDirection size={16} />
      <Text>{to}</Text>
    </Group>
  );
};

export default RouteText;
