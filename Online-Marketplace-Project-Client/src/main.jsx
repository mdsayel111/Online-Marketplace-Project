import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainLayout from "./Layout/MainLayout";
import { RouterProvider } from "react-router-dom";
import Router from "./Routes/Router";
import { Toaster } from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthProvider from "./Contexts/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={Router}>
          </RouterProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>
);
