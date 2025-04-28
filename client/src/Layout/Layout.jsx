import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

function Layout() {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main className="w-full">
        <div className="w-full min-h-[calc(100vh-40px)] pt-20 pb-4 px-2 sm:px-4 md:px-6 lg:px-10">
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
