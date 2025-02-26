import styles from "./signin.module.css";

import { CardBody, CardRoot, CardTitle } from "@/components/ui/Card";
import { SignInForm } from "./form";

export default function SignIn() {
  return (
    <div className={styles.page}>
      <CardRoot variant="outline">
        <CardTitle>
          <h1>Sign In</h1>
          <p> Enter your credentials to access your account</p>
        </CardTitle>
        <CardBody>
          <SignInForm />
        </CardBody>
      </CardRoot>
    </div>
  );
}
