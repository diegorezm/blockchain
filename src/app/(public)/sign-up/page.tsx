import styles from "./signup.module.css";

import { SignUpForm } from "./form";
import { CardBody, CardRoot, CardTitle } from "@/components/ui/Card";

export default function SignUpPage() {
  return (
    <div className={styles.page}>
      <CardRoot variant="secondary">
        <CardTitle>
          <h1>Sign up</h1>
          <p>Enter your details to create your account</p>
        </CardTitle>
        <CardBody>
          <SignUpForm />
        </CardBody>
      </CardRoot>
    </div>
  );
}
