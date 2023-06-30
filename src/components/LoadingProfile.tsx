import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ProgressBar } from "react95";

import Folder from "@/icons/Folder";
import Loading from "@/icons/Loading";
import LoadingStatic from "@/icons/LoadingStatic";
import Post from "@/icons/Post";
import Pyramid from "@/icons/Pyramid";
import Smiley from "@/icons/Smiley";
import { User, UserContext } from "@/pages/_app";

import { NFT } from "./UserCreate";
import Window from "./Window";

interface Props {
  nft: NFT;
}

const LoadingProfile = ({ nft }: Props) => {
  const [percent, setPercent] = useState(0);

  const user = useContext(UserContext);
  const tokenAddress = nft.tokenNfts.address;
  const tokenId = nft.tokenNfts.tokenId;
  const name = nft.tokenNfts.metaData.name;
  const image = nft.tokenNfts.contentValue.image?.small ?? "/icon_avatar.png";

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((previousPercent) => {
        if (previousPercent === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(previousPercent + diff, 100);
      });
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    // check for posts
    const timer = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?token_address=${tokenAddress}&token_id=${tokenId}`
        );
        const data = await response.json();

        if (data && data.posts && data.posts.length > 0) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/personality?token_address=${tokenAddress}&token_id=${tokenId}`
          );
          const { personality } = await response.json();
          const f: User = {
            id: personality.id,
            tokenAddress,
            tokenId,
            name,
            image,
            bio: personality.bio,
            created_at: personality.created_at,
            username: personality.username,
            tone: personality.tone,
          };
          user?.setUser(f);
          clearInterval(timer);
          return;
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [tokenAddress, tokenId, name, image, user]);

  return (
    <Window height={500} width={800} icon={<Pyramid />} title="AquaNet Online">
      <div className="flex grow flex-col items-center justify-center gap-4 p-4">
        <div className="m-4 flex flex-col items-center gap-4">
          <Image src={image} alt={name} width={140} height={140} />
          {name}
        </div>

        <div className="flex w-full items-center justify-between gap-8">
          <Folder size={64} />
          {percent < 50 ? <Loading /> : <LoadingStatic />}
          <span style={percent < 50 ? { opacity: 0.2 } : {}}>
            <Smiley size={64} />
          </span>
          {percent > 50 ? <Loading /> : <LoadingStatic />}
          <span style={percent < 100 ? { opacity: 0.2 } : {}}>
            <Post size={64} />
          </span>
        </div>

        <ProgressBar variant="tile" value={Math.floor(percent)} />

        {percent > 99
          ? "Finishing up..."
          : percent > 50
          ? "Creating first posts..."
          : "Generating personality..."}
      </div>
    </Window>
  );
};

export default LoadingProfile;
