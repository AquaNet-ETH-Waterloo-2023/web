import Image from "next/image";
import { MenuList, MenuListItem, Separator } from "react95";
import { useAccount, useDisconnect } from "wagmi";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const StartMenu = ({ open, setOpen }: Props) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return open ? (
    <div className="absolute bottom-[100%] left-0 flex">
      <div className="bg-[#012463]">
        <Image
          src="/aquanet_start_menu.png"
          width={40}
          height={200}
          alt="AquaNet start menu"
        />
      </div>
      <MenuList
        onClick={() => setOpen(false)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <MenuListItem>
          <span role="img" aria-label="👨‍💻">
            👨‍💻
          </span>
          Profile
        </MenuListItem>
        <MenuListItem>
          <span role="img" aria-label="📁">
            📁
          </span>
          My account
        </MenuListItem>
        <Separator style={{ marginTop: "auto" }} />
        <MenuListItem disabled={!address} onClick={() => disconnect()}>
          <span role="img" aria-label="🔙">
            🔙
          </span>
          Logout
        </MenuListItem>
      </MenuList>
    </div>
  ) : null;
};

export default StartMenu;
