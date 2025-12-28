"use client";

import FilterBar from "./FilterBar";
import ModalDetail from "./ModalDetail1";
import { useRefundRequest } from "@/hooks/useRefundRequest";
import { useState } from "react";
import { Pagination, Table, TableData } from "@mantine/core";
import { IconEye } from "@/type/icon";

export default function ListRefunds() {
  const [requestSelected, setRequestSelected] = useState<any | null>(null);
  const { useSearchRefundRequest } = useRefundRequest();
  const { data: refundRequestsResponse } = useSearchRefundRequest({});
  const refundRequests = refundRequestsResponse?.data;
  const total = refundRequestsResponse?.total;

  const handleDetailRequest = (request: any) => {
    setRequestSelected(request);
  };

  const tableData: TableData = {
    head: ["", "Họ và tên", "Trạng thái", "email", "Số điện thoại"],
    body: refundRequests?.map((request: any) => {
      const fullName = `${request.requestedBy.firstName} ${request.requestedBy.lastName}`;
      return [
        <IconEye
          size={24}
          key={request.id}
          className="text-blue-600 cursor-pointer"
          onClick={() => handleDetailRequest(request)}
        />,
        fullName,
        request.status,
        request.requestedBy.email,
        request.requestedBy.phoneNumber,
      ];
    }),
  };

  return (
    <div className="">
      <div>
        <FilterBar setRefund={null} />
      </div>
      <Table data={tableData} />
      {requestSelected && (
        <ModalDetail
          isOpen={requestSelected !== null}
          onClose={() => setRequestSelected(null)}
          request={requestSelected}
        />
      )}

      <div className="flex justify-center mt-4">
        <Pagination total={total} />
      </div>
    </div>
  );
}
