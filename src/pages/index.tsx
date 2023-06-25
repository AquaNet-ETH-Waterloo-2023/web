import { useConnectModal } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button } from "react95";
import { useAccount } from "wagmi";

import FirstStep from "@/components/FirstStep";
import MyPuddle from "@/components/MyPuddle";
import Window from "@/components/Window";
import Folder from "@/icons/Folder";
import MyPuddleDesktop from "@/icons/MyPuddleDesktop";
import WaterDrop from "@/icons/WaterDrop";

import { PageContext, UserContext } from "./_app";

export default function Home() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const user = useContext(UserContext);
  const page = useContext(PageContext);

  return (
    <div className="flex h-full  w-full items-center justify-center">
      <Head>
        <title>AquaNet Portal</title>
      </Head>
      {address ? (
        user && !user.user && <FirstStep address={address} />
      ) : (
        <Window icon={<WaterDrop />}>
          <div className="flex flex-col items-center justify-between gap-8">
            <Image
              src="/aquanet_welcome.png"
              width={550}
              height={300}
              alt="Welcome to AquaNet"
            />
            <Button onClick={openConnectModal}>Connect Wallet</Button>
          </div>
        </Window>
      )}
      {user && user.user && (
        <div className="absolute left-0 top-0 flex flex-col gap-4 p-4">
          <span
            onClick={() => page?.setPage("stuff")}
            className="cursor-pointer"
          >
            <Folder size={64} />
            <p className="max-w-[64px] text-center text-white">
              {user.user.username}&apos;s Stuff
            </p>
          </span>
          <span
            onClick={() => page?.setPage("mypuddle")}
            className="cursor-pointer"
          >
            <MyPuddleDesktop size={64} />
            <p className="max-w-[64px] text-center text-white">myPuddle</p>
          </span>
        </div>
      )}
      {page?.page === "stuff" ? (
        <>stuff</>
      ) : page?.page === "mypuddle" ? (
        <MyPuddle />
      ) : null}
    </div>
  );
}
