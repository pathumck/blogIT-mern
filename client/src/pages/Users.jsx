import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { IoTrashOutline } from "react-icons/io5";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import moment from "moment";
import { FiUsers } from "react-icons/fi";

function Users() {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "User deleted successfully");
    } else {
      showToast("error", "User deletion failed");
    }
  };
  console.log(data);
  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex items-center gap-3 pl-2 mb-2   text-orange-600">
        <FiUsers size={26} />
        <h1 className="text-2xl font-bold mt-1">Categories</h1>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black-600 font-bold">Role</TableHead>
                <TableHead className="text-black-600 font-bold">Name</TableHead>
                <TableHead className="text-black-600 font-bold">
                  Email
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Avatar
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Dated
                </TableHead>
                <TableHead className="text-black-600 font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data && data.data.length > 0 ? (
                data.data.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      {user.name}
                    </TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      {user.email}
                    </TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      <img
                        src={user.avatar || avatar}
                        className="w-10 rounded-full"
                        alt=""
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      {moment(user.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        onClick={() => handleDelete(user._id)}
                        variant="outline"
                        className="hover:bg-orange-400 hover:text-white cursor-pointer"
                      >
                        <IoTrashOutline />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-red-500 font-bold"
                  >
                    No User Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Users;
