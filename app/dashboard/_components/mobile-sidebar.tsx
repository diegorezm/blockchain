"use client";
import {Sidebar} from "./sidebar";
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle, SheetDescription} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
          >
            <Menu />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0 w-full h-full" side={"left"}>
          <SheetHeader>
            <SheetTitle className="sr-only">
              Sidebar
            </SheetTitle>
            <SheetDescription className="sr-only">
              Choose the route you want to go
            </SheetDescription>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )

}
