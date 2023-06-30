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
  const [posts, setPosts] = useState<{ content: string; created_at: Date }[]>(
    []
  );
  const [timeline, setTimeline] = useState<
    { content: string; created_at: Date; author: string; authorImage: string }[]
  >([]);

  const tokenId = user?.user?.tokenId ?? "";
  const tokenAddress = user?.user?.tokenAddress ?? "";

  const { data: walletClient } = useWalletClient();
  const tokenboundClient = useMemo(() => {
    return new TokenboundClient({
      walletClient: walletClient!,
      chainId: 1,
    });
  }, [walletClient]);

  const tbaAddress = useMemo(() => {
    if (!tokenboundClient || !user?.user?.tokenAddress || !user?.user?.tokenId)
      return "";
    return tokenboundClient.getAccount({
      tokenContract: user?.user?.tokenAddress!,
      tokenId: user?.user?.tokenId!,
    });
  }, [tokenboundClient, user?.user?.tokenAddress, user?.user?.tokenId]);

  const projectType = getCharacterType(user?.user?.tokenAddress ?? "");

  useEffect(() => {
    if (user && user.user) {
      (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends`
        );
        const data = await res.json();
        if (data && data.friends) {
          setFriends(
            data.friends
              .filter((f: any) => f.username !== user?.user?.username)
              .map((f: any) => ({
                username: f.username,
                image: f.profile_image,
              }))
          );
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    if (!user?.user || !user?.user?.id) return;

    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/all?author_id=${user?.user?.id}`
      );
      const data = await res.json();
      if (data && data.posts) {
        setPosts(
          data.posts.map((p: any) => ({
            content: p.content,
            created_at: new Date(p.created_at),
          }))
        );
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/all`
      );
      const data = await res.json();
      if (data && data.posts) {
        setTimeline(
          data.posts.map((p: any) => ({
            content: p.content,
            created_at: new Date(p.created_at),
            author: p.username,
            authorImage: p.profile_image,
          }))
        );
      }
    })();
  }, [user]);

  if (!user?.user) return null;

  return (
    <Window
      title="AquaNet Explorer"
      close={() => page?.setPage("none")}
      icon={<Explorer size={20} />}
      width={1000}
      height={700}
    >
      <div className="m-[2px] flex grow justify-center overflow-scroll bg-white">
        <div className="w-[800px]">
          <Image
            src="/header_mypuddle.png"
            alt="MyPuddle header"
            width={800}
            height={100}
          />

          <div className="mb-4 flex gap-8 bg-[#6699CC] px-12 py-1 text-white">
            <div className="cursor-pointer" onClick={() => setMpPage("me")}>
              My Profile
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setMpPage("timeline")}
            >
              Timeline
            </div>
          </div>

          {mpPage === "me" && (
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 flex flex-col gap-4">
                <h3 className="text-lg font-bold">{user?.user?.username}</h3>
                <div className="flex items-start gap-4">
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

              <div className="col-span-2 flex flex-col gap-4">
                <div>
                  <div className="bg-[#FFCC99]">
                    <span className="p-2 font-bold">
                      {user?.user?.username}&apos;s Friends
                    </span>
                  </div>

                  <div className="grid grid-cols-4 items-center justify-center p-4">
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

                <div>
                  <div className="bg-[#FFCC99]">
                    <span className="p-2 font-bold">
                      About {user?.user?.username}
                    </span>
                  </div>

                  <div className="grid p-4">{user?.user?.bio}</div>
                </div>

                <div>
                  <div className="bg-[#87A7E8]">
                    <span className="p-2 font-bold">
                      {user?.user?.username}&apos;s Posts
                    </span>
                  </div>
                  <div className="[&>*:nth-child(even)]:bg-[#8DDCED] [&>*:nth-child(odd)]:bg-[#C8F0F9]">
                    {posts.map((post, index) => (
                      <div className="gap-r flex flex-col p-4" key={index}>
                        <span className="font-bold">
                          {post.created_at.toLocaleString()}
                        </span>
                        <span>{post.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mpPage === "timeline" && (
            <div>
              <div className="bg-[#87A7E8]">
                <span className="p-2 font-bold">Recent Posts</span>
              </div>
              <div className="[&>*:nth-child(even)]:bg-[#8DDCED] [&>*:nth-child(odd)]:bg-[#C8F0F9]">
                {timeline.map((post, index) => (
                  <div className="flex" key={index}>
                    <div className="m-4 flex flex-col items-center justify-center">
                      <Image
                        src={post.authorImage}
                        width={80}
                        height={80}
                        alt={post.author}
                      />
                      <span>{post.author}</span>
                    </div>
                    <div className="gap-r flex flex-col p-4">
                      <span className="font-bold">
                        {post.created_at.toLocaleString()}
                      </span>
                      {post.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default MyPuddle;
