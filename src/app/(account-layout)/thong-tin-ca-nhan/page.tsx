"use client";

import { userApi } from "@/api/userApi";
import { Breadcrumb } from "@/component/Breadscrumb";
import { useUSer } from "@/hooks/useUser";
import { updateProfile } from "@/redux/slice/authSlice";
import { IconCheck, IconWarning } from "@/type/icon";
import { Avatar, Button, Card, Group, Text, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const profileFields = [
  { label: "Họ và tên đệm", name: "firstName", editable: true },
  { label: "Tên", name: "lastName", editable: true },
  { label: "Email", name: "email" },
  { label: "Số điện thoại", name: "phoneNumber", editable: true },
];

export default function PersonalInfoPage() {
  const dispatch = useDispatch();
  const { useGetProfileMe } = useUSer();
  const { data: userCurrent, isLoading: isLoadingUserInfo } = useGetProfileMe();

  // state
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    userCurrent?.avatar || "/avatar_default.png"
  );
  const [avatarFile, setAvatarFile] = useState(null as File | null);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    userId: "",
  });

  useEffect(() => {
    if (!userCurrent) return;

    setAvatarPreview(userCurrent.avatar || "/avatar_default.png");
    setUserInfo({
      firstName: userCurrent.firstName || "Chưa cập nhật",
      lastName: userCurrent.lastName || "Chưa cập nhật",
      email: userCurrent.email || "Chưa cập nhật",
      phoneNumber: userCurrent.phoneNumber || "Chưa cập nhật",
      role: userCurrent.role,
      userId: userCurrent.userId,
    });
  }, [userCurrent]);

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
    if (!userCurrent) {
      toast.error("Có lỗi xảy ra vui lòng thử lại!!!");
      return;
    }
    setIsUpdateMode(false);
    setAvatarPreview(userCurrent.avatar || "/avatar_default.png");
    setUserInfo({
      firstName: userCurrent.firstName || "Chưa cập nhật",
      lastName: userCurrent.lastName || "Chưa cập nhật",
      email: userCurrent.email || "Chưa cập nhật",
      phoneNumber: userCurrent.phoneNumber || "Chưa cập nhật",
      role: userCurrent.role || "",
      userId: userCurrent.userId || "",
    });
  };

  if (isLoadingUserInfo) return;

  if (!userCurrent) {
    return (
      <div className="w-[500px] mx-auto p-8 rounded-md shadow-lg bg-white mt-8">
        <p className="text-center text-red-500">Bạn chưa đăng nhập</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin cá nhân" },
        ]}
      />
      <div
        className="
            bg-white
            rounded-lg
            shadow-sm
            p-6
            transition-all
            duration-300
          "
      >
        <Card
          padding="xl"
          radius="lg"
          className="max-w-3xl mx-auto mt-6 transition-all duration-300"
        >
          <div className="grid grid-cols-[200px_1fr] gap-8">
            {/* Left - Avatar */}
            <div className="flex flex-col items-center gap-3">
              <Avatar
                src={avatarPreview || "/avatar_default.png"}
                size={120}
                radius={120}
                className="
              bg-white
              ring-2 ring-gray-200
              shadow-md
            "
              />

              <input
                type="file"
                accept="image/*"
                hidden
                ref={selectAvatarRef}
                onChange={handleChangeFile}
              />

              {isUpdateMode && (
                <Button size="xs" variant="light" onClick={handleOpenFolder}>
                  Chọn avatar
                </Button>
              )}
            </div>

            {/* Right - Info */}
            <div className="space-y-4">
              {profileFields.map((field) => (
                <div
                  key={field.name}
                  className="grid grid-cols-[180px_1fr] items-center gap-4"
                >
                  <Text fw={600} className="text-gray-700">
                    {field.label}
                  </Text>

                  {!isUpdateMode || !field.editable ? (
                    <Text className="text-gray-800">
                      {userInfo[field.name as keyof typeof userInfo] || "-"}
                    </Text>
                  ) : (
                    <TextInput
                      value={
                        userInfo[field.name as keyof typeof userInfo] || ""
                      }
                      name={field.name}
                      onChange={handleOnchangeInput}
                      className="transition-all duration-300"
                    />
                  )}
                </div>
              ))}

              {/* Actions */}
              <div className="pt-6 flex justify-end">
                {isUpdateMode ? (
                  <Group>
                    <Button
                      color="yellow"
                      leftSection={<IconCheck size={16} />}
                      onClick={handleSubmit}
                    >
                      Lưu thay đổi
                    </Button>
                    <Button
                      color="red"
                      variant="light"
                      leftSection={<IconWarning size={16} />}
                      onClick={onClickButtonCancle}
                    >
                      Hủy
                    </Button>
                  </Group>
                ) : (
                  <Button color="yellow" onClick={() => setIsUpdateMode(true)}>
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
