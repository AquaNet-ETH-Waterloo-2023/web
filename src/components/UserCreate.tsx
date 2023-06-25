import { TokenboundClient } from "@tokenbound/sdk";
import Image from "next/image";
import { useState } from "react";
import { Button } from "react95";
import { twMerge } from "tailwind-merge";
import { useWalletClient } from "wagmi";

import { getNFTs } from "@/gql/queries";
import WaterDrop from "@/icons/WaterDrop";
import { useAirstackQuery } from "@/util/airstack";

import Window from "./Window";

interface Props {
  address: string;
  back: () => void;
}

type NFT = {
  tokenNfts: {
    address: string;
    tokenId: string;
    metaData: {
      name: string;
    };
    contentValue: {
      image: {
        small: string;
      };
    };
  };
};

const UserCreate = ({ address, back }: Props) => {
  const [selectedId, setSelectedId] = useState("");
  const { data: walletClient } = useWalletClient();
  const data = useAirstackQuery(getNFTs, { owner: address });
  const nfts = data.data?.TokenBalances?.TokenBalance ?? [];
  // repeat the array 20 times
  const nfts20 = [...Array(20)].flatMap(() => nfts);

  return (
    <Window height={500} width={800} icon={<WaterDrop />}>
      <div className="relative m-[2px] flex grow bg-white">
        <Image
          src="/gradient_blue.png"
          alt=""
          width={120}
          height={120}
          className="absolute left-0 top-0 z-0"
        />
        <div className="relative z-10 flex">
          <div className="m-6">
            <span className="mt-4 flex gap-4 p-4">
              <Image
                src="/blue_avatar.png"
                alt="blue avatar"
                width={64}
                height={64}
              />
              <h2 className="w-[150px] text-center text-2xl font-bold">
                Select Your User
              </h2>
            </span>
            <Image
              src="/blue_separator.png"
              alt="blue separator"
              width={250}
              height={3}
            />
            <p className="w-[250px] p-6 text-center">
              Select which NFT you would like to login as.
            </p>
          </div>
        </div>

        <div className="grid max-h-[380px] grid-cols-3 gap-4 overflow-scroll p-4">
          {nfts20.map((nft: NFT, index) => {
            const tokenboundClient = new TokenboundClient({
              walletClient: walletClient!,
              chainId: 1,
            });

            const tokenBoundAccount = tokenboundClient.getAccount({
              tokenContract: nft.tokenNfts.address,
              tokenId: nft.tokenNfts.tokenId,
            });

            console.log(tokenBoundAccount);

            return (
              <Image
                src={nft.tokenNfts.contentValue.image.small}
                alt={`#${nft.tokenNfts.metaData.name}`}
                key={nft.tokenNfts.metaData.name}
                width={140}
                height={140}
                className={twMerge(
                  "cursor-pointer",
                  selectedId === index.toString() && "border-4 border-blue-500"
                )}
                onClick={() => setSelectedId(index.toString())}
              />
            );
          })}
        </div>
      </div>

      <div className="m-4 flex justify-center gap-4">
        <Button style={{ width: 200 }} onClick={back}>
          Back
        </Button>
        <Button style={{ width: 200 }}>Create New Account</Button>
      </div>
    </Window>
  );
};

export default UserCreate;
