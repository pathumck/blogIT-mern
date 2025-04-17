import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import logo from "../assets/blogger.png";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaBlogger, FaRegComments } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";

export const AppSidebar = () => {
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <img src={logo} width={40} alt="logo" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline />
                  <Link to="">Home</Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <BiCategory />
                  <Link to={RouteCategoryDetails}>Categories</Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <FaBlogger />
                  <Link to={RouteBlog}>Blogs</Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <FaRegComments />
                  <Link to={RouteCommentDetails}>Comments</Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <FiUsers />
                  <Link to="">Users</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
              {categoryData &&
                categoryData.data.length > 0 &&
                categoryData.data.map((category) => (
                  <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton>
                      <GoDot />
                      <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
};

export default AppSidebar;
