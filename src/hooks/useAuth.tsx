import { authApi } from "@/apiGen/auth.api";
import { CreateUserDto } from "@/apiGen/generated";
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-me"],
      });
    },
  });

  const { mutate: logout, isPending: isPendingLogout } = useMutation({
    mutationFn: async () => {
      await authApi.authControllerLogout();
    },
    onSuccess: () => {
      queryClient.setQueryData(["profile-me"], null);
    },
  });

  const { mutate: registerProvider, isPending: isPendingRegisterProvider } =
    useMutation({
      mutationFn: async (body: CreateUserDto) => {
        const res = await authApi.authControllerRegisterProvider(body);
        return res.data;
      },
    });

  return {
    logout,
    isPendingLogout,
    login,
    isPendingLogin,
    registerProvider,
    isPendingRegisterProvider,
  };
};
