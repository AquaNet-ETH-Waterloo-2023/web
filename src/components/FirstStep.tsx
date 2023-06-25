import { useState } from "react";
import { Button } from "react95";

import Avatar from "@/icons/Avatar";
import Key from "@/icons/Key";
import WaterDrop from "@/icons/WaterDrop";

import UserCreate from "./UserCreate";
import UserLogin from "./UserLogin";
import Window from "./Window";

interface Props {
  address: string;
}

type Step = "first" | "login" | "new";

const FirstStep = ({ address }: Props) => {
  const [step, setStep] = useState<Step>("first");

  return step === "first" ? (
    <Window
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        width: "100%",
        height: "100%",
      }}
      icon={<WaterDrop />}
      title="AquaNet"
      width={450}
      height={300}
    >
      <div className="flex grow justify-around">
        <span className="flex flex-col items-center justify-center gap-4">
          <Key size={80} />
          <Button
            style={{ width: 150, fontSize: 20 }}
            onClick={() => setStep("login")}
          >
            Sign In
          </Button>
        </span>
        <span className="flex flex-col items-center justify-center gap-4">
          <Avatar size={80} />
          <Button
            style={{ width: 150, fontSize: 20 }}
            onClick={() => setStep("new")}
          >
            New Account
          </Button>
        </span>
      </div>
    </Window>
  ) : step === "login" ? (
    <UserLogin address={address} back={() => setStep("first")} />
  ) : step === "new" ? (
    <UserCreate address={address} back={() => setStep("first")} />
  ) : null;
};

export default FirstStep;
