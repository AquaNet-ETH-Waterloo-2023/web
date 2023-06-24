import { Button, Window as R95Window, WindowHeader } from "react95";

interface Props {
  address: string;
}

const FirstStep = ({ address }: Props) => {
  return (
    <R95Window
      className="window"
      style={{
        width: 300,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button style={{ width: 100 }}>Sign In</Button>
      <Button style={{ width: 100 }}>Sign Up</Button>
    </R95Window>
  );
};

export default FirstStep;
