import { userApi } from "@/apiGen/userApi";
import { useQuery } from "@tanstack/react-query";

export const useUSer = () => {
  const useGetProfileMe = () => {
    return useQuery<any>({
      queryKey: ["profile-me"],
      queryFn: async () => {
        const res = await userApi.userControllerGetProfile();
        return res.data;
      },
      retry: false,
    });
  };

  return {
    useGetProfileMe,
  };
};
