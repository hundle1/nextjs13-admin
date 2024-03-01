import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import Image from 'next/image'
import Avatar from '../public/avatar.jpg';
const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    }
  });

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <a href="https://phuongdong.edu.vn/" className="cursor-pointer">
          <Image src={Avatar} 
                alt={"avatar"}
                width={40}
                height={40} 
                className="mx-5 w-12 h-12"></Image>
        </a>
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
