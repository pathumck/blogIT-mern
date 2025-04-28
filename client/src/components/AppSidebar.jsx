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
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteUser,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

export const AppSidebar = () => {
  const user = useSelector((state) => state.user);
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
        <SidebarHeader className="bg-white h-16">
          <img src={logo} width={40} alt="logo" />
        </SidebarHeader>
        <SidebarContent  className="bg-white">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline />
                  <Link to={RouteIndex}>Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user && user.isLoggedIn ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaBlogger />
                      <Link to={RouteBlog}>Blogs</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaRegComments />
                      <Link to={RouteCommentDetails}>Comments</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <></>
              )}
              {user && user.isLoggedIn && user.user.role === "admin" ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BiCategory />
                      <Link to={RouteCategoryDetails}>Categories</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FiUsers />
                      <Link to={RouteUser}>Users</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <></>
              )}
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
                      <Link to={RouteBlogByCategory(category.slug)}>
                        {category.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
