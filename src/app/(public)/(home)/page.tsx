import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Clock, Coins, Shield } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Bank-grade encryption for all your trades.",
    type: "primary",
  },
  {
    icon: Clock,
    title: "24/7 Trading",
    description: "Trade cryptocurrencies anytime, anywhere.",
    type: "secondary",
  },
  {
    icon: Coins,
    title: "Low Fees",
    description: "Competitive rates for all transactions.",
    type: "muted",
  },
];

export default function Home() {
  return (
    <>
      <section id="hero" className={styles.hero}>
        <div className={styles.hero_txt}>
          <h1>Welcome to crypto bank!</h1>
          <p>
            Experience the future of finance with our cutting-edge blockchain
            platform. Empower yourself with decentralized solutions and take
            charge of your financial destiny.
          </p>
          <Button>
            <Link href="/sign-in">Get started!</Link>
          </Button>
        </div>

        <Image
          src="/hero_image.svg"
          alt="Hero image"
          height={100}
          width={100}
          className={styles.hero_image}
        />
      </section>

      <section id="learn-more" className={styles.learn_more}>
        <h1 className={styles.learn_more_title}>
          Discover More About CryptoBank
        </h1>
        <ul className={styles.learn_more_features}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={
                styles.feature_card +
                " " +
                styles[`feature_card-${feature.type}`]
              }
            >
              <feature.icon className={styles.feature_icon} />
              <h2 className={styles.feature_title}>{feature.title}</h2>
              <p
                className={
                  styles.feature_description +
                  " " +
                  styles[`feature_description-${feature.type}`]
                }
              >
                {feature.description}
              </p>
            </div>
          ))}
        </ul>
      </section>
    </>
  );
}
