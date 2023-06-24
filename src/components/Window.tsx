import { Button, Window as R95Window, WindowHeader } from "react95";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.desktopBackground};
`;

interface Props {
  children: React.ReactNode;
}

const Window = ({ children }: Props) => {
  return (
    <Wrapper>
      <R95Window className="window" style={{ width: 600, height: 400 }}>
        <WindowHeader className="window-title flex items-center justify-between">
          <span>AquaNet</span>
          {/* <Button disabled> */}
          {/*   <IoCloseSharp size={22} /> */}
          {/* </Button> */}
        </WindowHeader>
        {children}
      </R95Window>
    </Wrapper>
  );
};

export default Window;
