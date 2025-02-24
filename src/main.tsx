import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const isDevEnv = Boolean(import.meta.env.VITE_DEV_MODE);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {isDevEnv ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  </React.StrictMode>,
);
