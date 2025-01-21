"use server";

import Link from "next/link";
import { ArrowDown, ArrowRight, Bitcoin } from "lucide-react";
import { Shield, Clock, Coins } from "lucide-react";
import { Button } from "./_components/ui/button";

import { isValidSession } from "./_actions/auth";

export default async function Home() {
  const isAuth = await isValidSession();
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-grade encryption for all your trades.",
    },
    {
      icon: Clock,
      title: "24/7 Trading",
      description: "Trade cryptocurrencies anytime, anywhere.",
    },
    {
      icon: Coins,
      title: "Low Fees",
      description: "Competitive rates for all transactions.",
    },
  ] as const;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center w-full min-h-screen text-center bg-gradient-to-b from-primary/10 via-transparent to-background styled-container"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <Bitcoin className="w-20 h-20 text-primary" />
        <h1 className="text-4xl font-bold leading-tight md:text-6xl text-primary animate-fade-in-up">
          Welcome to CryptoBank!
        </h1>
        <p className="max-w-2xl mt-4 text-lg md:text-xl text-muted-foreground">
          Unlock the power of decentralized finance and take control of your
          financial future.
        </p>
        <Link
          href={isAuth ? "/dashboard" : "/sign-up"}
          className="w-full mt-6 sm:w-auto"
        >
          <Button size="lg" className="w-full sm:w-auto group">
            {isAuth ? "Dashboard" : "Get started"}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        {/* Bottom Fade and Arrow */}
        <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-background">
          <div className="h-24" />
          <a
            href="#learn-more"
            aria-label="Learn More"
            className="inline-flex gap-2"
          >
            <ArrowDown className="w-10 h-10 mx-auto text-primary animate-bounce" />
            <span className="text-primary">Learn more</span>
          </a>
        </div>
      </section>

      {/* Learn More Section */}
      <section
        id="learn-more"
        className="container max-w-4xl p-8 mt-16 mb-4 text-center border rounded-lg shadow-lg bg-card"
      >
        <h2 className="mb-8 text-3xl font-semibold text-primary">
          Discover More About CryptoBank
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Explore our key features designed to revolutionize your crypto
          experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 text-center border rounded-lg shadow-md bg-background hover:shadow-lg transition-shadow duration-300"
            >
              <feature.icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-primary">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="mb-4 text-2xl font-bold text-primary">
            Ready to Get Started?
          </h3>
          <Link href={isAuth ? "/dashboard" : "/sign-up"}>
            <Button size="lg" className="w-full sm:w-auto">
              {isAuth ? "Go to Dashboard" : "Sign Up Now"}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
