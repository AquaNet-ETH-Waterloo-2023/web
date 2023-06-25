import Image from "next/image";

interface Props {
  size?: number;
}

const Folder = ({ size = 24 }: Props) => {
  return (
    <Image src="/icon_folder.png" alt="folder" width={size} height={size} />
  );
};

export default Folder;
