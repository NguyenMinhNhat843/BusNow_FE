import { authApi } from "@/apiGen/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isPendingLogin } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await authApi.authControllerLogin(password, email);
      return response.data;
    },
  });

  const { mutate: logout, isPending: isPendingLogout } = useMutation({
    mutationFn: async () => {
      await authApi.authControllerLogout();
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["profile-me"],
      });
    },
  });

  return {
    logout,
    isPendingLogout,
    login,
    isPendingLogin,
  };
};
