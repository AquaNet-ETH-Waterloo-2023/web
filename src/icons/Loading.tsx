import Image from "next/image";

interface Props {
  size?: number;
}

const Loading = ({}: Props) => {
  return <Image src="/loading.gif" alt="folder" width={160} height={32} />;
};

export default Loading;
