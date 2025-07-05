"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useOrderContext } from "../orderContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface FormOrderInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  departLocation: string;
  arriveLocation: string;
  departDetailLocation: string;
  arriveDetailLocation: string;
  departTime: string;
  arriveTime: string;
  seats: string[];
}

export default function FormOrderInfo() {
  // common
  const router = useRouter();

  // state
  const { stage, setStage } = useOrderContext();

  // state
  const [formData, setFormData] = useState<FormOrderInfoProps>({
    firstName: "asdasd",
    lastName: "adasd",
    email: "asdas@gmail.com",
    phoneNumber: "0147258369",
    departLocation: "Nha Trang",
    arriveLocation: "Hồ Chí Minh",
    departDetailLocation: "Bến xe Nha Trang",
    arriveDetailLocation: "Bến Xe Miền Đông",
    departTime: "04h 02/08",
    arriveTime: "04h 02/08",
    seats: ["A12", "A13"],
  });

  //redux
  const dataTrip = useSelector(
    (state: RootState) => state.trip.tripItemSelected
  );
  useEffect(() => {
    if (dataTrip) {
      const newData = { ...formData, ...dataTrip };
      setFormData(newData);
    }
  }, [dataTrip]);

  const onChangeValue = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStage = () => {
    setStage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="pt-4">
        {/* firstName name */}
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="">Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập họ"
            className="border boder-slate-100 p-2 rounded-md"
            name="firstName"
            value={`${formData.firstName}`}
            onChange={onChangeValue}
          />
        </div>
        {/* lastName */}
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="">Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập tên"
            className="border boder-slate-100 p-2 rounded-md"
            name="lastName"
            value={`${formData.lastName}`}
            onChange={onChangeValue}
          />
        </div>
        {/* email */}
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border boder-slate-100 p-2 rounded-md"
            name="email"
            value={formData.email}
            onChange={onChangeValue}
          />
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="">Số điện thoại</label>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            className="border boder-slate-100 p-2 rounded-md"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChangeValue}
          />
        </div>
        {/* Thông tin chuyến xe */}
        <div className="flex justify-between items-center gap-4 pt-6">
          {/* Điểm đi */}
          <div className="flex-1 rounded-xl bg-yellow-100 border border-yellow-300 p-4 shadow-sm">
            <p className="text-sm text-gray-600 font-medium">Đi từ:</p>
            <p className="text-lg font-semibold text-gray-800">
              {formData.departLocation}
            </p>
            <p className="text-sm text-gray-500">
              Điểm đón: {formData.departDetailLocation}
            </p>
            <p className="text-sm text-gray-500">Lúc: {formData.departTime}</p>
          </div>

          {/* Đường nét đứt biểu tượng chuyển tiếp */}
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-full border-t-2 border-dashed border-gray-400"></div>
          </div>

          {/* Điểm đến */}
          <div className="flex-1 rounded-xl bg-yellow-100 border border-yellow-300 p-4 shadow-sm">
            <p className="text-sm text-gray-600 font-medium">Đến:</p>
            <p className="text-lg font-semibold text-gray-800">
              {formData.arriveLocation}
            </p>
            <p className="text-sm text-gray-500">
              Điểm đón: {formData.arriveDetailLocation}
            </p>
            <p className="text-sm text-gray-500">Lúc: {formData.arriveTime}</p>
          </div>
        </div>

        {/* Thông tin ghế */}
        <div className="flex flex-col gap-2 pb-4 pt-4">
          <label htmlFor="">Ghế đã đặt</label>
          <div className="flex items-center gap-4">
            {formData.seats.length === 0 ? (
              <span className="text-red-500">Chưa có ghế nào được đặt</span>
            ) : (
              formData.seats.map((seat, index) => (
                <div
                  key={index}
                  className="py-2 px-4 bg-yellow-400 text-slate-700 rounded-md"
                >
                  <span className="">{seat}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="flex items-center gap-4">
          <p className="text-lg">Tổng tiền: </p>
          <span className="font-bold text-2xl text-red-400">300.000 VND</span>
        </div>

        {/* button submit */}
        <div className="flex justify-center pt-6">
          <button
            className="py-2 px-16 rounded-md bg-yellow-400 font-bold text-xl cursor-pointer hover:bg-yellow-500 transition-colors duration-300"
            onClick={handleNextStage}
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
}
