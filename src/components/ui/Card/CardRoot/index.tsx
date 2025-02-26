import styles from "./cardroot.module.css";

type Props = {
  variant?: "outline" | "primary" | "secondary";
  children?: React.ReactNode;
};

export function CardRoot({ children, variant = "outline" }: Props) {
  const classNames = `${styles.card} ${styles[`card-${variant}`]}`;
  console.log(classNames);
  return <div className={classNames}>{children}</div>;
}
