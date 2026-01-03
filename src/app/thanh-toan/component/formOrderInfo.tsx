"use client";

import { useEffect, useState } from "react";
import { useOrderContext } from "../orderContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import format from "@/utils/format";

interface FormOrderInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  departLocation: string;
  arriveLocation: string;
  departLocatioDetailName: string;
  arriveLocationDetailName: string;
  departTime: string;
  arriveTime: string;
  seats: string[];
}

export default function FormOrderInfo() {
  const bookingInfo = useSelector((state: RootState) => state.booking);
  const userRedux = useSelector((state: RootState) => state.auth.user);

  // state
  const { setStage } = useOrderContext();
  const [formData, setFormData] = useState<FormOrderInfoProps>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    departLocation: "",
    arriveLocation: "",
    departLocatioDetailName: "",
    arriveLocationDetailName: "",
    departTime: "",
    arriveTime: "",
    seats: [],
  });

  //redux
  const dataTrip = useSelector(
    (state: RootState) => state.trip.tripItemSelected
  );
  useEffect(() => {
    const storedUser = localStorage.getItem("guest");
    const user = userRedux
      ? userRedux
      : storedUser
      ? JSON.parse(storedUser)
      : null;

    if (user || dataTrip) {
      const mergedData = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        ...dataTrip, // merge sau để ghi đè những gì cần từ trip
      };

      setFormData((prev) => ({
        ...prev,
        ...mergedData,
      }));
    }
  }, []);

  const onChangeValue = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStage = (e: any) => {
    e.preventDefault();
    setStage((prev) => prev + 1);

    localStorage.setItem(
      "guest",
      JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        type: "guest",
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleNextStage} className="pt-4">
        {/* firstName name */}
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="">Họ và tên đệm</label>
          <input
            type="text"
            placeholder="Nhập họ"
            className="border boder-slate-100 p-2 rounded-md"
            name="firstName"
            value={`${formData.firstName}`}
            onChange={onChangeValue}
            required
          />
        </div>
        {/* lastName */}
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="">Tên</label>
          <input
            type="text"
            placeholder="Nhập tên"
            className="border boder-slate-100 p-2 rounded-md"
            name="lastName"
            value={`${formData.lastName}`}
            onChange={onChangeValue}
            required
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
            required
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
            required
          />
        </div>
        {/* Thông tin chuyến xe */}
        <div className="flex justify-between items-center gap-4 pt-6">
          {/* Điểm đi */}
          <div className="flex-1 rounded-xl bg-yellow-100 border border-yellow-300 p-4 shadow-sm">
            <p className="text-sm text-gray-600 font-medium">Đi từ:</p>
            <p className="text-lg font-semibold text-gray-800">
              {bookingInfo?.from.name}
            </p>
            <p className="text-sm text-gray-500">
              Điểm đón: {bookingInfo.from.stopPoint}
            </p>
            <p className="text-sm text-gray-500">
              Lúc: {format.formatDate(bookingInfo.from.time)}
            </p>
          </div>

          {/* Đường nét đứt biểu tượng chuyển tiếp */}
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-full border-t-2 border-dashed border-gray-400"></div>
          </div>

          {/* Điểm đến */}
          <div className="flex-1 rounded-xl bg-yellow-100 border border-yellow-300 p-4 shadow-sm">
            <p className="text-sm text-gray-600 font-medium">Đến:</p>
            <p className="text-lg font-semibold text-gray-800">
              {bookingInfo.to.name}
            </p>
            <p className="text-sm text-gray-500">
              Điểm đón: {bookingInfo.to.stopPoint}
            </p>
            <p className="text-sm text-gray-500">
              Lúc: {format.formatDate(bookingInfo.to.time)}
            </p>
          </div>
        </div>

        {/* Thông tin ghế */}
        <div className="flex flex-col gap-2 pb-4 pt-4">
          <label htmlFor="">Ghế đã đặt</label>
          <div className="flex items-center gap-4">
            {bookingInfo.selectedSeats.length === 0 ? (
              <span className="text-red-500">Chưa có ghế nào được đặt</span>
            ) : (
              bookingInfo.selectedSeats.map((seat, index) => (
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
          <span className="font-bold text-2xl text-red-400">
            {format.formatMoneyVND(bookingInfo.totalAmount)} VND
          </span>
        </div>

        {/* button submit */}
        <div className="flex justify-center pt-6">
          <button
            className="py-2 px-16 rounded-md bg-yellow-400 font-bold text-xl cursor-pointer hover:bg-yellow-500 transition-colors duration-300"
            // onClick={handleNextStage}
            type="submit"
          >
            Tiếp theo
          </button>
        </div>
      </form>
    </div>
  );
}
