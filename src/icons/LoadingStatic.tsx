import Image from "next/image";

interface Props {
  size?: number;
}

const LoadingStatic = ({}: Props) => {
  return <Image src="/loading_static.gif" alt="folder" width={160} height={32} />;
};

export default LoadingStatic;
