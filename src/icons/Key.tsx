import Image from "next/image";

interface Props {
  size?: number;
}

const Key = ({ size = 24 }: Props) => {
  return (
    <Image src="/icon_key.png" alt="key" width={size} height={size} />
  );
};

export default Key;
