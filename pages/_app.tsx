import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  return (
      //konfiguracja - oplatamy apkę providerem
      <QueryClientProvider client={ queryClient}>
        <Component {...pageProps} />;
      </QueryClientProvider>
  )
}

export default MyApp;
