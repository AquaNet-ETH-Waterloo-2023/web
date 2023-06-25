import Image from "next/image";
import { useContext } from "react";
import { MenuList, MenuListItem, Separator } from "react95";
import { styled } from "styled-components";
import { useAccount, useDisconnect } from "wagmi";

import Folder from "@/icons/Folder";
import Logout from "@/icons/Logout";
import MyPuddle from "@/icons/MyPuddle";
import Settings from "@/icons/Settings";
import { UserContext } from "@/pages/_app";

const MenuItem = styled(MenuListItem)`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`;

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const StartMenu = ({ open, setOpen }: Props) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const user = useContext(UserContext);

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
        style={{
          display: "flex",
          flexDirection: "column",
          width: 250,
          height: 300,
        }}
      >
        <div className="flex items-center gap-2 p-2">
          <Image
            src={user?.user?.image ?? "/aquanet_logo.png"}
            width={40}
            height={40}
            alt={user?.user?.name ?? ""}
          />
          {user?.user?.name ?? "AquaNet"}
        </div>
        <Separator />
        <MenuItem>
          <Folder />
          My Stuff
        </MenuItem>
        <MenuItem>
          <MyPuddle />
          myPuddle
        </MenuItem>
        <Separator style={{ marginTop: "auto" }} />
        <MenuItem>
          <Settings />
          Settings
        </MenuItem>
        <MenuItem disabled={!address} onClick={() => user?.setUser(null)}>
          <Logout />
          Logout
        </MenuItem>
      </MenuList>
    </div>
  ) : null;
};

export default StartMenu;
