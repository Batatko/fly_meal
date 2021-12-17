import styles from "./Feed.module.css";

interface Props {
  children?: React.ReactNode;
}

const Feed: React.FC<Props> = ({ children }: Props) => {
  return <div className={styles.feed}>{children}</div>;
};

export default Feed;
