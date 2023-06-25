import { TokenboundClient } from "@tokenbound/sdk";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { useWalletClient } from "wagmi";

import Explorer from "@/icons/Explorer";
import { PageContext, User, UserContext } from "@/pages/_app";

import Window from "./Window";

type MyPuddlePage = "me" | "timeline";

const getCharacterType = (contractAddress: string): string => {
  if (
    contractAddress.toLowerCase() ===
    "0x3Fe1a4c1481c8351E91B64D5c398b159dE07cbc5".toLowerCase()
  ) {
    return "SupDucks";
  } else if (
    contractAddress.toLowerCase() ===
    "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D".toLowerCase()
  ) {
    return "BoredApes";
  } else if (
    contractAddress.toLowerCase() ===
    "0x57a204aa1042f6e66dd7730813f4024114d74f37".toLowerCase()
  ) {
    return "CyberKongz";
  } else if (
    contractAddress.toLowerCase() ===
    "0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6".toLowerCase()
  ) {
    return "Cryptoadz";
  } else {
    return "Unknown";
  }
};

const MyPuddle = () => {
  const [mpPage, setMpPage] = useState<MyPuddlePage>("me");
  const page = useContext(PageContext);
  const user = useContext(UserContext);
  const [friends, setFriends] = useState<{ username: string; image: string }[]>(
    []
  );

  const tokenId = user?.user?.tokenId ?? "";
  const tokenAddress = user?.user?.tokenAddress ?? "";

  const { data: walletClient } = useWalletClient();
  const tokenboundClient = useMemo(() => {
    return new TokenboundClient({
      walletClient: walletClient!,
      chainId: 1,
    });
  }, [walletClient]);

  const tbaAddress = tokenboundClient.getAccount({
    tokenContract: user?.user?.tokenAddress ?? "",
    tokenId: user?.user?.tokenId ?? "",
  });

  const projectType = getCharacterType(user?.user?.tokenAddress ?? "");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/friends`);
      const data = await res.json();
      console.log(JSON.stringify(data, null, 2));
      setFriends(
        data.friends
          .map((f: any) => ({
            username: f.username,
            image: f.profile_image,
          }))
          .filter((f: any) => f.username !== user?.user?.username)
      );
    })();
  }, [user]);

  return (
    <Window
      title="AquaNet Explorer"
      close={() => page?.setPage("none")}
      icon={<Explorer size={20} />}
      width={1000}
      height={700}
    >
      <div className="m-[2px] flex grow justify-center bg-white">
        <div className="w-[800px]">
          <Image
            src="/header_mypuddle.png"
            alt="MyPuddle header"
            width={800}
            height={100}
          />

          <div className="grid grid-cols-3">
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-lg font-bold">{user?.user?.username}</h3>
              <div className="flex gap-4">
                <Image
                  src={user?.user?.image ?? "/aquanet_logo.png"}
                  width={120}
                  height={120}
                  alt={user?.user?.name ?? ""}
                />
                <div className="flex flex-col gap-4">
                  <Link
                    href={`https://tokenbound.org/assets/ethereum/${tokenAddress}/${tokenId}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="font-bold text-blue-800"
                  >
                    {tbaAddress.slice(0, 6)}...{tbaAddress.slice(-4)}
                  </Link>
                  <Link
                    href={`https://opensea.io/collection/${projectType.toLowerCase()}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="font-bold text-blue-800"
                  >
                    {projectType}
                  </Link>
                  Last Login: Today
                </div>
              </div>

              <div className="bg-[#6699CC]">
                <div className="px-2 pt-1 font-bold">
                  {user?.user?.username}&apos;s Personality
                </div>
                <div className="m-1 bg-[#D5E8FB] p-2">{user?.user?.tone}</div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="bg-[#FFCC99]">
                <span className="p-2 font-bold">
                  {user?.user?.username}&apos;s Puddle
                </span>
              </div>

              <div className="grid grid-cols-4 grid-rows-2 items-center justify-center p-4">
                {friends.map((friend) => (
                  <div
                    key={friend.username}
                    className="flex flex-col items-center"
                  >
                    <Image
                      src={friend.image}
                      width={80}
                      height={80}
                      alt={friend.username}
                    />
                    {friend.username}
                  </div>
                ))}
              </div>

              <div className="bg-[#FFCC99]">
                <span className="p-2 font-bold">
                  About {user?.user?.username}
                </span>
              </div>

              <div className="grid grid-cols-4 grid-rows-2 items-center justify-center p-4">
                {friends.map((friend) => (
                  <div
                    key={friend.username}
                    className="flex flex-col items-center"
                  >
                    <Image
                      src={friend.image}
                      width={80}
                      height={80}
                      alt={friend.username}
                    />
                    {friend.username}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default MyPuddle;
