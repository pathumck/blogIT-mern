import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
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
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import moment from "moment";

function Comments() {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Comment deleted successfully");
    } else {
      showToast("error", "Comment deletion failed");
    }
  };
  console.log(data);
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blog</TableHead>
                <TableHead>Commented By</TableHead>

                <TableHead>Comment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data && data.data.length > 0 ? (
                data.data.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{moment(comment.createdAt).fromNow()}</TableCell>
                    <TableCell className="truncate max-w-[200px]">{comment.blogid?.title}</TableCell>
                    <TableCell className="truncate max-w-[200px]">{comment.user?.name}</TableCell>
                    <TableCell className="truncate max-w-[200px]">{comment?.comment}</TableCell>
                    <TableCell className="flex gap-2">   
                      <Button
                        onClick={() => handleDelete(comment._id)}
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
                    No Category Found
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

export default Comments;
