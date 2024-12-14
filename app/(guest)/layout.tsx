import {getSession} from "@/features/auth/lib";
import {Navbar} from "./_components/navbar";
import {UserSafe} from "@/features/user/model";

export default async function HomeLayout({children}: {children: React.ReactNode}) {
  let user: UserSafe | null = null;
  const session = await getSession();
  if ('error' in session) {
    user = null;
  } else {
    user = session.user
  }
  return (
    <div className="px-4 lg:px-16">
      <Navbar user={user} />
      <main className="mt-10 mb-5">
        {children}
      </main>
    </div>
  );
}
