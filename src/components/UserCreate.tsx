import { TokenboundClient } from "@tokenbound/sdk";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "react95";
import { twMerge } from "tailwind-merge";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import abi from "@/eth/aquanet-abi";
import { getNFTs } from "@/gql/queries";
import WaterDrop from "@/icons/WaterDrop";
import { User, UserContext } from "@/pages/_app";
import { useAirstackQuery } from "@/util/airstack";

import LoadingProfile from "./LoadingProfile";
import Window from "./Window";

function isDeepEqual(obj1: any, obj2: any): boolean {
  // Check if the objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Check if both objects are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }

    for (let i = 0; i < obj1.length; i++) {
      if (!isDeepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }

    return true;
  }

  // Check if both objects are objects
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!isDeepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  // Check for primitive values
  return obj1 === obj2;
}

function removeDuplicates(arr: any[]): any[] {
  return arr.filter((value, index, self) => {
    for (let i = index + 1; i < self.length; i++) {
      if (isDeepEqual(value, self[i])) {
        return false;
      }
    }
    return true;
  });
}

interface Props {
  address: string;
  back: () => void;
}

export type NFT = {
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

const UserLogin = ({ address, back }: Props) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const { data: walletClient } = useWalletClient();
  const data = useAirstackQuery(getNFTs, { owner: address });
  const nfts: Array<NFT> = useMemo(() => {
    return data.data?.TokenBalances?.TokenBalance ?? [];
  }, [data]);
  const [nftsWithAccounts, setNftsWithAccounts] = useState<Array<NFT>>([]);
  const [creating, setCreating] = useState<boolean>(false);

  const publicClient = usePublicClient();
  const tokenboundClient = useMemo(() => {
    return new TokenboundClient({
      walletClient: walletClient!,
      chainId: 1,
    });
  }, [walletClient]);

  useEffect(() => {
    nfts.forEach(async (nft) => {
      const tokenBoundAccount = tokenboundClient.getAccount({
        tokenContract: nft.tokenNfts.address,
        tokenId: nft.tokenNfts.tokenId,
      });

      const hasProfile = await publicClient.readContract({
        address: "0x7bc5E31E7422c2fc4cF2419d8E01c303F7a1dBBA",
        abi: [
          {
            constant: true,
            inputs: [
              {
                name: "_owner",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                name: "balance",
                type: "uint256",
              },
            ],
            payable: false,
            type: "function",
          },
        ],
        functionName: "balanceOf",
        args: [tokenBoundAccount],
      });

      if (!hasProfile) {
        setNftsWithAccounts((prev) => removeDuplicates([...prev, nft]));
      }
    });

    return () => {
      setNftsWithAccounts([]);
    };
  }, [nfts, tokenboundClient, publicClient]);

  const handleClick = useCallback(async () => {
    if (!walletClient) return;
    const selected = nfts[parseInt(selectedId)];
    if (!selected) return;

    try {
      const { request } = await publicClient.simulateContract({
        account: address as `0x${string}`,
        address: "0x7bc5E31E7422c2fc4cF2419d8E01c303F7a1dBBA",
        abi,
        functionName: "safeMint",
        args: [
          selected.tokenNfts.address as `0x${string}`,
          BigInt(selected.tokenNfts.tokenId),
        ],
      });
      await walletClient.writeContract(request);
    } catch (e) {
      console.error(e);
    }
    setCreating(true);
  }, [address, walletClient, nfts, selectedId, publicClient]);

  if (!creating) {
    return (
      <Window
        height={500}
        width={800}
        icon={<WaterDrop />}
        title="AquaNet - New Account"
      >
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
                  Choose NFT
                </h2>
              </span>
              <Image
                src="/blue_separator.png"
                alt="blue separator"
                width={250}
                height={3}
              />
              <p className="w-[250px] p-6 text-center">
                Choose the NFT that you would like to make an account for.
              </p>
            </div>
          </div>

          <div className="grid h-[380px] grid-cols-3 gap-4 overflow-scroll p-4">
            {nftsWithAccounts.map((nft: NFT, index) => {
              return (
                <Image
                  src={nft.tokenNfts.contentValue.image.small}
                  alt={`#${nft.tokenNfts.metaData.name}`}
                  key={nft.tokenNfts.metaData.name}
                  width={140}
                  height={140}
                  className={twMerge(
                    "cursor-pointer",
                    selectedId === index.toString() &&
                      "border-4 border-blue-500"
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
          <Button
            style={{ width: 200 }}
            disabled={!selectedId}
            onClick={handleClick}
          >
            Create Account
          </Button>
        </div>
      </Window>
    );
  } else {
    return <LoadingProfile nft={nfts[parseInt(selectedId)]} />;
  }
};

export default UserLogin;
