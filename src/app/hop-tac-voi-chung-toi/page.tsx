"use client";

import { useBusCompanyRequest } from "@/hooks/useBusCompanyRequest";
import {
  TextInput,
  Button,
  Textarea,
  FileInput,
  Group,
  Box,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function HopTacVoiChungToiPage() {
  const { createBusCompanyRequest, isPendingCreateBusCompanyRequest } =
    useBusCompanyRequest();
  const form = useForm({
    initialValues: {
      companyName: "Nhà xe Khanh Phong",
      representativeName: "Nguyễn Khanh Phong",
      email: "abc@gmail.com",
      phoneNumber: "0352416853",
      address: "123 Nha Trang",
      licenseNumber: "12345678",
      licenseFile: null as File | null,
    },

    validate: {
      companyName: (v) => (!v ? "Vui lòng nhập tên nhà xe" : null),
      representativeName: (v) => (!v ? "Vui lòng nhập người đại diện" : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Email không hợp lệ"),
      phoneNumber: (v) => (v.length >= 9 ? null : "Số điện thoại không hợp lệ"),
      licenseNumber: (v) => (!v ? "Vui lòng nhập số giấy phép" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const formData = new FormData();

    formData.append("companyName", values.companyName);
    formData.append("representativeName", values.representativeName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);
    formData.append("licenseNumber", values.licenseNumber);

    if (values.licenseFile) {
      formData.append("licenseFile", values.licenseFile);
    }

    createBusCompanyRequest(formData, {
      onSuccess: () => {
        alert("Tạo yêu cầu thành công, hãy kiểm tra email");
      },
    });

    console.log("Submit data", values);
  };

  return (
    <Box className="max-w-xl mx-auto py-12 px-4">
      <Title order={2} className="mb-4 text-center">
        Hợp tác với chúng tôi
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Tên nhà xe"
          placeholder="VD: Nhà xe Thành Công"
          {...form.getInputProps("companyName")}
        />

        <TextInput
          mt="md"
          label="Người đại diện"
          placeholder="Nguyễn Văn A"
          {...form.getInputProps("representativeName")}
        />

        <TextInput
          mt="md"
          label="Email"
          placeholder="nhaxe@email.com"
          {...form.getInputProps("email")}
        />

        <TextInput
          mt="md"
          label="Số điện thoại"
          placeholder="0909xxxxxx"
          {...form.getInputProps("phoneNumber")}
        />

        <Textarea
          mt="md"
          label="Địa chỉ"
          placeholder="Địa chỉ trụ sở nhà xe"
          {...form.getInputProps("address")}
        />

        <TextInput
          mt="md"
          label="Số giấy phép kinh doanh"
          {...form.getInputProps("licenseNumber")}
        />

        <FileInput
          mt="md"
          label="Giấy phép kinh doanh"
          placeholder="Upload file"
          accept="image/*,application/pdf"
          {...form.getInputProps("licenseFile")}
        />

        <Group justify="center" mt="xl">
          <Button
            type="submit"
            size="md"
            loading={isPendingCreateBusCompanyRequest}
          >
            Gửi yêu cầu hợp tác
          </Button>
        </Group>
      </form>
    </Box>
  );
}
