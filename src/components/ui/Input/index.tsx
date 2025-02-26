import styles from "./input.module.css";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input({ ...props }: Props) {
  return <input {...props} className={styles.input} />;
}
