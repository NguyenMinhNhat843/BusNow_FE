"use client";

import Page from "@/app/page";
import { useBusCompanyRequest } from "@/hooks/useBusCompanyRequest";
import { Table, TableData, Text } from "@mantine/core";
import { FunctionComponent } from "react";

interface YeuCauHopTacProps {}

const YeuCauHopTac: FunctionComponent<YeuCauHopTacProps> = () => {
  const { useGetBusCompanyRequest } = useBusCompanyRequest();
  const { data: requestResponse } = useGetBusCompanyRequest();
  const requests = requestResponse?.data;
  const total = requestResponse?.total;
  const tableData: TableData = {
    head: [
      "Tên công ty",
      "Địa chỉ",
      "SĐT",
      "email",
      "Người đại diện",
      "Mã giấy phép",
      "Giấy phép kinh doanh",
      "Trạng thái",
    ],
    body: requests?.map((request: any) => {
      const {
        companyName,
        address,
        phoneNumber,
        email,
        representativeName,
        licenseNumber,
        licenseFileUrl,
        status,
      } = request;
      return [
        companyName,
        address,
        phoneNumber,
        email,
        representativeName,
        licenseNumber,
        licenseFileUrl,
        status,
      ];
    }),
  };
  return (
    <div>
      <Text fw={700} size="lg" className="mb-4">
        Yêu cầu hợp tác
      </Text>
      <Table data={tableData} />
    </div>
  );
};

export default YeuCauHopTac;
