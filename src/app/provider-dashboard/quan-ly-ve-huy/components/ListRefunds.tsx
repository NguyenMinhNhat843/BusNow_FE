"use client";

import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RefundCard from "./RefundCard";
import FilterBar from "./FilterBar";

export default function ListRefunds() {
  const [refundsRequest, setRefundsRequest] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchRefundRequest = async () => {
      try {
        const response = await axiosInstance.get("/refund-request/limit", {
          params: {
            page: 1,
            limit: 100,
          },
        });

        if (response.data.status === "success") {
          setRefundsRequest(response.data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi");
      }
    };

    fetchRefundRequest();
  }, []);

  return (
    <div className="">
      <div>
        <FilterBar setRefund={setRefundsRequest} />
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {refundsRequest.map((item, index) => (
          <div key={index}>
            <RefundCard refund={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
