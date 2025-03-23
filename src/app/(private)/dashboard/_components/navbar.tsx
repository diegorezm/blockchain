import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";

export function Navbar() {
  return (
    <nav className="flex justify-between w-full">
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: "40px",
              height: "40px",
            },
          },
        }}
      />
    </nav>
  );
}
