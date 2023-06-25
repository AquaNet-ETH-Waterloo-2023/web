import Image from "next/image";

interface Props {
  size?: number;
}

const Post = ({ size = 24 }: Props) => {
  return <Image src="/icon_post.png" alt="post" width={size} height={size} />;
};

export default Post;
