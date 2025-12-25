"use client";

import { userApi } from "@/api/userApi";
import { updateProfile } from "@/redux/slice/authSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function PersonalInfoPage() {
  // common
  const dispatch = useDispatch();

  // redux
  const userRedux = useSelector((state: RootState) => state.auth.user);

  // state
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    "/avatar_default.png"
  );
  const [avatarFile, setAvatarFile] = useState(null as File | null);
  const [userInfo, setUserInfo] = useState({
    firstName: "Đang tải",
    lastName: "Đang tải",
    email: "Đang tải",
    phoneNumber: "Đang tải",
    role: "",
    userId: "",
  });

  useEffect(() => {
    if (userRedux) {
      setAvatarPreview(userRedux.avatar || "/avatar_default.png");
      setUserInfo({
        firstName: userRedux.firstName || "Chưa cập nhật",
        lastName: userRedux.lastName || "Chưa cập nhật",
        email: userRedux.email || "Chưa cập nhật",
        phoneNumber: userRedux.phoneNumber || "Chưa cập nhật",
        role: userRedux.role || "",
        userId: userRedux.userId || "",
      });
    }
  }, [userRedux]);

  useEffect(() => {}, [avatarPreview]);

  // ref
  const selectAvatarRef = useRef(null as HTMLInputElement | null);

  // handle
  const handleOpenFolder = () => {
    if (selectAvatarRef.current) {
      selectAvatarRef.current.value = ""; // Reset the input value to allow re-uploading the same file
      selectAvatarRef.current.click();
    }
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      // Tạo URL để xem trước ảnh
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setAvatarFile(file);
    }
  };

  const handleSubmit = async () => {
    const formDataSubmit = new FormData();

    formDataSubmit.append("firstName", userInfo.firstName);
    formDataSubmit.append("lastName", userInfo.lastName);
    formDataSubmit.append("phoneNumber", userInfo.phoneNumber);

    if (avatarFile) {
      formDataSubmit.append("avatar", avatarFile);
    }

    try {
      const response = await userApi.updateProfileMe(formDataSubmit);
      if (response.status === "success") {
        dispatch(
          updateProfile({
            user: { ...userInfo, avatar: avatarPreview as string },
          })
        );
        toast.success("Cập nhật thành công");
        setAvatarPreview(null);
        setIsUpdateMode(false);
        setAvatarFile(null);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Có lỗi xảy ra";

      toast.error("Cập nhật thất bại: " + message);
    }
  };

  const handleOnchangeInput = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((pre) => ({ ...pre, [name]: value }));
  };

  const onClickButtonCancle = () => {
    if (!userRedux) {
      toast.error("Có lỗi xảy ra vui lòng thử lại!!!");
      return;
    }
    setIsUpdateMode(false);
    setAvatarPreview(userRedux.avatar || "/avatar_default.png");
    setUserInfo({
      firstName: userRedux.firstName || "Chưa cập nhật",
      lastName: userRedux.lastName || "Chưa cập nhật",
      email: userRedux.email || "Chưa cập nhật",
      phoneNumber: userRedux.phoneNumber || "Chưa cập nhật",
      role: userRedux.role || "",
      userId: userRedux.userId || "",
    });
  };

  if (!userRedux) {
    return (
      <div className="w-[500px] mx-auto p-8 rounded-md shadow-lg bg-white mt-8">
        <p className="text-center text-red-500">Bạn chưa đăng nhập</p>
      </div>
    );
  }

  return (
    <div className="w-[500px] mx-auto p-8 rounded-md shadow-lg bg-white mt-8">
      <div>
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full">
            <Image
              src={avatarPreview || "/avatar_default.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={selectAvatarRef}
            onChange={handleChangeFile}
          />
          {isUpdateMode && (
            <button
              className="py-2 px-4 rounded-md bg-blue-400 mt-2 hover:bg-blue-500 cursor-pointer"
              onClick={handleOpenFolder}
            >
              Chọn avatar
            </button>
          )}
        </div>
        <div className="flex gap-6 items-center mt-4">
          <label className="font-bold text-black/80 w-[150px]">
            Họ và tên đệm
          </label>
          {!isUpdateMode ? (
            <p>{userInfo.firstName}</p>
          ) : (
            <input
              type="text"
              value={userInfo.firstName}
              onChange={handleOnchangeInput}
              name="firstName"
              className="border border-gray-200 rounded-200 py-1 px-2 grow"
            />
          )}
        </div>
        <div className="flex gap-6 items-center mt-4">
          <label className="font-bold text-black/80 w-[150px]">Tên</label>
          {!isUpdateMode ? (
            <p>{userInfo.lastName}</p>
          ) : (
            <input
              type="text"
              value={userInfo.lastName}
              onChange={handleOnchangeInput}
              name="lastName"
              className="border border-gray-200 rounded-200 py-1 px-2 grow"
            />
          )}
        </div>
        <div className="flex gap-6 items-center mt-4">
          <label className="font-bold text-black/80 w-[150px]">Email</label>
          <p>{userInfo.email}</p>
        </div>
        <div className="flex gap-6 items-center mt-4">
          <label className="font-bold text-black/80 w-[150px]">
            Số điện thoại
          </label>
          {isUpdateMode ? (
            <input
              type="text"
              name="phoneNumber"
              className="border border-gray-200 rounded-200 py-1 px-2 grow"
              value={userInfo.phoneNumber}
              onChange={handleOnchangeInput}
            />
          ) : (
            <p>{userInfo.phoneNumber}</p>
          )}
        </div>
        <div className="flex justify-center items-center pt-8 ">
          {isUpdateMode ? (
            <>
              <button
                className="bg-yellow-400 rounded-md px-4 py-2 hover:bg-yellow-500 cursor-pointer me-4"
                onClick={handleSubmit}
              >
                Lưu thay đổi
              </button>
              <button
                className="bg-red-400 rounded-md px-4 py-2 hover:bg-red-500 cursor-pointer"
                onClick={onClickButtonCancle}
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              className="bg-yellow-400 rounded-md px-4 py-2 hover:bg-yellow-500 cursor-pointer"
              onClick={() => setIsUpdateMode(true)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
