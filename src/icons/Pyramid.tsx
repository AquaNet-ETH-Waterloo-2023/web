import Image from "next/image";

interface Props {
  size?: number;
}

const Pyramid = ({ size = 24 }: Props) => {
  return (
    <Image src="/icon_pyramid.png" alt="pyramid" width={size} height={size} />
  );
};

export default Pyramid;
