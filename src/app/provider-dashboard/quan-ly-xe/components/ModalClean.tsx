import { IconClean } from "@/type/icon";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunctionComponent } from "react";

interface ModalCleanProps {
  onSubmit: () => void;
}

const ModalClean: FunctionComponent<ModalCleanProps> = ({ onSubmit }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="md">
        <Text size="sm" mb="md">
          Hành vi này sẽ{" "}
          <b>xóa tất cả chuyến đi và vé trước thời điểm hiện tại</b>,
          <span className="text-red-600 font-semibold">
            {" "}
            không thể hoàn tác
          </span>
          .
          <br />
          Bạn vẫn muốn tiếp tục chứ?
        </Text>

        <Group justify="flex-end" mt="lg">
          <Button
            variant="default"
            onClick={() => {
              onSubmit();
              close();
            }}
          >
            Đồng ý
          </Button>
          <Button color="red" onClick={close}>
            Hủy bỏ
          </Button>
        </Group>
      </Modal>
      <Button
        size="md"
        onClick={open}
        color="red"
        rightSection={<IconClean size={20} />}
      >
        Clean
      </Button>
    </>
  );
};

export default ModalClean;
