import {Loader} from "lucide-react"

export const FullPageLoadingSpinner = ({text}: {text?: string}) => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-background gap-4">
      <Loader className="w-10 h-10 animate-spin" />
      {text && <p className="text-center text-lg text-muted-foreground">{text}</p>}
    </div>
  )
}
