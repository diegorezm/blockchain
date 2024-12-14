import {Navbar} from "./_components/navbar";

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="px-4 lg:px-16">
      <Navbar />
      <main className="mt-10 mb-5">
        {children}
      </main>
    </div>
  );
}
