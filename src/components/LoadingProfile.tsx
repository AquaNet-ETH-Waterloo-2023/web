import Image from "next/image";
import { useEffect, useState } from "react";
import { ProgressBar } from "react95";

import Folder from "@/icons/Folder";
import Loading from "@/icons/Loading";
import LoadingStatic from "@/icons/LoadingStatic";
import Post from "@/icons/Post";
import Pyramid from "@/icons/Pyramid";
import Smiley from "@/icons/Smiley";

import { NFT } from "./UserCreate";
import Window from "./Window";

interface Props {
  nft: NFT;
}

const LoadingProfile = ({ nft }: Props) => {
  const [percent, setPercent] = useState(0);

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

  return (
    <Window height={500} width={800} icon={<Pyramid />} title="AquaNet Online">
      <div className="flex grow flex-col items-center justify-center gap-4 p-4">
        <div className="m-4 flex flex-col items-center gap-4">
          <Image
            src={nft.tokenNfts.contentValue.image.small}
            alt={nft.tokenNfts.metaData.name}
            width={140}
            height={140}
          />
          {nft.tokenNfts.metaData.name}
        </div>

        <div className="flex items-center gap-8 w-full justify-between">
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
