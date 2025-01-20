import {Bitcoin} from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Link href="/" className="flex items-center mb-8 text-primary">
        <Bitcoin className="w-10 h-10 mr-2" />
        <span className="text-2xl font-bold">CryptoBank</span>
      </Link>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
