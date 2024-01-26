import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Router/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}
