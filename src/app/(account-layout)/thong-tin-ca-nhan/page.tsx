"use client";

import { userApi } from "@/api/userApi";
import { useUSer } from "@/hooks/useUser";
import { updateProfile } from "@/redux/slice/authSlice";
import { IconCheck, IconWarning } from "@/type/icon";
import {
  Avatar,
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

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
    <Card shadow="md" radius="md" padding="xl" maw={500} mx="auto" mt="xl">
      <Stack gap="md">
        {/* Avatar */}
        <Center>
          <Stack align="center" gap="xs">
            <Avatar
              src={avatarPreview || "/avatar_default.png"}
              size={100}
              radius={100}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={selectAvatarRef}
              onChange={handleChangeFile}
            />
            {isUpdateMode && (
              <Button size="xs" onClick={handleOpenFolder}>
                Chọn avatar
              </Button>
            )}
          </Stack>
        </Center>

        {/* First name */}
        <Group align="center" gap="lg">
          <Text fw={600} w={150}>
            Họ và tên đệm
          </Text>
          {!isUpdateMode ? (
            <Text>{userInfo.firstName}</Text>
          ) : (
            <TextInput
              value={userInfo.firstName}
              name="firstName"
              onChange={handleOnchangeInput}
              className="flex-1"
            />
          )}
        </Group>

        {/* Last name */}
        <Group align="center" gap="lg">
          <Text fw={600} w={150}>
            Tên
          </Text>
          {!isUpdateMode ? (
            <Text>{userInfo.lastName}</Text>
          ) : (
            <TextInput
              value={userInfo.lastName}
              name="lastName"
              onChange={handleOnchangeInput}
              className="flex-1"
            />
          )}
        </Group>

        {/* Email */}
        <Group align="center" gap="lg">
          <Text fw={600} w={150}>
            Email
          </Text>
          <Text>{userInfo.email}</Text>
        </Group>

        {/* Phone */}
        <Group align="center" gap="lg">
          <Text fw={600} w={150}>
            Số điện thoại
          </Text>
          {!isUpdateMode ? (
            <Text>{userInfo.phoneNumber}</Text>
          ) : (
            <TextInput
              value={userInfo.phoneNumber}
              name="phoneNumber"
              onChange={handleOnchangeInput}
              className="flex-1"
            />
          )}
        </Group>

        {/* Actions */}
        <Center pt="md">
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
        </Center>
      </Stack>
    </Card>
  );
}
