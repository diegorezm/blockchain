import {DottedSeparator} from "@/components/dotted-separator"
import {Button} from "@/components/ui/button"
import {Handshake, Key, Shield} from "lucide-react"
import Image from 'next/image'
import Link from "next/link"

export default function HomePage() {
  const services = [
    {
      title: "Security",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, repellat ab! Pariatur saepe necessitatibus nemo iusto earum officiis. Voluptas cum qui nostrum temporibus odio quibusdam veniam atque eaque. Rem, animi?",
      Icon: Key
    },
    {
      title: "Privacy",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, voluptates facilis accusantium saepe laborum reiciendis optio beatae minus cumque ipsum atque quasi dolor veniam repellendus molestiae! Veniam sequi unde molestiae!",
      Icon: Shield
    },
    {
      title: "Ease of Use",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, asperiores. Assumenda mollitia eligendi tempora earum voluptatibus, consequatur laboriosam nesciunt expedita ratione natus libero hic commodi odio officia labore sunt rerum!",
      Icon: Handshake
    }
  ]
  return (
    <div>
      <div className="flex w-full h-screen mt-10 items-start justify-between">
        <div className="space-y-6 text-center lg:text-start mx-auto">
          <h1 className="text-6xl font-bold leading-tight text-primary">Welcome to Cryptobank!</h1>
          <p className="text-xl text-muted-foreground  text-center w-full lg:text-left lg:max-w-lg">
            lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe ut quis deleniti ipsum consequuntur vero. Facere tempore saepe provident corporis fugiat. Facere tempore recusandae distinctio nulla atque vel, laboriosam nihil.
          </p>
          <Link href="/dashboard" className="block">
            <Button size="lg" className="w-2/3 lg:w-auto text-xl lg:text-md">
              Get started!
            </Button>
          </Link>
        </div>
        <div className="hidden lg:flex h-full items-center justify-center">
          <Image
            src="/hero_image.svg"
            alt="People looking at a giant credit card. from https://undraw.co/"
            width={400}
            height={100}
            className="w-2/3 h-fit"
          />
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight text-primary">
          What we offer
        </h1>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-0 place-items-center">
          {services.map((service, i) => (
            <li className="flex flex-col items-center gap-4 bg-white text-card-foreground rounded-lg shadow-md p-7 2xl:w-[400px]" key={i + 1}>
              <div className="flex flex-col gap-2 items-center w-full">
                <service.Icon className="w-7 h-7" />
                <h1 className="text-xl font-bold text-primary">{service.title}</h1>
                <DottedSeparator className="w-2/3" />
              </div>
              <p className="text-md text-center">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

}
