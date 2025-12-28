import axiosInstance from "@/api/axiosInstance";
import { Button } from "@mantine/core";
import React, { useState } from "react";
import { toast } from "sonner";

interface FilterBarProps {
  setRefund: any;
}

interface filterDTO {
  phoneNumber?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export default function FilterBar({ setRefund }: FilterBarProps) {
  // state
  const [filters, setFilters] = useState<filterDTO>({
    status: "PENDING",
  });

  // handle change input
  const handleOnChangeInput = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(filters);
      const response = await axiosInstance.get("/refund-request/filter", {
        params: {
          page: 1,
          limit: 100,
          ...filters,
        },
      });
      if (response.data.status === "success") {
        setRefund(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 border border-gray-200">
      <div className="grid grid-cols-2 gap-4">
        {/* Tìm kiếm số điện thoại */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            value={filters.phoneNumber || ""}
            onChange={handleOnChangeInput}
            type="text"
            name="phoneNumber"
            placeholder="Nhập số điện thoại"
            className="w-full px-3 py-2 border rounded-md text-sm border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Lọc trạng thái */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Trạng thái</label>
          <select
            value={filters.status}
            onChange={handleOnChangeInput}
            name="status"
            className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
          >
            <option value="PENDING">Chưa hoàn tiền</option>
            <option value="COMPLETED">Đã hoàn tiền</option>
            <option value="REJECTED">Từ chối hoàn tiền</option>
          </select>
        </div>

        <Button onClick={handleSubmit} className="col-start-1 col-span-2">
          Áp dụng
        </Button>
      </div>
    </div>
  );
}
