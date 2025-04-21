import React, { useState } from "react";
import logo from "../assets/blogger.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "../assets/avatar.png";
import { FaRegUser } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { showToast } from "@/helpers/showToast";
import { removeUser } from "@/redux/user.slice";
import { getEnv } from "@/helpers/getEnv";
import { RouteBlogAdd, RouteIndex, RouteProfile } from "@/helpers/RouteName";
import { FaSearch } from "react-icons/fa";
import { SlMenu } from "react-icons/sl";
import { useSidebar } from "./ui/sidebar";

function Topbar() {
  const [showSearch, setShowSearch] = useState(false);
  const { toggleSidebar } = useSidebar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className="flex justify-center items-center gap-4">
        <button onClick={toggleSidebar} type="button" className="md:hidden">
          <SlMenu className="ml-2" size={30} />
        </button>
        <div className="w-40">
          <Link to={RouteIndex}>
            <img className="w-10" src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="w-[500px]">
        <div
          className={`md:relative md:block  absolute left-0 w-full md:top-0 top-16 md:p-0 p-4  ${
            showSearch ? "block" : "hidden"
          }`}
        >
          <SearchBox />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block"
        >
          <FaSearch size={26} />
        </button>
        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to="/sign-in">
              <MdLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user.user.avatar || profileImage}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p className="text-xs">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className={"cursor-pointer"}>
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={"cursor-pointer"}>
                <Link to={RouteBlogAdd}>
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className={"cursor-pointer"}
              >
                <IoLogOutOutline color="red" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Topbar;
