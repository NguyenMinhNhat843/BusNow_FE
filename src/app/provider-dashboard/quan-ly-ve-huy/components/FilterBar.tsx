import {
  SearchRefundRequestDTO,
  SearchRefundRequestDTOStatusEnum,
} from "@/apiGen/generated";
import { IconSearch } from "@/type/icon";
import { Button, TextInput, Select, Paper, Group } from "@mantine/core";
import React, { Dispatch, SetStateAction, useState } from "react";

interface FilterBarProps {
  onSubmit: Dispatch<SetStateAction<SearchRefundRequestDTO | undefined>>;
}

export default function FilterBar({ onSubmit }: FilterBarProps) {
  const [filters, setFilters] = useState<SearchRefundRequestDTO>({});

  const handleSubmit = () => {
    onSubmit(filters);
  };

  const refundStatusOptions: {
    value: SearchRefundRequestDTOStatusEnum;
    label: string;
  }[] = [
    {
      value: SearchRefundRequestDTOStatusEnum.Pending,
      label: "Chưa hoàn tiền",
    },
    {
      value: SearchRefundRequestDTOStatusEnum.Complete,
      label: "Đã hoàn tiền",
    },
    {
      value: SearchRefundRequestDTOStatusEnum.Rejected,
      label: "Từ chối hoàn tiền",
    },
  ];

  return (
    <Paper withBorder radius="md" p="md" mb="md">
      <Group grow align="end">
        {/* Số điện thoại */}
        <TextInput
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          value={filters.phoneNumber}
          onChange={(e) => {
            const value = e.currentTarget.value.trim();

            setFilters((prev) => ({
              ...prev,
              phoneNumber: value === "" ? undefined : value,
            }));
          }}
        />

        {/* Trạng thái */}
        <Select
          label="Trạng thái"
          placeholder="Chọn trạng thái"
          clearable
          data={refundStatusOptions}
          value={filters.status}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              status: (value as SearchRefundRequestDTOStatusEnum) ?? undefined,
            }))
          }
        />

        {/* Button */}
        <Button leftSection={<IconSearch size={16} />} onClick={handleSubmit}>
          Áp dụng
        </Button>
      </Group>
    </Paper>
  );
}
