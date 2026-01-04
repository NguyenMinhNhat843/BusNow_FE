"use client";

import UserInitialize from "@/component/layout/UserInitialize";
import ReduxProvider from "@/redux/provider";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const queryClient = new QueryClient();
const theme = createTheme({});
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <MantineProvider theme={theme}>
          <UserInitialize />
          <Toaster
            position="top-right"
            duration={3000}
            richColors
            closeButton
          />
          {children}
        </MantineProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
