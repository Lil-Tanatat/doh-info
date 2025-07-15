import "@/styles/globals.css";
import "@/styles/swiper-custom.css";
import "swiper/css/pagination";
import "swiper/css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider>
        <RouteGuard> */}
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        {/* </RouteGuard>
      </AuthProvider> */}
    </QueryClientProvider>
  );
}
