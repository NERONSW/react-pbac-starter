import { Outlet } from "react-router-dom";
import { TopNavbar } from "./TopNavbar";
import { SideNavbar } from "./SideNavbar";
import { Footer } from "./Footer";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNavbar />
      <div className="flex flex-1">
        <SideNavbar />
        <main className="min-w-0 flex-1 px-6 py-8 md:px-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}