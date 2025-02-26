"use client";

import { useState } from "react";
import styles from "./erroralert.module.css";

import { CircleX } from "lucide-react";

type Props = {
  message: string;
};

export default function ErrorAlert({ message }: Props) {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className={styles.error_card}>
      <CircleX onClick={() => setShow(false)} className={styles.x_icon}/>
      <p>{message}</p>
    </div>
  );
}
