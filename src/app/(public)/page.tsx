import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Coins, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = await auth();

  const features = [
    {
      Icon: Shield,
      title: "Secure Transactions",
      description: "Bank-grade encryption for all your trades.",
      type: "primary",
    },
    {
      Icon: Clock,
      title: "24/7 Trading",
      description: "Trade cryptocurrencies anytime, anywhere.",
      type: "secondary",
    },
    {
      Icon: Coins,
      title: "Low Fees",
      description: "Competitive rates for all transactions.",
      type: "surface",
    },
  ] as const;
  return (
    <div className="flex flex-col items-center gap-40 pb-4">
      <section className="flex flex-col justify-between items-center h-screen w-full px-6 md:px-24 py-4 2xl:py-24">
        <div className="flex flex-col space-y-6 items-center max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-bold text-center lg:text-left">
            Welcome to <span className="text-primary">crypto</span>bank
          </h1>
          <p className="text-lg text-surface">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            ipsa quos et corporis nisi cupiditate quo aperiam? Possimus quod ex
            ullam, quasi, cumque ad, repellat provident illo totam veritatis
            cum!
          </p>
          <div className="flex space-x-4">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                {userId ? "Dashboard" : "Get started!"}
              </Button>
            </Link>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        <div className="mt-12 md:mt-0">
          <Image
            src="/undraw_online-payments.svg"
            alt="Image of a man saving money"
            height={400}
            width={400}
            className="rounded-lg"
          />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 md:px-24">
        {features.map((e, i) => (
          <Card key={i} variant={e.type} className="flex flex-col gap-2">
            <e.Icon size={35} />
            <h1 className="text-2xl font-bold leading-tight">{e.title}</h1>
            <p className="text-md ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              dolores aliquid, amet sequi ab debitis architecto voluptatem
              dolore in sed modi molestias iusto! Magni numquam est quidem
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
}
