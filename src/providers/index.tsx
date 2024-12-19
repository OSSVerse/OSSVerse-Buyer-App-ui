import type { FC, PropsWithChildren } from "react";
import ModalProvider from "./modal-provider";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "../routes";
import { ThemeProvider } from "@/context/theme-context";
const Providers: FC<PropsWithChildren<{ queryClient: QueryClient }>> = ({
  queryClient,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={routes} />
        <ModalProvider />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
