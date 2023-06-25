import { Fragment } from "react";
import { Button, Window as R95Window, WindowHeader } from "react95";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.desktopBackground};
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  height?: number;
  width?: number;
  title?: string;
  close?: () => void;
}

const Window = ({
  icon,
  children,
  height = 400,
  width = 600,
  title = "AquaNet",
  close,
  ...props
}: Props) => {
  return (
    <Wrapper>
      <R95Window
        className="window"
        style={{
          width: width,
          height: height,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <WindowHeader className="window-title flex items-center justify-between">
          <span className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </span>
          {close && (
            <Button onClick={close}>
              <IoCloseSharp size={22} />
            </Button>
          )}
        </WindowHeader>
        <Fragment {...props}>{children}</Fragment>
      </R95Window>
    </Wrapper>
  );
};

export default Window;
