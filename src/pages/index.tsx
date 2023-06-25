import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "react95";
import { useAccount } from "wagmi";

import FirstStep from "@/components/FirstStep";
import Window from "@/components/Window";
import WaterDrop from "@/icons/WaterDrop";

import { UserContext } from "./_app";

export default function Home() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const user = useContext(UserContext);

  return (
    <div className="flex h-full  w-full items-center justify-center">
      {address ? (
        user && !user.user ? (
          <FirstStep address={address} />
        ) : (
          <>{user?.user?.name}</>
        )
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
    </div>
  );
}
