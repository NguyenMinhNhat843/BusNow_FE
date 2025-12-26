"use client";

import { BankingInfoDTO } from "@/apiGen/generated";
import { useTicket } from "@/hooks/useTicket";
import { Modal, TextInput, Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

interface BankingInfoModalProps {
  opened: boolean;
  onClose: () => void;
  ticketId: string;
}

const BankingInfoModal = ({
  opened,
  onClose,
  ticketId,
}: BankingInfoModalProps) => {
  const [otpStep, setOtpStep] = useState<boolean>(false);
  const { useConfirmOTPCancleTicket, useCancleTicket } = useTicket();
  const { mutate: confirmCancleTicket } = useConfirmOTPCancleTicket();
  const { mutate: cancleTicket } = useCancleTicket();
  const router = useRouter();

  const form = useForm<
    BankingInfoDTO & {
      otp?: string;
    }
  >({
    initialValues: {
      bankName: "Agribank",
      accountName: "NGUYEN MINH NHAT",
      accountNumber: "123456789",
    },

    validate: {
      bankName: (v) => (!v ? "Nhập tên ngân hàng" : null),
      accountName: (v) => (!v ? "Nhập tên chủ tài khoản" : null),
      accountNumber: (v) =>
        !v
          ? "Nhập số tài khoản"
          : !/^\d+$/.test(v)
          ? "Số tài khoản không hợp lệ"
          : null,
    },
  });

  const sendOTPCancleTicket = async (body: BankingInfoDTO) => {
    cancleTicket(
      {
        ticketId,
        bankingInfo: body,
      },
      {
        onSuccess: () => {
          alert("Đã gửi email xác thực, vui lòng check email");
          setOtpStep(true);
        },
        onError: (err: any) => {
          alert("Lỗi: " + err.message);
        },
      }
    );
  };

  const handleConfirmOTPCancleTicket = async () => {
    confirmCancleTicket(
      {
        cancleTicketRequest: {
          ticketId,
          bankingInfo: {
            accountName: form.getValues().accountName,
            accountNumber: form.getValues().accountNumber,
            bankName: form.getValues().bankName,
          },
        },
        otp: form.getValues().otp || "",
      },
      {
        onSuccess: () => {
          alert("Hủy vé thành công");
          router.push("/don-hang-cua-toi");
        },
        onError: (err: any) => {
          alert("Lỗi: " + err.message);
        },
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Thông tin hoàn tiền"
      centered
    >
      <form
        onSubmit={form.onSubmit(
          otpStep ? handleConfirmOTPCancleTicket : sendOTPCancleTicket
        )}
      >
        <Stack>
          <TextInput
            label="Tên ngân hàng"
            {...form.getInputProps("bankName")}
          />

          <TextInput
            label="Tên chủ tài khoản"
            {...form.getInputProps("accountName")}
          />

          <TextInput
            label="Số tài khoản"
            {...form.getInputProps("accountNumber")}
          />

          {otpStep && (
            <TextInput label="Xác nhận OTP" {...form.getInputProps("otp")} />
          )}

          <Button type="submit">Gửi yêu cầu hoàn tiền</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default BankingInfoModal;
