import styles from "./cardtitle.module.css";

type Props = {
  children: React.ReactNode;
};
export function CardTitle({ children }: Props) {
  return <div className={styles.card_title}>{children}</div>;
}
