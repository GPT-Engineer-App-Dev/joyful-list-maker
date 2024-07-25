import { Package2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import { DesktopNavbar } from "./_components/DesktopNavbar";
import { MobileSheet } from "./_components/MobileSheet";
import { UserMenu } from "./_components/UserMenu";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>Todo App</span>
        </div>
        <DesktopNavbar navItems={[]} />
        <MobileSheet navItems={[]} />
        <UserMenu />
      </header>
      <main className="flex-grow overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;