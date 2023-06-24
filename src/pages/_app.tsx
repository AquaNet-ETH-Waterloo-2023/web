import type { AppProps } from "next/app";
import localFont from "next/font/local";
import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";
import { twMerge } from "tailwind-merge";

import Navbar from "@/components/Navbar";
import Client from "@/providers/Client";
import RainbowkitProvider from "@/providers/RainbowKit";
import "@/styles/globals.css";

const msFont = localFont({
  src: [
    {
      path: "../fonts/ms_sans_serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ms_sans_serif_bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={original}>
      <Client>
        <RainbowkitProvider>
          <div
            className={twMerge(
              "flex h-screen flex-col overflow-hidden bg-bg",
              msFont.className
            )}
          >
            <Component {...pageProps} />
            <Client>
              <Navbar />
            </Client>
          </div>
        </RainbowkitProvider>
      </Client>
    </ThemeProvider>
  );
}
