import Image from "next/image";

interface Props {
  size?: number;
}

const Avatar = ({ size = 24 }: Props) => {
  return (
    <Image
      src="/icon_avatar.png"
      alt="blue avatar"
      width={size}
      height={size}
    />
  );
};

export default Avatar;
