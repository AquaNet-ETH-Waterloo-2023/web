import Image from "next/image";

interface Props {
  size?: number;
}

const Explorer = ({ size = 24 }: Props) => {
  return (
    <Image
      src="/icon_explorer.png"
      alt="blue avatar"
      width={size}
      height={size}
    />
  );
};

export default Explorer;
