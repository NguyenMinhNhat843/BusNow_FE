"use client";

import ReduxProvider from "@/redux/provider";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { AuthProvider } from "./AuthContext";

const queryClient = new QueryClient();
const theme = createTheme({});
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <Toaster
              position="top-right"
              duration={3000}
              richColors
              closeButton
            />
            {children}
          </MantineProvider>
        </ReduxProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
