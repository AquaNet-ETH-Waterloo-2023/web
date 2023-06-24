import { useAccountModal } from "@rainbow-me/rainbowkit";
import BlockiesSvg from "blockies-react-svg";
import Image from "next/image";
import { useState } from "react";
import { AppBar, Button, TextInput, Toolbar } from "react95";
import { styled } from "styled-components";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

import StartMenu from "./StartMenu";

interface Props {}

const Input = styled(TextInput)`
  &::before {
    width: 100%;
    height: 100%;
  }
`;

const Navbar = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    enabled: !!address,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: !!ensName,
  });
  const { openAccountModal } = useAccountModal();

  return (
    <AppBar position="bottom">
      <Toolbar className="justify-between">
        <div className="relative inline-block flex w-full justify-between">
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold", padding: "0.5rem 1rem" }}
          >
            {/* <img */}
            {/*   src={logoIMG} */}
            {/*   alt="react95 logo" */}
            {/*   style={{ height: "20px", marginRight: 4 }} */}
            {/* /> */}
            Start
          </Button>
          <StartMenu open={open} setOpen={setOpen} />
          <div className="flex items-center gap-4">
            {ensAvatar ? (
              <span onClick={openAccountModal}>
                <Image
                  src={ensAvatar}
                  alt="Profile image"
                  width={30}
                  height={30}
                />
              </span>
            ) : address ? (
              <span onClick={openAccountModal}>
                <BlockiesSvg address={address} size={8} scale={3} />
              </span>
            ) : (
              <></>
            )}
            <Input
              disabled
              placeholder={ensName ?? address ?? "No wallet connected"}
              style={{}}
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
