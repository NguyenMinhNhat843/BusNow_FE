import { IconCheck } from "@/type/icon";
import { Button, Card, Center, Stack, Text, ThemeIcon } from "@mantine/core";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <Center h="100vh">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Stack align="center">
          <ThemeIcon color="green" size={64} radius="xl">
            <IconCheck size={36} />
          </ThemeIcon>

          <Text size="lg" fw={600}>
            Thanh toán thành công
          </Text>

          <Text size="sm" c="dimmed" ta="center">
            Cảm ơn bạn đã sử dụng dịch vụ. Chúc bạn có chuyến đi an toàn!
          </Text>

          <Button component={Link} href="/" color="green" fullWidth>
            Quay về trang chủ
          </Button>
        </Stack>
      </Card>
    </Center>
  );
};

export default PaymentSuccess;
