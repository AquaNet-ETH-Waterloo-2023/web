import Image from "next/image";

interface Props {
  size?: number;
}

const MyPuddleDesktop = ({ size = 24 }: Props) => {
  return (
    <Image
      src="/icon_mypuddle_desktop.png"
      alt="MyPuddle desktop app"
      width={size}
      height={size}
    />
  );
};

export default MyPuddleDesktop;
