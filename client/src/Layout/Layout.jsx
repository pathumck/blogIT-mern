import React from "react";
import { Outlet } from "react-router-dom";
import {SidebarProvider} from "../components/ui/sidebar";
import AppSidebar  from "../components/AppSidebar";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

function Layout() {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
