import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Button } from "react95";
import { useAccount } from "wagmi";

import Window from "@/components/Window";

export default function Home() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <div className="flex h-full  w-full items-center justify-center">
      {address ? (
        <>{address}</>
      ) : (
        <Window>
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
