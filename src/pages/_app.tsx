import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";
import { twMerge } from "tailwind-merge";

import Navbar from "@/components/Navbar";
import Client from "@/providers/Client";
import RainbowkitProvider from "@/providers/RainbowKit";
import "@/styles/globals.css";

export type User = {
  tokenAddress: string;
  tokenId: string;
  image: string;
  name: string;
  bio: string;
  created_at: string;
  username: string;
  tone: string;
};

export type Page = "none" | "stuff" | "mypuddle";

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface PageContextType {
  page: Page;
  setPage: Dispatch<SetStateAction<Page>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const PageContext = createContext<PageContextType | undefined>(
  undefined
);

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
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("none");

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
            <UserContext.Provider value={{ user, setUser }}>
              <PageContext.Provider value={{ page, setPage }}>
                <Component {...pageProps} />
                <Client>
                  <Navbar />
                </Client>
              </PageContext.Provider>
            </UserContext.Provider>
          </div>
        </RainbowkitProvider>
      </Client>
    </ThemeProvider>
  );
}
