import Image from "next/image";

interface Props {
  size?: number;
}

const WaterDrop = ({ size = 24 }: Props) => {
  return (
    <Image src="/icon_drop.png" alt="water drop" width={size} height={size} />
  );
};

export default WaterDrop;
