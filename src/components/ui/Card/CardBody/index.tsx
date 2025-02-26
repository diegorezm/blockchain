import styles from "./cardbody.module.css";

type Props = {
  children: React.ReactNode;
};

export function CardBody({ children }: Props) {
  return <div className={styles.card_body}>{children}</div>;
}
