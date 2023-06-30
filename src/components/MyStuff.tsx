import Image from "next/image";
import { useContext, useMemo } from "react";

import { getAllNFTs, getERC20s } from "@/gql/queries";
import Folder from "@/icons/Folder";
import { PageContext, UserContext } from "@/pages/_app";
import { useAirstackQuery } from "@/util/airstack";

import { NFT } from "./UserCreate";
import Window from "./Window";

interface Props {
  tbaAddress: string;
}

type ERC20 = {
  token: {
    name: string;
    logo: {
      small: string | null;
    };
  };
  formattedAmount: string;
};

const MyStuff = ({ tbaAddress }: Props) => {
  const user = useContext(UserContext);
  const page = useContext(PageContext);
  const nftData = useAirstackQuery(getAllNFTs, { owner: tbaAddress });
  const erc20Data = useAirstackQuery(getERC20s, { owner: tbaAddress });

  const nfts: Array<NFT> = useMemo(() => {
    return nftData.data?.TokenBalances?.TokenBalance ?? [];
  }, [nftData]);

  const erc20s: Array<ERC20> = useMemo(() => {
    return erc20Data.data?.TokenBalances?.TokenBalance ?? [];
  }, [erc20Data]);

  return (
    <Window
      title={`${user?.user?.username}'s Stuff`}
      icon={<Folder size={20} />}
      close={() => page?.setPage("none")}
      height={460}
      width={600}
    >
      <div className="m-[2px] grow gap-4 bg-white p-4">
        <div>
          <h2 className="border-b">COLLECTIBLES</h2>
          <div className="grid grid-cols-4 items-center justify-center gap-4 p-4">
            {nfts.map((nft: NFT) => {
              return (
                <div
                  key={nft.tokenNfts.metaData.name}
                  className="flex flex-col items-center gap-1"
                >
                  <Image
                    src={nft.tokenNfts.contentValue.image?.small ?? "/icon_avatar.png"}
                    alt={`#${nft.tokenNfts.metaData.name}`}
                    onError={(e) => {
                      e.currentTarget.src = "/icon_avatar.png";
                    }}
                    width={100}
                    height={100}
                  />
                  {nft.tokenNfts.metaData.name}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="border-b">ASSETS</h2>
          <div className="grid grid-cols-4 items-center justify-center p-4">
            {erc20s.map((erc20: ERC20) => {
              return (
                <div
                  key={erc20.token.name}
                  className="flex flex-col items-center gap-1"
                >
                  <Image
                    src={erc20.token.logo?.small ?? "/apecoin.png"}
                    alt={`#${erc20.token.name}`}
                    key={erc20.token.name}
                    onError={(e) => {
                      e.currentTarget.src = "/apecoin.png";
                    }}
                    width={100}
                    height={100}
                  />
                  {erc20.token.name} ({erc20.formattedAmount})
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Window>
  );
};

export default MyStuff;
