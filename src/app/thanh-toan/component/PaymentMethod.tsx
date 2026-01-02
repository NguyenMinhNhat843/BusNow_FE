import { useState } from "react";
import { useOrderContext } from "../orderContext";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useVnpay } from "@/hooks/useVnPay";
import { Button, Group, Radio, Stack } from "@mantine/core";
import { useTicket } from "@/hooks/useTicket";
import {
  CreateTIcketDTO,
  CreateTIcketDTOMethodPaymentEnum,
} from "@/apiGen/generated";

const methodItems = [
  {
    value: "CASH",
    name: "Thanh toán tại quầy bán",
  },
  {
    value: "BANKING",
    name: "Thanh toán qua ngân hàng",
  },
];

export default function PaymentMethod() {
  const router = useRouter();
  const storedUser = localStorage.getItem("guest");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const { setStage } = useOrderContext();
  const [selectedMethod, setSelectedMethod] = useState<string>("CASH");
  const bookingInfo = useSelector((state: RootState) => state.booking);
  const handlePreviousStage = () => {
    setStage(1);
  };
  const handleSelectPaymentMethod = (value: string) => {
    setSelectedMethod(value);
  };
  const { totalAmount, from, selectedSeats, to, tripId } = bookingInfo;

  const { useCreatePaymentUrl } = useVnpay();
  const { mutate: createPaymentUrl } = useCreatePaymentUrl();
  const { useCreateTicket } = useTicket();
  const { mutate: createTicket, isPending: isPendingCreateTicket } =
    useCreateTicket();

  const handleSubmitBooking = async () => {
    if (!selectedMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (!user) {
      toast.error(
        "Bạn hãy nhập đủ thông tin firstname, lastName, phone, email"
      );
      return;
    }

    const payload: CreateTIcketDTO = {
      tripId: tripId,
      seatCode: selectedSeats,
      methodPayment: selectedMethod as CreateTIcketDTOMethodPaymentEnum,
      phone: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    try {
      if (selectedMethod === CreateTIcketDTOMethodPaymentEnum.Cash) {
        createTicket(payload, {
          onSuccess: () => {
            alert("Đặt vé thành công!");
            router.push("/");
            return;
          },
        });
      }

      // Thanh toán banking
      const res = createPaymentUrl(
        {
          amount: totalAmount,
          bookingInfo: payload,
          orderInfo: "Thanh toán vé xe",
        },
        {
          onSuccess: (res) => {
            window.location.href = res.url;
          },
        }
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <Stack gap="md" className="mt-4">
      {/* Payment method */}
      <Radio.Group value={selectedMethod} onChange={handleSelectPaymentMethod}>
        <Stack gap="sm">
          {methodItems.map((item) => (
            <Radio
              key={item.value}
              value={item.value}
              label={item.name}
              classNames={{
                root: "cursor-pointer",
                label: "cursor-pointer text-base",
              }}
            />
          ))}
        </Stack>
      </Radio.Group>

      {/* Actions */}
      <Group justify="space-between" mt="md">
        <Button
          variant="default"
          onClick={handlePreviousStage}
          className="hover:bg-gray-100"
        >
          Quay lại
        </Button>

        <Button
          color="yellow"
          loading={isPendingCreateTicket}
          onClick={handleSubmitBooking}
          className="text-black"
        >
          Thanh toán
        </Button>
      </Group>
    </Stack>
  );
}
