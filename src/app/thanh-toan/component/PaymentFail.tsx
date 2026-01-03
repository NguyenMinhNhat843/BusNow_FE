import { IconWarning } from "@/type/icon";
import { Button, Card, Center, Stack, Text, ThemeIcon } from "@mantine/core";
import Link from "next/link";

const PaymentFail = () => {
  return (
    <Center h="100vh">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Stack align="center">
          <ThemeIcon color="red" size={64} radius="xl">
            <IconWarning size={36} />
          </ThemeIcon>

          <Text size="lg" fw={600} c="red">
            Thanh toán thất bại
          </Text>

          <Text size="sm" c="dimmed" ta="center">
            Giao dịch không thành công hoặc đã bị hủy. Vui lòng thử lại hoặc
            quay về trang chủ.
          </Text>

          <Button component={Link} href="/" color="red" fullWidth>
            Quay về trang chủ
          </Button>
        </Stack>
      </Card>
    </Center>
  );
};

export default PaymentFail;
