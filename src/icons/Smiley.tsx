import Image from "next/image";

interface Props {
  size?: number;
}

const Smiley = ({ size = 24 }: Props) => {
  return (
    <Image src="/icon_smiley.png" alt="smiley" width={size} height={size} />
  );
};

export default Smiley;
