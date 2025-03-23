import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center h-full w-full px-6 md:px-32 mt-24">
      {/* Left Section: Text Content */}
      <div className="flex flex-col space-y-6 max-w-2xl items-center lg:items-start">
        <h1 className="text-4xl md:text-5xl leading-tight font-bold text-center lg:text-left">
          Welcome to <span className="text-primary">crypto</span>bank
        </h1>
        <p className="text-lg text-center lg:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          incidunt assumenda provident deserunt voluptatibus. Voluptates?
        </p>
        <div className="flex space-x-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
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
  );
}
